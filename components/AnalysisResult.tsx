import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Info, ExternalLink, FileText, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from '../types';

interface ResultProps {
  result: AnalysisResult;
}

const AnalysisResultCard: React.FC<ResultProps> = ({ result }) => {
  const getTheme = () => {
    switch (result.riskLevel) {
      case 'SAFE':
        return {
          mainColor: 'text-green-700',
          borderColor: 'border-green-200',
          bgColor: 'bg-green-50',
          headerBg: 'bg-gradient-to-r from-green-600 to-green-500',
          summaryBg: 'bg-green-50',
          summaryBorder: 'border-green-300',
          title: 'AN TOÀN / KHÔNG PHÁT HIỆN RỦI RO',
          icon: <CheckCircle className="w-10 h-10 text-white" />
        };
      case 'WARNING':
        return {
          mainColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          bgColor: 'bg-orange-50',
          headerBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
          summaryBg: 'bg-orange-50',
          summaryBorder: 'border-orange-300',
          title: 'CẢNH BÁO: CẦN THẬN TRỌNG',
          icon: <AlertTriangle className="w-10 h-10 text-white" />
        };
      case 'HIGH_RISK':
        return {
          mainColor: 'text-red-700',
          borderColor: 'border-red-200',
          bgColor: 'bg-red-50',
          headerBg: 'bg-gradient-to-r from-red-600 to-red-500',
          summaryBg: 'bg-red-50',
          summaryBorder: 'border-red-300',
          title: 'RỦI RO CAO',
          icon: <ShieldAlert className="w-10 h-10 text-white" />
        };
      case 'UNKNOWN':
      default:
        return {
          mainColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          bgColor: 'bg-gray-50',
          headerBg: 'bg-gradient-to-r from-gray-600 to-gray-500',
          summaryBg: 'bg-gray-100',
          summaryBorder: 'border-gray-300',
          title: 'CHƯA ĐỦ DỮ LIỆU ĐÁNH GIÁ',
          icon: <Info className="w-10 h-10 text-white" />
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="w-full max-w-3xl mt-8 rounded-2xl overflow-hidden shadow-xl border border-gray-100 animate-fade-in bg-white">
      
      {/* 1. Header Section: High visual impact for the Result */}
      <div className={`${theme.headerBg} p-6 flex items-center shadow-sm`}>
        <div className="mr-4 flex-shrink-0">
          {theme.icon}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
            {theme.title}
          </h2>
          <p className="text-white text-opacity-90 text-sm mt-1">
            Kết quả phân tích từ AI và dữ liệu Internet
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        
        {/* 2. Summary Section: Distinct box */}
        <section>
          <div className="flex items-center mb-3">
             <FileText className={`w-5 h-5 mr-2 ${theme.mainColor}`} />
             <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Tóm tắt nhanh</h3>
          </div>
          <div className={`${theme.summaryBg} border-l-4 ${theme.summaryBorder} p-5 rounded-r-lg shadow-sm`}>
            <p className={`text-base font-medium ${theme.mainColor} leading-relaxed`}>
              {result.summary}
            </p>
          </div>
        </section>

        {/* 3. Detailed Analysis Section: Better formatting with Markdown */}
        <section>
          <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
             <Search className="w-5 h-5 mr-2 text-blue-600" />
             <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Phân tích chi tiết</h3>
          </div>
          
          <div className="prose prose-slate prose-sm sm:prose-base max-w-none text-gray-700">
             <ReactMarkdown 
               components={{
                 ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 my-2" {...props} />,
                 li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                 strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                 p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
               }}
             >
               {result.details}
             </ReactMarkdown>
          </div>
        </section>

        {/* 4. Sources Section */}
        {result.sources.length > 0 && (
          <section className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Nguồn dữ liệu tham khảo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all group"
                >
                  <span className="text-xs font-bold text-gray-400 mr-2 mt-0.5 group-hover:text-blue-500">
                    #{index + 1}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-700">
                      {source.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5 group-hover:text-blue-400">
                      {new URL(source.uri).hostname}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalysisResultCard;