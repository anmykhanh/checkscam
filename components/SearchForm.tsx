import React, { useState, useRef } from 'react';
import { Search, Phone, CreditCard, ShieldCheck, Globe, Facebook, Image as ImageIcon, Upload, X } from 'lucide-react';
import { CheckFormData } from '../types';

interface SearchFormProps {
  onSearch: (data: CheckFormData) => void;
  isLoading: boolean;
}

type SearchMode = 'PHONE' | 'BANK' | 'WEBSITE' | 'FACEBOOK' | 'IMAGE';

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('PHONE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Vui lòng chọn ảnh có kích thước dưới 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only send data relevant to the current mode
    const data: CheckFormData = {
      phoneNumber: searchMode === 'PHONE' ? phoneNumber : '',
      bankAccount: searchMode === 'BANK' ? bankAccount : '',
      bankName: searchMode === 'BANK' ? bankName : '',
      websiteUrl: searchMode === 'WEBSITE' ? websiteUrl : '',
      facebookUrl: searchMode === 'FACEBOOK' ? facebookUrl : '',
      image: searchMode === 'IMAGE' ? selectedImage : undefined
    };

    if (searchMode === 'PHONE' && !phoneNumber) return;
    if (searchMode === 'BANK' && !bankAccount) return;
    if (searchMode === 'WEBSITE' && !websiteUrl) return;
    if (searchMode === 'FACEBOOK' && !facebookUrl) return;
    if (searchMode === 'IMAGE' && !selectedImage) return;

    onSearch(data);
  };

  const isSubmitDisabled = isLoading || 
    (searchMode === 'PHONE' ? !phoneNumber : 
     searchMode === 'BANK' ? !bankAccount : 
     searchMode === 'WEBSITE' ? !websiteUrl :
     searchMode === 'FACEBOOK' ? !facebookUrl :
     !selectedImage);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full mr-3">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Kiểm tra Uy Tín</h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6 overflow-x-auto scrollbar-hide">
        <button
          type="button"
          onClick={() => setSearchMode('PHONE')}
          className={`flex-1 flex items-center justify-center py-2.5 px-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap min-w-[90px] ${
            searchMode === 'PHONE'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Phone className="w-4 h-4 mr-1 sm:mr-2" />
          SĐT
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('BANK')}
          className={`flex-1 flex items-center justify-center py-2.5 px-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap min-w-[110px] ${
            searchMode === 'BANK'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CreditCard className="w-4 h-4 mr-1 sm:mr-2" />
          Ngân hàng
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('WEBSITE')}
          className={`flex-1 flex items-center justify-center py-2.5 px-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap min-w-[90px] ${
            searchMode === 'WEBSITE'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Globe className="w-4 h-4 mr-1 sm:mr-2" />
          Website
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('FACEBOOK')}
          className={`flex-1 flex items-center justify-center py-2.5 px-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap min-w-[100px] ${
            searchMode === 'FACEBOOK'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Facebook className="w-4 h-4 mr-1 sm:mr-2" />
          Facebook
        </button>
        <button
          type="button"
          onClick={() => setSearchMode('IMAGE')}
          className={`flex-1 flex items-center justify-center py-2.5 px-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap min-w-[100px] ${
            searchMode === 'IMAGE'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ImageIcon className="w-4 h-4 mr-1 sm:mr-2" />
          Hình ảnh
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {searchMode === 'PHONE' && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              Số điện thoại cần kiểm tra
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại (VD: 0912345678)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              autoFocus
            />
          </div>
        )}

        {searchMode === 'BANK' && (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                Số tài khoản (STK)
              </label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Nhập số tài khoản..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên Ngân hàng (Không bắt buộc)
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="VD: Techcombank, MB..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        )}

        {searchMode === 'WEBSITE' && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-gray-400" />
              Địa chỉ Website / Domain
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Nhập tên miền (VD: sieu-re-apple.com)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              autoFocus
            />
          </div>
        )}

        {searchMode === 'FACEBOOK' && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Facebook className="w-4 h-4 mr-2 text-gray-400" />
              Link Facebook cá nhân / Fanpage / Group
            </label>
            <input
              type="text"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              placeholder="VD: https://www.facebook.com/username..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2 ml-1">
              * Hệ thống sẽ tự động trích xuất ID/Username từ link để tìm kiếm thông tin cảnh báo.
            </p>
          </div>
        )}

        {searchMode === 'IMAGE' && (
          <div className="animate-fade-in space-y-4">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-gray-400" />
              Ảnh chụp màn hình tin nhắn / Giao dịch
            </label>
            
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-blue-500"
              >
                <Upload className="w-10 h-10 mb-2" />
                <span className="font-medium text-sm">Nhấn để tải ảnh lên</span>
                <span className="text-xs text-blue-400 mt-1">(Hỗ trợ JPG, PNG)</span>
              </div>
            ) : (
              <div className="relative w-full h-auto bg-gray-100 rounded-lg p-2 border border-gray-200">
                <img src={selectedImage} alt="Preview" className="max-h-60 mx-auto rounded-md object-contain" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
            <p className="text-xs text-gray-500 ml-1">
              * AI sẽ phân tích văn bản trong ảnh (SĐT, STK, Nội dung) để phát hiện dấu hiệu lừa đảo.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-4 rounded-lg font-bold text-white shadow-lg transform transition-all flex items-center justify-center
            ${isSubmitDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/30'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang phân tích dữ liệu...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Kiểm Tra Uy Tín Ngay
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
          Hệ thống sẽ thực hiện <strong>Deep Search</strong> trên checkscam.vn, mmo4me.com, scam.vn, chongluadao.vn, các nhóm Facebook và Google.
        </p>
      </form>
    </div>
  );
};

export default SearchForm;