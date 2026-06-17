import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { assets } from "@/config/assets";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const menuLinks = [
  { href: "#", label: "หน้าแรก" },
  { href: "#schedule", label: "จองเรือ" },
  { href: "#timetable", label: "ตารางเรือ" },
  { href: "#pricing", label: "ราคา" },
  { href: "#contact", label: "ติดต่อเรา" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src={assets.solomonLogo}
              alt="Solomon Speed Boat"
              className="mb-4 h-20 w-auto rounded-lg bg-white p-2"
              priority
            />
            <p className="mb-4 max-w-md text-primary-foreground/80">
              Solomon Speed Boat Group Co.,Ltd. บริการเรือ Speed Boat
              รับ-ส่ง ภูเก็ต ↔ เกาะยาว ปลอดภัย รวดเร็ว ใช้เวลาเพียง 30 นาที
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Line"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">เมนู</h3>
            <ul className="space-y-2">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">CHAI</p>
                  <a
                    href="tel:0895926006"
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    089-592-6006
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">LEAM</p>
                  <a
                    href="tel:0857884034"
                    className="text-primary-foreground/80 hover:text-primary-foreground"
                  >
                    085-788-4034
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">ท่าเรือ</p>
                  <p className="text-primary-foreground/80">
                    Bang Rong Pier, Phuket
                    <br />
                    Chong Lard Pier, Koh Yao
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-primary-foreground/60 md:flex-row">
            <p>© {new Date().getFullYear()} Solomon Speed Boat Group Co.,Ltd. All rights reserved.</p>
            <p>Phuket ↔ Koh Yao Transfer Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
