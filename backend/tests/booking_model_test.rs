mod common;

use backend::models::booking::{Booking, CreateBookingRequest};
use chrono::Utc;
use mongodb::bson::oid::ObjectId;

fn sample_booking(id: Option<ObjectId>) -> Booking {
    Booking {
        id,
        customer_name: "สมชาย ใจดี".to_string(),
        boat_type: "speedboat".to_string(),
        date: "2026-06-20".to_string(),
        time: Utc::now(),
    }
}

#[test]
fn create_booking_request_deserializes_from_json() {
    let json = r#"{
        "customer_name": "สมหญิง รักทะเล",
        "boat_type": "yacht",
        "date": "2026-12-31"
    }"#;

    let req: CreateBookingRequest = serde_json::from_str(json).expect("ควร deserialize ได้");

    assert_eq!(req.customer_name, "สมหญิง รักทะเล");
    assert_eq!(req.boat_type, "yacht");
    assert_eq!(req.date, "2026-12-31");
}

#[test]
fn create_booking_request_missing_field_fails() {
    let json = r#"{"customer_name": "A", "boat_type": "speedboat"}"#;
    let result: Result<CreateBookingRequest, _> = serde_json::from_str(json);
    assert!(result.is_err());
}

#[test]
fn booking_skips_id_when_none() {
    let booking = sample_booking(None);
    let value = serde_json::to_value(&booking).expect("ควร serialize ได้");

    assert!(value.get("_id").is_none());
    assert_eq!(value["customer_name"], "สมชาย ใจดี");
    assert_eq!(value["boat_type"], "speedboat");
    assert_eq!(value["date"], "2026-06-20");
    assert!(value["time"].is_string());
}

#[test]
fn booking_serializes_id_as_underscore_id() {
    let oid = ObjectId::new();
    let booking = sample_booking(Some(oid));
    let value = serde_json::to_value(&booking).expect("ควร serialize ได้");

    assert!(value.get("_id").is_some());
    assert!(value.get("id").is_none());
}

#[test]
fn booking_bson_round_trip_keeps_fields() {
    let oid = ObjectId::new();
    let booking = sample_booking(Some(oid));

    let doc = mongodb::bson::to_document(&booking).expect("ควรแปลงเป็น bson ได้");
    let restored: Booking = mongodb::bson::from_document(doc).expect("ควรแปลงกลับจาก bson ได้");

    assert_eq!(restored.id, Some(oid));
    assert_eq!(restored.customer_name, booking.customer_name);
    assert_eq!(restored.boat_type, booking.boat_type);
    assert_eq!(restored.date, booking.date);
}
