import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Calendar, RefreshCw } from 'lucide-react';
import { fetchScamNews } from '../services/geminiService';
import { NewsItem } from '../types';

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchScamNews();
      if (data.length === 0) {
        setError("Không tìm thấy tin tức nào hoặc AI đang bận.");
      } else {
        setNews(data);
      }
    } catch (err) {
      setError("Không thể tải tin tức. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <Newspaper className="w-8 h-8 mr-3 text-red-600" />
            Cảnh báo lừa đảo
          </h2>
          <p className="text-gray-600 mt-2">Tổng hợp tin tức mới nhất từ các nguồn báo chí chính thống.</p>
        </div>
        <button
          onClick={loadNews}
          disabled={isLoading}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Làm mới
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 animate-pulse flex flex-col justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-1/4 mt-4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={loadNews} 
            className="text-blue-600 font-medium hover:underline"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <a 
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition-all group flex flex-col h-full"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.source}</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {item.publishedDate}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
                  {item.summary}
                </p>
              </div>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                Đọc chi tiết <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;