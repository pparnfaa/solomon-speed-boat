import type { BookingData } from "@/components/BookingForm";
import type { BoatSchedule } from "@/components/ScheduleSection";
import { apiFetch } from "@/services/api-client";
import type { Booking, CreateBookingRequest } from "@/services/types/booking";

export async function createBooking(
  data: BookingData,
  schedule: BoatSchedule,
  date: string,
): Promise<Booking> {
  const payload: CreateBookingRequest = {
    customer_name: `${data.firstName.trim()} ${data.lastName.trim()}`,
    boat_type: `${schedule.route} (${schedule.departureTime})`,
    date,
  };

  return apiFetch<Booking>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
