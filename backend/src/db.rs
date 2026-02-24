use mongodb::{Client, Database, options::ClientOptions};
use std::sync::Arc;

pub async fn connect() -> Result<Arc<Database>, mongodb::error::Error> {
    let uri = std::env::var("MONGO_URI").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
    let db_name = std::env::var("MONGO_DB").unwrap_or_else(|_| "speedboat".to_string());
    
    let client_options = ClientOptions::parse(&uri).await?;
    let client = Client::with_options(client_options)?;
    let db = client.database(&db_name);
    
    println!("✓ Connected to MongoDB: {}", db.name());
    
    Ok(Arc::new(db))
}
