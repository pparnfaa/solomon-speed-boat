mod common;

use backend::models::booking::Booking;
use backend::repositories::booking_repositories::{create_booking, init_booking_collection};
use mongodb::bson::doc;

const COLLECTION_NAME: &str = "bookings";

#[tokio::test]
#[ignore = "ต้องมี MongoDB รันอยู่ (cargo test -- --ignored)"]
async fn init_creates_bookings_collection() {
    let db = common::test_db().await;
    init_booking_collection(&db)
        .await
        .expect("ควร init collection ได้");

    let names = db
        .list_collection_names(None)
        .await
        .expect("ควร list collection ได้");
    assert!(names.iter().any(|name| name == COLLECTION_NAME));
}

#[tokio::test]
#[ignore = "ต้องมี MongoDB รันอยู่ (cargo test -- --ignored)"]
async fn create_booking_assigns_id() {
    let db = common::test_db().await;
    init_booking_collection(&db)
        .await
        .expect("ควร init collection ได้");

    let booking = Booking {
        id: None,
        customer_name: "ทดสอบ create".to_string(),
        boat_type: "speedboat".to_string(),
        date: "2026-06-20".to_string(),
        time: chrono::Utc::now(),
    };

    let created = create_booking(&db, booking)
        .await
        .expect("ควรสร้าง booking ได้");

    assert!(created.id.is_some(), "booking ที่สร้างต้องมี _id");
    assert_eq!(created.customer_name, "ทดสอบ create");

    let collection = db.collection::<Booking>(COLLECTION_NAME);
    collection
        .delete_one(doc! { "_id": created.id.unwrap() }, None)
        .await
        .expect("ควรลบข้อมูลทดสอบได้");
}
