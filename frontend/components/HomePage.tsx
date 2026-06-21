"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TimeTableSection from "@/components/TimeTableSection";
import ScheduleSection, { type BoatSchedule } from "@/components/ScheduleSection";
import BookingForm, { type BookingData } from "@/components/BookingForm";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { createBooking } from "@/services/booking.service";
import { ApiError } from "@/services/api-client";

const generateSchedules = (
  from: string,
  to: string,
  date: string,
): BoatSchedule[] => {
  const isPhuketToKohYao = from === "phuket";

  const times = isPhuketToKohYao
    ? [
        { dep: "08:30", arr: "09:00", booked: 18 },
        { dep: "10:30", arr: "11:00", booked: 25 },
        { dep: "14:30", arr: "15:00", booked: 12 },
      ]
    : [
        { dep: "09:30", arr: "10:00", booked: 20 },
        { dep: "11:30", arr: "12:00", booked: 30 },
        { dep: "16:00", arr: "16:30", booked: 8 },
      ];

  const routeName = isPhuketToKohYao
    ? "Phuket → Koh Yao"
    : "Koh Yao → Phuket";
  const pier = isPhuketToKohYao
    ? "Bang Rong Pier (ท่าเรือบางร่อง)"
    : "Chong Lard Pier (ท่าเรือช่องหลาด)";

  return times.map((time, index) => ({
    id: `${from}-${to}-${date}-${index}`,
    route: routeName,
    departureTime: time.dep,
    arrivalTime: time.arr,
    capacity: 30,
    booked: time.booked,
    adultPrice: 390,
    childPrice: 200,
    pier,
  }));
};

export default function HomePage() {
  const [schedules, setSchedules] = useState<BoatSchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchedule, setSelectedSchedule] =
    useState<BoatSchedule | null>(null);
  const [searchParams, setSearchParams] = useState({ adults: 1, children: 0 });

  const handleSearch = (
    from: string,
    to: string,
    date: string,
    adults: number,
    children: number,
  ) => {
    if (!from || !to || !date) {
      toast.error("กรุณาเลือกต้นทาง ปลายทาง และวันที่");
      return;
    }

    if (from === to) {
      toast.error("ต้นทางและปลายทางต้องไม่เหมือนกัน");
      return;
    }

    setSelectedDate(date);
    setSearchParams({ adults, children });
    const newSchedules = generateSchedules(from, to, date);
    setSchedules(newSchedules);

    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
    toast.success(`พบ ${newSchedules.length} รอบเรือ`);
  };

  const handleSelectSchedule = (schedule: BoatSchedule) => {
    const totalPassengers = searchParams.adults + searchParams.children;
    const remainingSeats = schedule.capacity - schedule.booked;

    if (totalPassengers > remainingSeats) {
      toast.error(
        `ที่นั่งเหลือเพียง ${remainingSeats} ที่เท่านั้น กรุณาปรับจำนวนผู้โดยสาร`,
      );
      return;
    }

    setSelectedSchedule(schedule);
  };

  const handleBookingSubmit = async (data: BookingData) => {
    if (!selectedSchedule || !selectedDate) {
      toast.error("ไม่พบข้อมูลรอบเรือ กรุณาค้นหาใหม่อีกครั้ง");
      throw new Error("Missing schedule or date");
    }

    try {
      await createBooking(data, selectedSchedule, selectedDate);
      toast.success("จองสำเร็จ! รายละเอียดถูกส่งไปยังอีเมลของคุณแล้ว");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง";
      toast.error(message);
      throw error;
    }
  };

  const handleCloseBooking = () => {
    setSelectedSchedule(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection onSearch={handleSearch} />
      <TimeTableSection />
      <ScheduleSection
        schedules={schedules}
        selectedDate={selectedDate}
        onSelectSchedule={handleSelectSchedule}
      />
      <PricingSection />
      <Footer />

      <BookingForm
        schedule={selectedSchedule}
        adults={searchParams.adults}
        childCount={searchParams.children}
        onClose={handleCloseBooking}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
}
