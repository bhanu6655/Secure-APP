import React from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
const UserProfileWidget = () => {
  const { user, categories, resetStore } = useStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    resetStore();
    navigate("/");
  };
  return (
    <div className="bg-[#5746EA] rounded-[30px] p-6 flex gap-6 w-full overflow-hidden h-full relative">
      <button 
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2.5 rounded-full transition-all"
        title="Logout"
      >
        <LogOut size={16} />
      </button>
      <div className="w-1/3 min-w-[100px] h-full rounded-[24px] overflow-hidden shrink-0 border-2 border-white shadow-lg bg-black">
        <img 
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80" 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 text-white justify-center overflow-hidden">
        <p className="text-sm md:text-base mb-1 truncate text-gray-100">{user.name || "KK Vinay"}</p>
        <p className="text-sm md:text-base text-[#D3CFF8] mb-2 truncate">{user.email || "Vinay090@gmail.com"}</p>
        <p className="text-3xl md:text-4xl font-bold mb-6 truncate">{user.username || "vinay060"}</p>
        <div className="grid grid-cols-2 gap-3 mt-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-[#8E80EB] px-3 py-1.5 rounded-full text-xs md:text-sm text-center truncate">
              {cat.name}
            </div>
          ))}
          {categories.length === 0 && (
            <>
              <div className="bg-[#8E80EB] px-3 py-1.5 rounded-full text-xs md:text-sm text-center truncate">Horror</div>
              <div className="bg-[#8E80EB] px-3 py-1.5 rounded-full text-xs md:text-sm text-center truncate">Thriller</div>
              <div className="bg-[#8E80EB] px-3 py-1.5 rounded-full text-xs md:text-sm text-center truncate">Action</div>
              <div className="bg-[#8E80EB] px-3 py-1.5 rounded-full text-xs md:text-sm text-center truncate">Fiction</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfileWidget;
