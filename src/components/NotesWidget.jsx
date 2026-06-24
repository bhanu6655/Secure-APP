import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const NotesWidget = () => {
  // Initialize from Local Storage
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("super_app_notes") || "";
  });

  // Save to Local Storage whenever notes change
  useEffect(() => {
    localStorage.setItem("super_app_notes", notes);
  }, [notes]);

  const handleClear = () => {
    setNotes("");
  };

  return (
    <div className="bg-[#F1C75B] rounded-[30px] p-6 h-full flex flex-col min-h-[300px] relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-black">All notes</h2>
        <button
          onClick={handleClear}
          className="text-black/60 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-black/10"
          title="Clear notes"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <textarea
        className="flex-1 bg-transparent border-none resize-none text-black focus:outline-none text-lg font-medium placeholder-black/50"
        placeholder="Hello, my name is G. Bhanuprakash.
I recently completed my B.Tech in Computer Science Engineering with a specialization in Cyber Security from MLR Institute of Technology, Hyderabad.
My core technical skills include Java, Python, JavaScript, SQL, HTML, CSS, React.js, Node.js, and Express.js.
I have a strong understanding of Object-Oriented Programming, Data Structures & Algorithms, and Database Management Systems.
I am proficient in working with MySQL, SQLite, Git, GitHub, REST APIs, and Postman.
I have experience developing full-stack web applications and backend APIs.
I am particularly interested in Full-Stack Development, Software Engineering, and Cyber Security.
I enjoy building real-world applications that solve practical problems.
My projects include an AI-Driven Smart Travel Assistance system, a Secure Voting Backend, and a Document & Speech Multilingual Translator.
These projects helped me strengthen my problem-solving, debugging, and development skills.
I am passionate about learning new technologies and continuously improving my technical knowledge.
Apart from technical skills, I value teamwork, communication, adaptability, and continuous learning.
I am looking for an opportunity where I can apply my skills, contribute to meaningful projects, and grow professionally."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
};
export default NotesWidget;
