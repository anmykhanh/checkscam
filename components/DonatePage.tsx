import React from 'react';
import { Heart, Coffee, Server, Zap } from 'lucide-react';

const DonatePage: React.FC = () => {
  // VietQR link format for MB Bank
  const qrLink = `https://img.vietqr.io/image/MB-0353295337-compact2.png?amount=0&addInfo=Ung%20ho%20ANON&accountName=ANON`;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Side: Appeal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col justify-center">
          <div className="inline-flex items-center space-x-2 text-pink-600 font-bold mb-4 bg-pink-50 w-fit px-4 py-2 rounded-full">
            <Heart className="w-5 h-5 fill-current" />
            <span>Đồng hành cùng dự án</span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Giúp chúng tôi duy trì <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              hoạt động miễn phí
            </span>
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            ANON là dự án phi lợi nhuận. Sự ủng hộ của bạn sẽ giúp chúng tôi chi trả:
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Server className="w-6 h-6 text-blue-500 mr-3" />
              <span>Chi phí thuê Server & Hosting</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <span>Chi phí API Trí tuệ nhân tạo (AI)</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Coffee className="w-6 h-6 text-amber-700 mr-3" />
              <span>Ly cà phê cho đội ngũ phát triển</span>
            </div>
          </div>
        </div>

        {/* Right Side: QR Code */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center flex flex-col items-center">
          <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg transform -translate-y-2">
            NGÂN HÀNG QUÂN ĐỘI (MB BANK)
          </div>

          <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-300 mb-6">
             <img 
               src={qrLink} 
               alt="QR Code Donate MB Bank" 
               className="w-full max-w-[280px] h-auto rounded-lg"
             />
          </div>

          <div className="space-y-1 w-full bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Số tài khoản</p>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-2xl font-black text-blue-800 tracking-wider">0353295337</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              (Quét QR để tự động nhập thông tin)
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500 italic">
            "Một đóng góp nhỏ của bạn là động lực lớn để chúng tôi tiếp tục bảo vệ cộng đồng."
          </p>
        </div>

      </div>
    </div>
  );
};

export default DonatePage;