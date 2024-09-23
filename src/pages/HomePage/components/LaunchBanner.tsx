import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-4xl font-bold">{value}</span>
    <span className="text-xs md:text-sm uppercase">{label}</span>
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
    <div className="w-full max-w-32xl mx-auto overflow-hidden">
      <div className="p-4 md:p-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Fibb.ai Launch Countdown!</h2>
          <Rocket className="h-6 w-6 md:h-8 md:w-8 animate-pulse text-blue-600" />
        </div>
        <div className="flex justify-around">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        <p className="mt-4 text-center text-sm md:text-base">
          Launching on October 11th, 2024 at 9:00 AM CST
        </p>
      </div>
    </div>
  );
};

export default LaunchBanner;