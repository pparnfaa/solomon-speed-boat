"use client";

import { useState } from "react";
import { User, Mail, Phone, CreditCard, QrCode, Check, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BoatSchedule } from "./ScheduleSection";

interface BookingFormProps {
  schedule: BoatSchedule | null;
  adults: number;
  children: number;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  totalPrice: number;
  scheduleId: string;
}

const BookingForm = ({ schedule, adults, children, onClose, onSubmit }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!schedule) return null;

  const totalPrice = (schedule.adultPrice * adults) + (schedule.childPrice * children);
  const remainingSeats = schedule.capacity - schedule.booked;
  const totalPassengers = adults + children;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อ";
    if (!formData.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล";
    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "กรุณากรอกเบอร์โทร";
    } else if (!/^0\d{8,9}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = "รูปแบบเบอร์โทรไม่ถูกต้อง";
    }

    if (totalPassengers > remainingSeats) {
      newErrors.general = `ที่นั่งเหลือเพียง ${remainingSeats} ที่เท่านั้น`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handlePayment = () => {
    onSubmit({
      ...formData,
      adults,
      children,
      totalPrice,
      scheduleId: schedule.id,
    });
    setStep(3);
  };

  return (
    <Dialog open={!!schedule} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Ship className="w-6 h-6 text-primary" />
            {step === 1 && "กรอกข้อมูลการจอง"}
            {step === 2 && "ชำระเงิน"}
            {step === 3 && "จองสำเร็จ!"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 mx-2 rounded ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
          ))}
        </div>

        {/* Booking Summary */}
        <Card className="mb-6 bg-secondary">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-foreground">{schedule.route}</p>
                <p className="text-sm text-muted-foreground">
                  {schedule.departureTime} - {schedule.arrivalTime} | {schedule.pier}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  ผู้ใหญ่ {adults} x ฿{schedule.adultPrice.toLocaleString()}
                </p>
                {children > 0 && (
                  <p className="text-sm text-muted-foreground">
                    เด็ก {children} x ฿{schedule.childPrice.toLocaleString()}
                  </p>
                )}
                <p className="font-bold text-primary text-lg mt-1">
                  รวม ฿{totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="space-y-4">
            {errors.general && (
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  ชื่อ *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="ชื่อ"
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && <p className="text-destructive text-xs">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  นามสกุล *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="นามสกุล"
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && <p className="text-destructive text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                อีเมล *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                เบอร์โทรศัพท์ *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0812345678"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                ยกเลิก
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-primary text-white hover:bg-primary/90">
                ไปขั้นตอนชำระเงิน
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">สแกน QR Code เพื่อชำระเงิน</CardTitle>
                <CardDescription>Omise Payment</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-48 h-48 bg-muted rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-border">
                  <QrCode className="w-32 h-32 text-primary" />
                </div>
                <p className="text-center text-sm text-muted-foreground mb-2">
                  ยอดชำระ
                </p>
                <p className="text-3xl font-bold text-primary">
                  ฿{totalPrice.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  * QR Code จะหมดอายุใน 15 นาที
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                กลับ
              </Button>
              <Button onClick={handlePayment} className="flex-1 bg-primary text-white hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" />
                ยืนยันชำระเงิน
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-success mx-auto mb-6 flex items-center justify-center">
              <Check className="w-10 h-10 text-success-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">จองสำเร็จ!</h3>
            <p className="text-muted-foreground mb-6">
              รายละเอียดการจองได้ถูกส่งไปยังอีเมลของคุณแล้ว
            </p>

            <Card className="bg-secondary text-left">
              <CardContent className="pt-4 space-y-2">
                <p><strong>ชื่อ:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>เส้นทาง:</strong> {schedule.route}</p>
                <p><strong>เวลา:</strong> {schedule.departureTime} - {schedule.arrivalTime}</p>
                <p><strong>ท่าเรือ:</strong> {schedule.pier}</p>
                <p><strong>จำนวนผู้โดยสาร:</strong> ผู้ใหญ่ {adults} คน {children > 0 && `, เด็ก ${children} คน`}</p>
                <p className="text-primary font-bold">ยอดชำระ: ฿{totalPrice.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Button onClick={onClose} className="mt-6 bg-primary text-white hover:bg-primary/90">
              ปิด
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
