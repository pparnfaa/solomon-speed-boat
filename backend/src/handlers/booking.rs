use std::sync::Arc;
use axum::{extract::State, Json, http::StatusCode};
use mongodb::Database;
use serde_json::json;

use crate::{
    models::booking::{Booking, CreateBookingRequest},
    repositories::booking_repositories,
};

pub async fn create_booking_handler(
    State(db): State<Arc<Database>>,
    Json(payload): Json<CreateBookingRequest>,
) -> Result<Json<Booking>, (StatusCode, Json<serde_json::Value>)> {
    let booking = Booking {
        id: None,
        customer_name: payload.customer_name,
        boat_type: payload.boat_type,
        date: payload.date,
        time: chrono::Utc::now(),
    };

    match booking_repositories::create_booking(&db, booking).await {
        Ok(created) => Ok(Json(created)),
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": e.to_string() })),
        )),
    }
}