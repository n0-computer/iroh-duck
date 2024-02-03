// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use duckdb::{arrow::util::pretty::pretty_format_batches, params, Connection};
// use iroh::bytes::Hash;
// use iroh::net::NodeAddr;
// use iroh::rpc_protocol::{BlobFormat, SetTagOption};
use iroh::net::key::SecretKey;
use iroh::node::Node;

mod iroh_gateway;

fn main() {
    tauri::async_runtime::spawn(async {
        let node = create_iroh().await.unwrap();
        let addr = node.my_addr().await.unwrap();
        iroh_gateway::run(addr, 5678, "0.0.0.0:9000").await.unwrap();
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

async fn create_iroh() -> anyhow::Result<Node<iroh::bytes::store::mem::Store>> {
    let db = iroh::bytes::store::mem::Store::new();
    let doc_store = iroh::sync::store::memory::Store::default();
    let node = iroh::node::Node::builder(db, doc_store)
        .secret_key(SecretKey::generate())
        .spawn()
        .await?;

    Ok(node)
}
