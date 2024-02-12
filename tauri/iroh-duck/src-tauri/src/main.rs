// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::PathBuf;

use anyhow::anyhow;
use duckdb::{arrow::util::pretty::pretty_format_batches, params, Connection};
use iroh::net::key::SecretKey;
use iroh::node::Node;
use iroh::util::path::IrohPaths;
use tracing_subscriber::{EnvFilter, FmtSubscriber};

mod iroh_gateway;

fn main() {
    // // Initialize the tracing subscriber with environment variable filtering
    let subscriber = FmtSubscriber::builder()
        .with_env_filter(EnvFilter::from_default_env())
        .finish();

    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");

    tracing::warn!("starting iroh-duck");
    tauri::async_runtime::spawn(async {
        let node = create_iroh().await.unwrap();
        iroh_gateway::run(node.clone(), 5678, "0.0.0.0:9000")
            .await
            .unwrap();
    });

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn run_query(q: &str) -> Result<String, String> {
    println!("running query");
    query(q).await.map_err(|err| err.to_string())
}

async fn query(query: &str) -> anyhow::Result<String> {
    let q = query.replace("iroh://", "http://localhost:9000/");
    println!("{}", q);

    // let q = query.to_string();
    let result = tauri::async_runtime::spawn_blocking(move || {
        let conn = Connection::open_in_memory()?;
        let mut stmt = conn.prepare(&q)?;
        let arrow = stmt.query_arrow(params![])?;
        let batches: Vec<_> = arrow.into_iter().collect();
        let out = pretty_format_batches(&batches)?;
        let result = format!("{}", out);
        anyhow::Ok(result)
    })
    .await
    .unwrap()?;
    println!("{}", result);
    Ok(result)
}

async fn create_iroh() -> anyhow::Result<Node<iroh::bytes::store::flat::Store>> {
    // let db = iroh::bytes::store::mem::Store::new();
    let path = data_root()?;
    let blob_dir = path.join(IrohPaths::BaoFlatStoreDir);

    tracing::debug!("using data directory: {}", path.display());
    tokio::fs::create_dir_all(&path).await?;
    tokio::fs::create_dir_all(&blob_dir).await?;

    let db = iroh::bytes::store::flat::Store::load(blob_dir).await?;
    let doc_store = iroh::sync::store::fs::Store::new(path.join(IrohPaths::DocsDatabase))?;
    let node = iroh::node::Node::builder(db, doc_store)
        .secret_key(SecretKey::generate())
        .spawn()
        .await?;

    Ok(node)
}

const IROH_DUCK_DATA_DIR: &str = "iroh-duck";

/// iroh-anchor uses a separate data directory from iroh, but the same layout
fn data_root() -> anyhow::Result<PathBuf> {
    if let Some(val) = std::env::var_os("IROH_DUCK_DATA_DIR") {
        return Ok(PathBuf::from(val));
    }
    let path = dirs_next::data_dir().ok_or_else(|| {
        anyhow!("operating environment provides no directory for application data")
    })?;
    Ok(path.join(IROH_DUCK_DATA_DIR))
}
