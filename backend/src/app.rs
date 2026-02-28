use axum::{
    routing::{get, post},
    Router,
};
use mongodb::Database;
use std::sync::Arc;
use crate::handlers::{booking::create_booking_handler, health::health_check};

pub fn create_router(database: Arc<Database>) -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/bookings", post(create_booking_handler))
        .with_state(database)
}