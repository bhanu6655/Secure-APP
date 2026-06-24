import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { AlertTriangle } from "lucide-react";
const ALL_CATEGORIES = [
  { id: "action", name: "Action", color: "bg-[#FF5209]", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
  { id: "drama", name: "Drama", color: "bg-[#D7A4FF]", img: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400&q=80" },
  { id: "romance", name: "Romance", color: "bg-[#148A08]", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&q=80" },
  { id: "thriller", name: "Thriller", color: "bg-[#84C2FF]", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80" },
  { id: "fantasy", name: "Fantasy", color: "bg-[#FF4ADE]", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { id: "music", name: "Music", color: "bg-[#E61E32]", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80" },
  { id: "comedy", name: "Comedy", color: "bg-[#FF5209]", img: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&q=80" },
  { id: "sports", name: "Sports", color: "bg-[#148A08]", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80" }
];
const Categories = () => {
  const { categories, setCategories } = useStore();
  const [selected, setSelected] = useState(categories);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const toggleCategory = (cat) => {
    let newSelected;
    if (selected.find(c => c.id === cat.id)) {
      newSelected = selected.filter(c => c.id !== cat.id);
    } else {
      newSelected = [...selected, cat];
    }
    setSelected(newSelected);
    if (newSelected.length >= 3) {
      setError(false);
    }
  };
  const handleNext = () => {
    if (selected.length < 3) {
      setError(true);
      return;
    }
    setCategories(selected);
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-24 flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/3 flex flex-col">
        <h2 className="text-5xl text-[#72DB73] font-bold mb-8">Super app</h2>
        <h1 className="text-6xl font-bold mb-12 tracking-tight leading-tight">Choose your<br />entertainment<br />category</h1>
        <div className="flex flex-wrap gap-4 mt-auto mb-12">
          {selected.map((cat) => (
            <div key={cat.id} className="bg-[#148A08] text-white px-4 py-2 rounded-full flex items-center gap-2">
              <span>{cat.name}</span>
              <button 
                onClick={() => toggleCategory(cat)}
                className="text-[#0f1014] hover:text-black font-bold ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-500 mt-4">
            <AlertTriangle size={20} />
            <p>Minimum 3 category required</p>
          </div>
        )}
      </div>
      <div className="lg:w-2/3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {ALL_CATEGORIES.map((cat) => {
            const isSelected = selected.some(c => c.id === cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 h-48 border-4 ${isSelected ? 'border-[#72DB73]' : 'border-transparent'} ${cat.color}`}
              >
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-white z-10 relative">{cat.name}</h3>
                </div>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="absolute bottom-0 right-0 w-32 h-24 object-cover rounded-tl-xl opacity-90"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-12">
          <button 
            onClick={handleNext}
            className="bg-[#148A08] hover:bg-[#117607] text-white font-bold py-3 px-12 rounded-full transition-colors"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};
export default Categories;
