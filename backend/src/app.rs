use axum::{
    routing::{get, post},
    Router,
};
use mongodb::Database;
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};
use crate::handlers::{booking::create_booking_handler, health::health_check};

pub fn create_router(database: Arc<Database>) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/health", get(health_check))
        .route("/bookings", post(create_booking_handler))
        .layer(cors)
        .with_state(database)
}