import React from 'react';
import { ShieldCheck, Lock, Video, PackageCheck, AlertTriangle, UserCheck, DollarSign, Search } from 'lucide-react';

const PreventionPage: React.FC = () => {
  const tips = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "1. Kiểm tra Uy Tín (Check Legit)",
      description: "Trước khi chuyển tiền, hãy nhập SĐT, STK, hoặc Link Facebook vào công cụ ANON này. Đồng thời, tìm kiếm Google với cú pháp: \"SĐT + lừa đảo\" hoặc tìm trong các group Check Scammer trên Facebook.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      title: "2. Giao dịch Trung Gian (Middleman)",
      description: "Với giao dịch giá trị lớn (mua bán tài khoản, vật phẩm game...), TUYỆT ĐỐI nên sử dụng dịch vụ trung gian uy tín (Admin các group lớn). Người trung gian sẽ giữ tiền cho đến khi bạn nhận và kiểm tra hàng xong mới chuyển cho người bán.",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <Video className="w-8 h-8 text-purple-600" />,
      title: "3. Video Call xác thực",
      description: "Yêu cầu người bán gọi Video Call thấy mặt và thấy sản phẩm trực tiếp. Tránh xa những người từ chối Video Call với lý do \"camera hỏng\" hoặc \"đang bận\". Chú ý khớp mặt người gọi với ảnh trên Facebook/CCCD.",
      color: "bg-purple-50 border-purple-100"
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-orange-600" />,
      title: "4. Ship COD - Đồng kiểm",
      description: "Khi mua hàng online, hãy yêu cầu Ship COD (nhận hàng mới thanh toán) và ĐƯỢC PHÉP KIỂM TRA HÀNG (Đồng kiểm). Nếu người bán không cho xem hàng, khả năng cao là tráo hàng hoặc gửi rác.",
      color: "bg-orange-50 border-orange-100"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-red-600" />,
      title: "5. Cẩn thận \"Của rẻ là của ôi\"",
      description: "Cảnh giác với các món hàng giá rẻ bất ngờ (Rẻ hơn 30-50% giá thị trường). Lừa đảo thường đánh vào lòng tham để dụ bạn chuyển cọc rồi chặn liên lạc.",
      color: "bg-red-50 border-red-100"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-indigo-600" />,
      title: "6. Soi Profile Facebook",
      description: "Tránh giao dịch với nick Facebook ảo: Mới tạo, ít bài đăng, ít tương tác, không có ảnh thật, khóa bình luận, hoặc ảnh bìa/avatar vừa mới thay đổi gần đây.",
      color: "bg-indigo-50 border-indigo-100"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
          <ShieldCheck className="w-10 h-10 mr-3 text-blue-600" />
          Kinh nghiệm phòng tránh lừa đảo
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          "Phòng bệnh hơn chữa bệnh" - Hãy ghi nhớ những nguyên tắc vàng dưới đây để bảo vệ ví tiền của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={`rounded-2xl border p-6 hover:shadow-lg transition-shadow duration-300 ${tip.color}`}
          >
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-xl shadow-sm mr-4 flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start">
        <AlertTriangle className="w-8 h-8 text-yellow-600 mr-4 flex-shrink-0" />
        <div>
           <h4 className="text-lg font-bold text-yellow-800 mb-1">Cảnh báo về "Dịch vụ lấy lại tiền lừa đảo"</h4>
           <p className="text-yellow-700 text-sm leading-relaxed">
             Tuyệt đối KHÔNG tin vào các dịch vụ "nhận lấy lại tiền bị lừa đảo" trên mạng. 99% đây là hình thức lừa đảo lần 2 (Scam chồng Scam). Chỉ cơ quan công an mới có thẩm quyền xử lý.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PreventionPage;