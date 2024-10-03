import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center mx-1 sm:mx-2">
    <span className="text-lg sm:text-xl font-bold">{value.toString().padStart(2, '0')}</span>
    <span className="text-xs uppercase">{label}</span>
  </div>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date('2024-10-11T09:00:00-05:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#024751] text-white" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
      <div className="max-w-6xl mx-auto py-3 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center">
            <h2 className="text-sm sm:text-base font-bold mr-2">LAUNCH COUNTDOWN</h2>
            <Rocket className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </div>
          <div className="flex justify-center">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>
          <div className="text-xs sm:text-sm text-center sm:text-right">
            October 11, 2024 at 9:00 AM CST
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchBanner;