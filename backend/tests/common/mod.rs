use mongodb::{options::ClientOptions, Client, Database};
use std::sync::Arc;

pub const TEST_DB_NAME: &str = "speedboat_test";

pub async fn test_db() -> Database {
    let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
    let options = ClientOptions::parse(&uri)
        .await
        .expect("ควร parse MONGO_URI ได้");
    let client = Client::with_options(options).expect("ควรสร้าง client ได้");
    client.database(TEST_DB_NAME)
}

pub async fn test_db_arc() -> Arc<Database> {
    Arc::new(test_db().await)
}
