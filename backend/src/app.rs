use axum::{
    routing::get,
    Router,
};
use mongodb::Database;
use std::sync::Arc;
use crate::handlers::health::health_check;

pub fn create_router(database: Arc<Database>) -> Router {
    Router::new()
        .route("/health", get(health_check))
        .with_state(database)
}