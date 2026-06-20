mod common;

use axum::extract::State;
use axum::Json;
use backend::handlers::health::health_check;

#[tokio::test]
#[ignore = "ต้องมี MongoDB รันอยู่ (cargo test -- --ignored)"]
async fn health_check_reports_connected() {
    let db = common::test_db_arc().await;
    let Json(value) = health_check(State(db)).await;

    assert_eq!(value["status"], "200-healthy");
    assert_eq!(value["message"], "hello solomon speed boat");
    assert_eq!(value["database"], "connected");
    assert!(value["timestamp"].is_string());
}
