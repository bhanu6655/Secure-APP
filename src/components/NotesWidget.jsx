import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const NotesWidget = () => {
  // Initialize from Local Storage
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("super_app_notes") || "";
  });

  // Save to Local Storage whenever notes change
  useEffect(() => {
    if (notes.trim() === "") {
      localStorage.removeItem("super_app_notes");
    } else {
      localStorage.setItem("super_app_notes", notes);
    }
  }, [notes]);

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setNotes("");
    localStorage.removeItem("super_app_notes");
  };

  return (
    <div className="bg-[#F1C75B] rounded-[30px] p-6 h-full flex flex-col min-h-[300px] relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-black">All notes</h2>
        <button
          onClick={handleClear}
          type="button"
          className="text-black/60 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-black/10 relative z-10 cursor-pointer"
          title="Clear notes"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <textarea
        className="flex-1 bg-transparent border-none resize-none text-black focus:outline-none text-lg font-medium placeholder-black/50"
        placeholder={`Hi, I'm G. Bhanuprakash — B.Tech CSE (Cyber Security) grad from MLR Institute of Technology, Hyderabad.\nFull-Stack Developer skilled in React, Node.js & Java | Passionate about Cyber Security & building real-world apps.\n\nStart typing your notes here...`}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
};
export default NotesWidget;
