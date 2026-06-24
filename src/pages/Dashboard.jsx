import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfileWidget from "../components/UserProfileWidget";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import TimerWidget from "../components/TimerWidget";
import NotesWidget from "../components/NotesWidget";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-12 relative pb-24">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col w-full md:w-1/2 gap-8">
              <UserProfileWidget />
              <WeatherWidget />
            </div>
            <div className="w-full md:w-1/2">
              <NotesWidget />
            </div>
          </div>
          <div>
            <TimerWidget />
          </div>
        </div>
        <div className="lg:col-span-1 h-full">
          <NewsWidget />
        </div>
      </div>
      <div className="fixed bottom-8 right-12">
        <button 
          onClick={() => navigate("/movies")}
          className="bg-[#148A08] hover:bg-[#117607] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
        >
          Browse
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
