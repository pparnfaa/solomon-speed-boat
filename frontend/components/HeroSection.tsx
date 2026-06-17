"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Search, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { assets } from "@/config/assets";

const locations = [
  { id: "phuket", label: "Phuket (Bang Rong Pier)", labelTh: "ภูเก็ต (ท่าเรือบางร่อง)" },
  { id: "kohyao", label: "Koh Yao (Chong Lard Pier)", labelTh: "เกาะยาว (ท่าเรือช่องหลาด)" },
];

interface HeroSectionProps {
  onSearch: (from: string, to: string, date: string, adults: number, children: number) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("phuket");
  const [to, setTo] = useState("kohyao");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const handleSearch = () => {
    onSearch(from, to, date, parseInt(adults), parseInt(children));
  };

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={assets.heroSpeedboat}
          alt="Solomon Speed Boat บนทะเลอันดามัน"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-2 bg-white/20 rounded-full mb-6">
            <span className="text-white font-medium">🚤 Phuket ↔ Koh Yao Transfer</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Solomon Speed Boat
            <span className="block text-accent text-3xl md:text-4xl mt-2">Phuket - Koh Yao Transfer</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            บริการเรือ Speed Boat รับ-ส่ง ภูเก็ต ↔ เกาะยาว ปลอดภัย รวดเร็ว ใช้เวลาเพียง 30 นาที
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">ค้นหาเที่ยวเรือ</h2>
            </div>

            {/* Trip Type */}
            <div className="mb-6">
              <RadioGroup
                value={tripType}
                onValueChange={setTripType}
                className="gap-6 sm:gap-8"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="oneway" id="oneway" />
                  <Label htmlFor="oneway" className="cursor-pointer whitespace-nowrap">
                    เที่ยวเดียว (One Way)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="roundtrip" id="roundtrip" />
                  <Label htmlFor="roundtrip" className="cursor-pointer whitespace-nowrap">
                    ไป-กลับ (Round Trip)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* From */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  จาก (From)
                </label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="เลือกต้นทาง" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id} disabled={loc.id === to}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button & To */}
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  ถึง (To)
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleSwapLocations}
                    aria-label="สลับต้นทางและปลายทาง"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                  <Select value={to} onValueChange={setTo}>
                    <SelectTrigger className="h-12 flex-1">
                      <SelectValue placeholder="เลือกปลายทาง" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id} disabled={loc.id === from}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Depart Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  วันเดินทาง (Depart)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Return Date (if round trip) */}
            {tripType === "roundtrip" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    วันกลับ (Return)
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    min={date || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Adults */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  ผู้ใหญ่ (Adult)
                </label>
                <Select value={adults} onValueChange={setAdults}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="จำนวน" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1} คน
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Children */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  เด็ก 3-12 ปี (Child)
                </label>
                <Select value={children} onValueChange={setChildren}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="จำนวน" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(11)].map((_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} คน
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="col-span-2 flex items-end">
                <Button 
                  onClick={handleSearch}
                  size="lg" 
                  className="w-full h-12 text-lg bg-primary text-white hover:bg-primary/90"
                >
                  <Search className="w-5 h-5 mr-2" />
                  ค้นหาเที่ยวเรือ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
          {[
            { value: "30 นาที", label: "ใช้เวลาเดินทาง" },
            { value: "100%", label: "ปลอดภัย" },
            { value: "3 รอบ/วัน", label: "ให้บริการ" },
          ].map((stat, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-2xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
