import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
const TimerWidget = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    if (isActive && totalSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, totalSeconds]);
  const toggleTimer = () => {
    if (!isActive && totalSeconds === 0) {
      setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
    }
    setIsActive(!isActive);
  };
  const currentHours = Math.floor(totalSeconds / 3600);
  const currentMinutes = Math.floor((totalSeconds % 3600) / 60);
  const currentSeconds = totalSeconds % 60;
  const displayH = isActive ? currentHours : hours;
  const displayM = isActive ? currentMinutes : minutes;
  const displayS = isActive ? currentSeconds : seconds;
  const initialTotal = hours * 3600 + minutes * 60 + seconds;
  const percentage = initialTotal > 0 ? (totalSeconds / initialTotal) * 100 : 0;
  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;
  return (
    <div className="bg-[#1E2343] rounded-[30px] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 lg:gap-16 shadow-lg h-full">
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center shrink-0 bg-[#191E39] rounded-full drop-shadow-[0_0_15px_rgba(255,106,106,0.15)] shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
          <circle
            cx="50%"
            cy="50%"
            r="42%"
            stroke="#FF6A6A"
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="text-3xl md:text-4xl font-mono relative z-10 text-white">
          {String(displayH).padStart(2, '0')}:{String(displayM).padStart(2, '0')}:{String(displayS).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-6 w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center text-center gap-2">
          <div className="flex flex-col items-center flex-1">
            <span className="text-gray-400 text-sm mb-4">Hours</span>
            <button onClick={() => !isActive && setHours(h => (h + 1) % 24)} className="text-gray-400 hover:text-white transition"><ChevronUp size={28} /></button>
            <span className="text-4xl md:text-5xl font-mono my-3">{String(displayH).padStart(2, '0')}</span>
            <button onClick={() => !isActive && setHours(h => (h > 0 ? h - 1 : 23))} className="text-gray-400 hover:text-white transition"><ChevronDown size={28} /></button>
          </div>
          <span className="text-3xl md:text-4xl font-mono text-gray-400 mt-6">:</span>
          <div className="flex flex-col items-center flex-1">
            <span className="text-gray-400 text-sm mb-4">Minutes</span>
            <button onClick={() => !isActive && setMinutes(m => (m + 1) % 60)} className="text-gray-400 hover:text-white transition"><ChevronUp size={28} /></button>
            <span className="text-4xl md:text-5xl font-mono my-3">{String(displayM).padStart(2, '0')}</span>
            <button onClick={() => !isActive && setMinutes(m => (m > 0 ? m - 1 : 59))} className="text-gray-400 hover:text-white transition"><ChevronDown size={28} /></button>
          </div>
          <span className="text-3xl md:text-4xl font-mono text-gray-400 mt-6">:</span>
          <div className="flex flex-col items-center flex-1">
            <span className="text-gray-400 text-sm mb-4">Seconds</span>
            <button onClick={() => !isActive && setSeconds(s => (s + 1) % 60)} className="text-gray-400 hover:text-white transition"><ChevronUp size={28} /></button>
            <span className="text-4xl md:text-5xl font-mono my-3">{String(displayS).padStart(2, '0')}</span>
            <button onClick={() => !isActive && setSeconds(s => (s > 0 ? s - 1 : 59))} className="text-gray-400 hover:text-white transition"><ChevronDown size={28} /></button>
          </div>
        </div>
        <button 
          onClick={toggleTimer}
          className="w-full bg-[#FF6A6A] hover:bg-[#ff5555] text-white font-semibold py-2.5 rounded-full text-lg md:text-xl transition-colors mt-2"
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};
export default TimerWidget;
