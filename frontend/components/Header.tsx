"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/config/assets";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "หน้าแรก", href: "#home" },
    { label: "จองเรือ", href: "#schedule" },
    { label: "ตารางเรือ", href: "#timetable" },
    { label: "ราคา", href: "#pricing" },
    { label: "ติดต่อเรา", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background">
        <div className="bg-primary py-2 text-primary-foreground">
          <div className="container mx-auto flex items-center justify-between px-4 text-sm">
            <div className="flex items-center gap-4">
              <a
                href="tel:0895926006"
                className="flex items-center gap-1 transition-opacity hover:opacity-80"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">CHAI 089-592-6006</span>
              </a>
              <a
                href="tel:0857884034"
                className="flex items-center gap-1 transition-opacity hover:opacity-80"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">LEAM 085-788-4034</span>
              </a>
            </div>
            <div className="text-xs">
              Solomon Speed Boat — Phuket ↔ Koh Yao
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="#home" className="flex items-center gap-2">
              <Image
                src={assets.solomonLogo}
                alt="Solomon Speed Boat"
                className="h-12 w-auto"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex">
              <Link href="#schedule">
                <Button size="sm">จองเลย</Button>
              </Link>
            </div>

            <button
              type="button"
              className="p-2 text-foreground md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="container mx-auto flex flex-col gap-3 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 font-medium text-foreground/80 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-2">
                <Link href="#schedule" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">
                    จองเลย
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* spacer สำหรับ fixed header */}
      <div className="h-[104px]" aria-hidden />
    </>
  );
};

export default Header;
