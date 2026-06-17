import { ArrowRight, Clock } from "lucide-react";

const phuketToKohYao = [
  { dep: "08:30", arr: "09:00" },
  { dep: "10:30", arr: "11:00" },
  { dep: "14:30", arr: "15:00" },
];

const kohYaoToPhuket = [
  { dep: "09:30", arr: "10:00" },
  { dep: "11:30", arr: "12:00" },
  { dep: "16:00", arr: "16:30" },
];

function TimeTableCard({
  title,
  pier,
  times,
}: {
  title: string;
  pier: string;
  times: { dep: string; arr: string }[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{pier}</p>

      <ul className="mt-5 space-y-3">
        {times.map((time) => (
          <li
            key={`${time.dep}-${time.arr}`}
            className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3"
          >
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{time.dep}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{time.arr}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TimeTableSection() {
  return (
    <section id="timetable" className="bg-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            ตารางเวลาเรือ
          </h2>
          <p className="mt-2 text-muted-foreground">
            ออกเดินทางทุกวัน ใช้เวลาเดินทางประมาณ 30 นาที
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TimeTableCard
            title="ภูเก็ต → เกาะยาว"
            pier="Bang Rong Pier (ท่าเรือบางร่อง)"
            times={phuketToKohYao}
          />
          <TimeTableCard
            title="เกาะยาว → ภูเก็ต"
            pier="Chong Lard Pier (ท่าเรือช่องหลาด)"
            times={kohYaoToPhuket}
          />
        </div>
      </div>
    </section>
  );
}
