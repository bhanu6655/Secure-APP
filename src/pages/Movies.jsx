import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
const MOCK_MOVIES = {
  Action: [
    { imdbID: "tt0468569", Title: "The Dark Knight", Year: "2008", Poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80", Runtime: "152 min", Genre: "Action, Crime, Drama", Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Actors: "Christian Bale, Heath Ledger, Aaron Eckhart" },
    { imdbID: "tt0133093", Title: "The Matrix", Year: "1999", Poster: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80", Runtime: "136 min", Genre: "Action, Sci-Fi", Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss" }
  ],
  Drama: [
    { imdbID: "tt0111161", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80", Runtime: "142 min", Genre: "Drama", Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", Actors: "Tim Robbins, Morgan Freeman, Bob Gunton" }
  ],
  Comedy: [
    { imdbID: "tt0816692", Title: "Interstellar", Year: "2014", Poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80", Runtime: "169 min", Genre: "Adventure, Drama, Sci-Fi", Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain" }
  ]
};
const Movies = () => {
  const { categories, user } = useStore();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviesByCat, setMoviesByCat] = useState({});
  const [loadingModal, setLoadingModal] = useState(false);
  const displayCategories = categories.length > 0 ? categories : [{ name: "Action" }];
  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      if (!apiKey || apiKey === "your_omdb_api_key_here") {
        setMoviesByCat(MOCK_MOVIES);
        return;
      }
      const newMoviesByCat = {};
      for (const cat of displayCategories) {
        try {
          const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(cat.name)}&type=movie&apikey=${apiKey}`);
          const data = await response.json();
          if (data.Search) {
            const validMovies = data.Search.filter(m => m.Poster !== "N/A");
            newMoviesByCat[cat.name] = validMovies.length > 0 ? validMovies : (MOCK_MOVIES[cat.name] || MOCK_MOVIES["Action"]);
          } else {
            newMoviesByCat[cat.name] = MOCK_MOVIES[cat.name] || MOCK_MOVIES["Action"];
          }
        } catch (error) {
          console.error(`Error fetching movies for ${cat.name}:`, error);
          newMoviesByCat[cat.name] = MOCK_MOVIES[cat.name] || MOCK_MOVIES["Action"];
        }
      }
      setMoviesByCat(newMoviesByCat);
    };
    fetchMovies();
  }, [categories]);
  const handleMovieClick = async (movie) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    if (!apiKey || apiKey === "your_omdb_api_key_here") {
      setSelectedMovie(movie); 
      return;
    }
    setLoadingModal(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
      const data = await response.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setSelectedMovie(movie);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setSelectedMovie(movie);
    } finally {
      setLoadingModal(false);
    }
  };
  const handleLogout = () => {
    const { resetStore } = useStore.getState();
    resetStore();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-black text-white p-8 lg:p-12 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#72DB73]">Super app</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white transition"
          >
            Dashboard
          </button>
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition ml-2 flex items-center gap-2"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-8">Entertainment according to your choices</h2>
      <div className="space-y-12">
        {displayCategories.map((cat, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-2xl font-medium text-gray-300">{cat.name}</h3>
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
              {(moviesByCat[cat.name] || MOCK_MOVIES[cat.name] || MOCK_MOVIES["Action"]).map((movie, i) => (
                <div 
                  key={i} 
                  className="w-64 shrink-0 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#72DB73]/20"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img src={movie.Poster} alt={movie.Title} className="w-full h-80 object-cover" />
                  <div className="bg-[#1A1821] p-4">
                    <h4 className="font-bold truncate text-lg">{movie.Title}</h4>
                    <p className="text-gray-400 text-sm">{movie.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {(selectedMovie || loadingModal) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMovie(null)}>
          <div className="bg-[#1A1821] max-w-3xl w-full rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 z-10"
              onClick={() => setSelectedMovie(null)}
            >
              ✕
            </button>
            {loadingModal ? (
              <div className="w-full p-20 flex justify-center items-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : selectedMovie ? (
              <>
                <div className="w-full md:w-1/3 bg-black">
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="w-full h-full object-cover min-h-[300px]" />
                </div>
                <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-2">{selectedMovie.Title} ({selectedMovie.Year})</h2>
                  <p className="text-[#72DB73] font-medium mb-4">{selectedMovie.Genre || "Genre N/A"} • {selectedMovie.Runtime || "Runtime N/A"}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-6">{selectedMovie.Plot || "No plot available."}</p>
                  <div>
                    <h4 className="font-bold text-gray-400 uppercase text-sm mb-1">Cast</h4>
                    <p className="text-white">{selectedMovie.Actors || "Actors N/A"}</p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default Movies;
