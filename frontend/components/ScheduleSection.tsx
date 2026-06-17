import { Anchor, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type BoatSchedule = {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  capacity: number;
  booked: number;
  adultPrice: number;
  childPrice: number;
  pier: string;
};

type ScheduleSectionProps = {
  schedules: BoatSchedule[];
  selectedDate: string;
  onSelectSchedule: (schedule: BoatSchedule) => void;
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ScheduleSection({
  schedules,
  selectedDate,
  onSelectSchedule,
}: ScheduleSectionProps) {
  if (schedules.length === 0) {
    return (
      <section id="schedule" className="py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Anchor className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">
            กรุณาค้นหารอบเรือด้านบนเพื่อดูตารางเวลาที่ว่าง
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <h2 className="font-display text-3xl font-semibold text-foreground">
            รอบเรือที่ว่าง
          </h2>
          <p className="mt-2 text-muted-foreground">
            {formatDate(selectedDate)} — พบ {schedules.length} รอบ
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {schedules.map((schedule) => {
            const remaining = schedule.capacity - schedule.booked;
            const isLow = remaining <= 5;

            return (
              <article
                key={schedule.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {schedule.route}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {schedule.pier}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      {schedule.departureTime} – {schedule.arrivalTime}
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-1.5",
                        isLow ? "text-destructive" : "text-muted-foreground",
                      )}
                    >
                      <Users className="h-4 w-4" />
                      เหลือ {remaining} ที่นั่ง
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-primary">
                      ฿{schedule.adultPrice}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ผู้ใหญ่ / เด็ก ฿{schedule.childPrice}
                    </p>
                  </div>
                  <Button
                    onClick={() => onSelectSchedule(schedule)}
                    disabled={remaining === 0}
                  >
                    เลือกรอบนี้
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
