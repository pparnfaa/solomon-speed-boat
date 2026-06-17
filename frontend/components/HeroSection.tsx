"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/config/assets";

type HeroSectionProps = {
  onSearch: (
    from: string,
    to: string,
    date: string,
    adults: number,
    children: number,
  ) => void;
};

const locations = [
  { value: "phuket", label: "ภูเก็ต (Bang Rong Pier)" },
  { value: "kohyao", label: "เกาะยาว (Chong Lard Pier)" },
];

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [from, setFrom] = useState("phuket");
  const [to, setTo] = useState("kohyao");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleFromChange = (value: string) => {
    setFrom(value);
    setTo(value === "phuket" ? "kohyao" : "phuket");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to, date, adults, children);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="home" className="relative min-h-[640px] overflow-hidden">
      <Image
        src={assets.heroSpeedboat}
        alt="Solomon Speed Boat บนทะเลอันดามัน"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/85 via-primary-900/65 to-primary-800/30" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-300/30 bg-primary-950/40 px-4 py-1.5 text-sm text-primary-100 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" />
            ภูเก็ต ↔ เกาะยาว ทุกวัน
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-tight text-primary-foreground md:text-5xl">
            จองเรือเร็ว
            <span className="block text-primary-200">Solomon Speed Boat</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-primary-100/90">
            เดินทางสะดวก ปลอดภัย ตรงเวลา ระหว่างท่าเรือบางร่อง ภูเก็ต
            และท่าเรือช่องหลาด เกาะยาว
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-primary-200/20 bg-background/95 p-5 shadow-xl backdrop-blur-sm sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                ต้นทาง
              </label>
              <select
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {locations.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                ปลายทาง
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {locations
                  .filter((loc) => loc.value !== from)
                  .map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                วันที่เดินทาง
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-primary" />
                ผู้ใหญ่
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-primary" />
                เด็ก
              </label>
              <input
                type="number"
                min={0}
                max={30}
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">
            <Search className="h-4 w-4" />
            ค้นหารอบเรือ
          </Button>
        </form>
      </div>
    </section>
  );
}
