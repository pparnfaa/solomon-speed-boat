mod common;

use axum::extract::State;
use axum::Json;
use backend::handlers::booking::create_booking_handler;
use backend::models::booking::{Booking, CreateBookingRequest};
use backend::repositories::booking_repositories;
use mongodb::bson::doc;

#[tokio::test]
#[ignore = "ต้องมี MongoDB รันอยู่ (cargo test -- --ignored)"]
async fn create_booking_handler_returns_created_booking() {
    let db = common::test_db_arc().await;
    booking_repositories::init_booking_collection(&db)
        .await
        .expect("ควร init collection ได้");

    let payload = CreateBookingRequest {
        customer_name: "ทดสอบ handler".to_string(),
        boat_type: "yacht".to_string(),
        date: "2026-06-20".to_string(),
    };

    let response = create_booking_handler(State(db.clone()), Json(payload))
        .await
        .expect("handler ควรคืนค่าสำเร็จ");

    let Json(booking) = response;
    assert!(booking.id.is_some(), "booking ที่สร้างต้องมี _id");
    assert_eq!(booking.customer_name, "ทดสอบ handler");
    assert_eq!(booking.boat_type, "yacht");
    assert_eq!(booking.date, "2026-06-20");

    let collection = db.collection::<Booking>("bookings");
    collection
        .delete_one(doc! { "_id": booking.id.unwrap() }, None)
        .await
        .expect("ควรลบข้อมูลทดสอบได้");
}
