import React, { useState, useEffect } from "react";
const mockNews = [
  {
    title: "Heavy rains in Maharashtra, warning issued",
    description: "In the upcoming days, heavy rains are expected across multiple districts. Citizens are advised to stay indoors.",
    urlToImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=80",
    publishedAt: "2026-06-24T10:00:00Z"
  },
  {
    title: "Tech Giants Announce New AI Models",
    description: "The race for AGI continues as major companies release parameter-efficient models that outperform previous generations.",
    urlToImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    publishedAt: "2026-06-24T11:30:00Z"
  },
  {
    title: "Local Sports Team Wins Championship",
    description: "In a stunning upset, the underdogs managed to secure victory in the final seconds of the match.",
    urlToImage: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80",
    publishedAt: "2026-06-24T12:45:00Z"
  }
];
const NewsWidget = () => {
  const [news, setNews] = useState(mockNews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        if (!apiKey || apiKey === "your_news_api_key_here") {
          console.warn("No News API key found, using mock data.");
          setNews(mockNews);
          setLoading(false);
          return;
        }
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();
        if (data.status === "ok" && data.articles.length > 0) {
          const validArticles = data.articles.filter((article) => article.urlToImage);
          setNews(validArticles.length > 0 ? validArticles : mockNews);
        } else {
          setNews(mockNews);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews(mockNews);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [news.length]);
  if (loading) return <div className="h-full bg-neutral-800 rounded-[30px] p-6 animate-pulse" />;
  if (news.length === 0) return <div className="h-full bg-neutral-800 rounded-[30px] p-6 flex items-center justify-center text-white">No news available</div>;
  const currentArticle = news[currentIndex];
  return (
    <div className="bg-white rounded-[30px] overflow-hidden h-full flex flex-col relative group shadow-lg">
      <div className="h-[55%] w-full relative">
        <img 
          src={currentArticle.urlToImage} 
          alt="News Thumbnail" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-3 mb-2 leading-tight">
            {currentArticle.title}
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-medium">
            {new Date(currentArticle.publishedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="bg-white flex-1 p-6 sm:p-8 text-black overflow-y-auto hide-scrollbar">
        <p className="text-sm sm:text-base leading-relaxed text-gray-800">
          {currentArticle.description || "No description available for this article."}
        </p>
      </div>
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
export default NewsWidget;
