import React, { useState, useEffect } from "react";
import { CloudRain, Wind, Droplets, Sun, Cloud, CloudLightning, Snowflake } from "lucide-react";
const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const mockWeather = {
    main: { temp: 24, pressure: 1010, humidity: 83 },
    wind: { speed: 3.2 },
    weather: [{ main: "Rain", description: "Heavy Rain" }],
  };
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        if (!apiKey || apiKey === "your_weather_api_key_here") {
          setWeatherData(mockWeather);
          setLoading(false);
          return;
        }
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          setWeatherData(mockWeather);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeatherData(mockWeather);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const [time, setTime] = useState(new Date());
  const dateStr = time.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).replace(',', '   '); 
  if (loading) {
    return <div className="bg-[#101744] rounded-[30px] w-full h-full animate-pulse min-h-[200px]"></div>;
  }
  const current = weatherData || mockWeather;
  const condition = current.weather[0].main;
  const description = current.weather[0].description;
  let WeatherIcon = Cloud;
  if (condition === "Clear") WeatherIcon = Sun;
  else if (condition === "Rain" || condition === "Drizzle") WeatherIcon = CloudRain;
  else if (condition === "Thunderstorm") WeatherIcon = CloudLightning;
  else if (condition === "Snow") WeatherIcon = Snowflake;
  return (
    <div className="bg-[#101744] rounded-[30px] overflow-hidden flex flex-col w-full text-white h-full justify-between shadow-lg">
      <div className="bg-[#FF4ADE] px-6 py-3 flex justify-center items-center gap-8 text-xl md:text-2xl font-bold tracking-wider">
        <span>{dateStr.split(' ')[0].replace(/\//g, '-')}</span>
        <span>{dateStr.split(' ').slice(1).join(' ')}</span>
      </div>
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-3 items-center flex-1 divide-x divide-white/30">
        <div className="flex flex-col items-center justify-center px-2">
          <WeatherIcon size={48} className="text-white mb-2 sm:mb-4 sm:w-16 sm:h-16" />
          <span className="text-xs sm:text-sm font-medium tracking-wide capitalize text-gray-300">{description}</span>
        </div>
        <div className="flex flex-col items-center justify-center px-2">
          <span className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">{Math.round(current.main.temp)}°C</span>
          <div className="flex flex-col items-center gap-1 text-[10px] sm:text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Droplets size={12} className="sm:w-[14px] sm:h-[14px]" /> {current.main.pressure} mbar
            </div>
            <span>Pressure</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6 px-2 justify-center h-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <Wind size={16} className="sm:w-[20px] sm:h-[20px] shrink-0" />
            <div className="flex flex-col text-[10px] sm:text-xs text-gray-300">
              <span className="text-white">{current.wind.speed} km/h</span>
              <span>Wind</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Droplets size={16} className="sm:w-[20px] sm:h-[20px] shrink-0" />
            <div className="flex flex-col text-[10px] sm:text-xs text-gray-300">
              <span className="text-white">{current.main.humidity}%</span>
              <span>Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherWidget;
