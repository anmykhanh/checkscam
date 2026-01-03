import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import AnalysisResultCard from './components/AnalysisResult';
import AboutPage from './components/AboutPage';
import DonatePage from './components/DonatePage';
import PreventionPage from './components/PreventionPage';
import { checkReputation } from './services/geminiService';
import { AnalysisResult, CheckFormData } from './types';
import { Shield, Heart, Info, Home, BookOpen } from 'lucide-react';

type PageView = 'HOME' | 'PREVENTION' | 'ABOUT' | 'DONATE';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('HOME');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (data: CheckFormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const dataResult = await checkReputation(
        data.phoneNumber, 
        data.bankAccount, 
        data.bankName,
        data.websiteUrl,
        data.facebookUrl,
        data.image // Pass the image data
      );
      setResult(dataResult);
    } catch (err: any) {
      setError(err.message || "Có lỗi không xác định xảy ra.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'PREVENTION':
        return <PreventionPage />;
      case 'ABOUT':
        return <AboutPage />;
      case 'DONATE':
        return <DonatePage />;
      case 'HOME':
      default:
        return (
          <>
            {/* Hero Text */}
            <div className="text-center mb-10 max-w-2xl animate-fade-in">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Kiểm tra độ uy tín <br/>
                <span className="text-blue-600">SĐT, Tài khoản, Web & Facebook</span>
              </h2>
              <p className="text-lg text-slate-600">
                Sử dụng trí tuệ nhân tạo để quét dữ liệu từ internet, tìm kiếm các báo cáo lừa đảo, "phốt" và cảnh báo cộng đồng.
              </p>
            </div>

            {/* Input Form */}
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />

            {/* Error Message */}
            {error && (
              <div className="mt-8 w-full max-w-2xl p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm animate-pulse">
                <p className="font-bold">Lỗi</p>
                <p>{error}</p>
              </div>
            )}

            {/* Result Display */}
            {result && <AnalysisResultCard result={result} />}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage('HOME')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
             <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600 hidden sm:block">
               ANON
             </h1>
          </button>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-4">
            <button 
              onClick={() => setCurrentPage('HOME')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'HOME' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Trang chủ</span>
            </button>

            <button 
              onClick={() => setCurrentPage('PREVENTION')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'PREVENTION' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Kinh nghiệm</span>
            </button>

            <button 
              onClick={() => setCurrentPage('ABOUT')}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'ABOUT' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Info className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Giới thiệu</span>
            </button>

            <button 
              onClick={() => setCurrentPage('DONATE')}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                currentPage === 'DONATE' 
                  ? 'bg-pink-100 text-pink-700 border border-pink-200' 
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/30 hover:scale-105'
              }`}
            >
              <Heart className={`w-4 h-4 sm:mr-2 ${currentPage === 'DONATE' ? 'fill-current' : 'fill-white'}`} />
              <span className="hidden sm:inline">Donate</span>
              <span className="sm:hidden">Ung ho</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-8 sm:pt-12 px-4 pb-20">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} ANON. Powered by Google Gemini.
          </p>
          <div className="flex justify-center space-x-6 mt-4 mb-4">
            <button onClick={() => setCurrentPage('ABOUT')} className="text-sm text-gray-500 hover:text-blue-600">Về dự án</button>
            <button onClick={() => setCurrentPage('DONATE')} className="text-sm text-gray-500 hover:text-pink-600">Ủng hộ</button>
          </div>
          <p className="text-gray-400 text-xs mt-2 max-w-md mx-auto">
            Dữ liệu được tổng hợp tự động từ internet. Chúng tôi không chịu trách nhiệm về tính chính xác tuyệt đối. Hãy giao dịch an toàn.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;