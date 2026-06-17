import { Check } from "lucide-react";

const pricing = [
  {
    type: "ผู้ใหญ่",
    price: 390,
    description: "อายุ 12 ปีขึ้นไป",
  },
  {
    type: "เด็ก",
    price: 200,
    description: "อายุ 2–11 ปี",
  },
  {
    type: "ทารก",
    price: 0,
    description: "อายุต่ำกว่า 2 ปี (นั่งตัก)",
  },
];

const includes = [
  "ประกันอุบัติเหตุระหว่างเดินทาง",
  "อุปกรณ์ช่วยชีวิตครบทุกที่นั่ง",
  "กระเป๋าเดินทาง 1 ใบต่อท่าน",
  "ลูกเรือมืออาชีพ",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            อัตราค่าโดยสาร
          </h2>
          <p className="mt-2 text-muted-foreground">
            ราคาเที่ยวเดียว ภูเก็ต ↔ เกาะยาว
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pricing.map((item) => (
            <div
              key={item.type}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {item.type}
              </p>
              <p className="mt-2 font-display text-4xl font-semibold text-primary">
                {item.price === 0 ? "ฟรี" : `฿${item.price}`}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-950/30">
          <p className="font-medium text-foreground">ราคารวม</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
