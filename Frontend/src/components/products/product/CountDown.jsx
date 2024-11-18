import React, { useEffect, useState } from 'react';

const CountDown = ({targetDate}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());



  // Function to calculate the time remaining
  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Timer expired
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
        
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center bg-white shadow p-4 rounded-lg">
        <span className="text-2xl font-bold text-blue-600">{timeLeft.days}</span>
        <span className="text-sm text-gray-600">Days</span>
      </div>
      <div className="flex flex-col items-center bg-white shadow p-4 rounded-lg">
        <span className="text-2xl font-bold text-blue-600">{timeLeft.hours}</span>
        <span className="text-sm text-gray-600">Hours</span>
      </div>
      <div className="flex flex-col items-center bg-white shadow p-4 rounded-lg">
        <span className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</span>
        <span className="text-sm text-gray-600">Minutes</span>
      </div>
      <div className="flex flex-col items-center bg-white shadow p-4 rounded-lg">
        <span className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</span>
        <span className="text-sm text-gray-600">Seconds</span>
      </div>
    </div>
  );
};

export default CountDown;
