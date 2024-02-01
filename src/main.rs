use std::net::SocketAddr;

use anyhow::Result;
use clap::Parser;
use duckdb::{arrow::util::pretty::print_batches, params, Connection};
use futures::TryStreamExt;
use iroh::bytes::Hash;
use iroh::net::key::SecretKey;
use iroh::net::NodeAddr;
use iroh::node::Node;
use iroh::rpc_protocol::{BlobFormat, SetTagOption};
use url::Url;

#[derive(Debug, Parser)]
struct Args {
    /// SQL query to execute.
    /// "DATA" will be replaced with the location of the
    /// iroh blob
    query: String,
    #[clap(long)]
    node_id: String,
    #[clap(long)]
    addrs: Option<Vec<SocketAddr>>,
    #[clap(long)]
    derp_url: Option<Url>,
    #[clap(long)]
    data_hash: Hash,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();

    let tmp_dir = tempfile::TempDir::new()?;
    let out_dir = tmp_dir.path().join("out");

    let node = create_iroh().await?;
    let addr = NodeAddr::from_parts(
        args.node_id.parse()?,
        args.derp_url,
        args.addrs.unwrap_or_default(),
    );
    let path = out_dir.join("data.parquet");
    let res = node
        .client()
        .blobs
        .download(iroh::rpc_protocol::BlobDownloadRequest {
            hash: args.data_hash,
            format: BlobFormat::Raw,
            peer: addr,
            tag: SetTagOption::Auto,
            out: iroh::rpc_protocol::DownloadLocation::External {
                path: path.clone(),
                in_place: false,
            },
        })
        .await?
        .try_collect::<Vec<_>>()
        .await?;
    println!("downloaded to {}", out_dir.display());

    let query = args
        .query
        .replace("DATA", &format!("\"{}\"", path.to_str().unwrap()));
    println!("{}\n\n", query);

    tokio::task::spawn_blocking(move || {
        let conn = Connection::open_in_memory()?;
        let mut stmt = conn.prepare(&query)?;
        let arrow = stmt.query_arrow(params![])?;
        let batches: Vec<_> = arrow.into_iter().collect();
        print_batches(&batches)?;
        anyhow::Ok(())
    })
    .await
    .unwrap()?;

    Ok(())
}

async fn create_iroh() -> Result<Node<iroh::bytes::store::mem::Store>> {
    let db = iroh::bytes::store::mem::Store::new();
    let doc_store = iroh::sync::store::memory::Store::default();
    let node = iroh::node::Node::builder(db, doc_store)
        .secret_key(SecretKey::generate())
        .spawn()
        .await?;

    Ok(node)
}
