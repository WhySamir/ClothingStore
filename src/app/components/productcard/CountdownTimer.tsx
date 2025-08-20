"use client";
import { useEffect, useState } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 25,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-2 left-0 bg-orange-200 w-full  px-2 py-3 flex items-center justify-center gap-4 text-sm font-medium">
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Days</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Mins</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Sec</div>
      </div>
    </div>
  );
}
