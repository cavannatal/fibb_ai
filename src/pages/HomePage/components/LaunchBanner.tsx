import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl md:text-3xl font-bold">{value}</span>
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="py-2 px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#093148] to-[#004948]">fibb.ai Launch Countdown</h2>
          <Rocket className="h-5 w-5 md:h-6 md:w-6 animate-pulse text-[#004948]" />
        </div>
        <div className="flex justify-around text-transparent bg-clip-text bg-gradient-to-r from-[#093148] to-[#004948]">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        <p className="mt-2 text-center text-xs md:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#093148] to-[#004948]">
          Launching on October 11th, 2024 at 9:00 AM CST
        </p>
      </div>
    </div>
  );
};

export default LaunchBanner;