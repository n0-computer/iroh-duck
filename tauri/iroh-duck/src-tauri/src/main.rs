// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use duckdb::{arrow::util::pretty::pretty_format_batches, params, Connection};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn run_query(q: &str) -> Result<String, String> {
    println!("running query");
    query(q).await.map_err(|err| err.to_string())
}

async fn query(query: &str) -> anyhow::Result<String> {
    println!("{}", query);
    let q = query.to_string();
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
