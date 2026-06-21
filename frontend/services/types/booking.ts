export interface CreateBookingRequest {
  customer_name: string;
  boat_type: string;
  date: string;
}

export interface Booking {
  _id?: string;
  customer_name: string;
  boat_type: string;
  date: string;
  time: string;
}
