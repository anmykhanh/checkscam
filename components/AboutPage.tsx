import React from 'react';
import { Shield, Users, Brain, Database, ExternalLink } from 'lucide-react';

const AboutPage: React.FC = () => {
  const sources = [
    {
      name: "Cổng cảnh báo (NCSC)",
      url: "https://canhbao.ncsc.gov.vn",
      description: "Cơ sở dữ liệu cảnh báo quốc gia (Bộ TTTT)."
    },
    {
      name: "Tín Nhiệm Mạng",
      url: "https://tinnhiemmang.vn",
      description: "Tra cứu tín nhiệm website và tổ chức."
    },
    {
      name: "ChongLuaDao.vn",
      url: "https://chongluadao.vn",
      description: "Dự án cộng đồng bảo vệ người dùng internet."
    },
    {
      name: "CheckScam.vn",
      url: "https://checkscam.vn",
      description: "Cộng đồng tố cáo lừa đảo lớn nhất Việt Nam."
    },
    {
      name: "Scam.vn",
      url: "https://scam.vn",
      description: "Cơ sở dữ liệu phòng chống lừa đảo trực tuyến."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-10 text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Về ANON</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Dự án phi lợi nhuận sử dụng Trí tuệ nhân tạo để bảo vệ cộng đồng trước vấn nạn lừa đảo trực tuyến.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-10">
          
          {/* Mission */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sứ mệnh vì cộng đồng</h3>
              <p className="text-gray-600 leading-relaxed">
                ANON được xây dựng hoàn toàn miễn phí với mục tiêu duy nhất: <strong>Làm sạch môi trường mạng</strong>. 
                Chúng tôi hiểu rằng mỗi ngày có hàng ngàn người bị lừa đảo qua mạng, và công cụ này ra đời để giúp mọi người có thêm một lớp lá chắn bảo vệ trước khi thực hiện giao dịch.
              </p>
            </div>
          </div>

          {/* Technology */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-purple-50 p-3 rounded-xl flex-shrink-0">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Công nghệ AI tiên tiến</h3>
              <p className="text-gray-600 leading-relaxed">
                Khác với các công cụ tìm kiếm thông thường, ANON sử dụng mô hình ngôn ngữ lớn (LLM) của Google Gemini để:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside ml-2">
                <li>Thực hiện "Deep Search" (tìm kiếm sâu) trên hàng loạt nguồn dữ liệu (Checkscam, Scam.vn, MMO4ME, Facebook, ChongLuaDao...).</li>
                <li>Phân tích ngữ cảnh và ngôn ngữ tự nhiên để phát hiện các bài "bóc phốt" bị ẩn.</li>
                <li>Tổng hợp thông tin và đưa ra cảnh báo rủi ro dễ hiểu nhất.</li>
              </ul>
            </div>
          </div>

          {/* Transparent Sources */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
              <Database className="w-8 h-8 text-green-600" />
            </div>
            <div className="w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nguồn dữ liệu công khai & Minh bạch</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Để đảm bảo tính khách quan, hệ thống ưu tiên đối chiếu thông tin từ các cơ sở dữ liệu quốc gia và cộng đồng uy tín sau:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-3 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800 group-hover:text-green-700">{source.name}</span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                    </div>
                    <span className="text-xs text-gray-500">{source.description}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-400">
             <h4 className="font-bold text-gray-700 mb-2">Miễn trừ trách nhiệm</h4>
             <p className="text-sm text-gray-500 text-justify">
               ANON là công cụ hỗ trợ tra cứu thông tin công khai trên internet. Kết quả phân tích phụ thuộc vào dữ liệu tìm thấy tại thời điểm tra cứu. 
               Chúng tôi không khẳng định tuyệt đối một SĐT/STK là lừa đảo hay uy tín, mà chỉ cung cấp thông tin để bạn tham khảo. 
               Hãy luôn tỉnh táo và tự chịu trách nhiệm cho các giao dịch của mình.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;