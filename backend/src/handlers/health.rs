use axum::{Json, extract::State};
use mongodb::Database;
use std::sync::Arc;
use serde_json::json;

pub async fn health_check(State(db): State<Arc<Database>>) -> Json<serde_json::Value> {
    // Check if database is connected
    let db_status = match db.run_command(bson::doc! {"ping": 1}, None).await {
        Ok(_) => "connected",
        Err(_) => "disconnected",
    };

    Json(json!({
        "status": "200-healthy",
        "message": "hello solomon speed boat",
        "database": db_status,
        "timestamp": chrono::Utc::now().to_rfc3339(),
    }))
}
