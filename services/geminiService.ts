import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Source, NewsItem } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// --- REPUTATION CHECK SERVICE ---
export const checkReputation = async (
  phoneNumber: string,
  bankAccount: string,
  bankName: string = '',
  websiteUrl: string = '',
  facebookUrl: string = '',
  imageBase64: string = ''
): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("Chưa cấu hình API Key");
  }

  // Determine what we are checking
  const isPhoneCheck = phoneNumber && phoneNumber.trim().length > 0;
  const isBankCheck = bankAccount && bankAccount.trim().length > 0;
  const isWebsiteCheck = websiteUrl && websiteUrl.trim().length > 0;
  const isFacebookCheck = facebookUrl && facebookUrl.trim().length > 0;
  const isImageCheck = imageBase64 && imageBase64.length > 0;

  if (!isPhoneCheck && !isBankCheck && !isWebsiteCheck && !isFacebookCheck && !isImageCheck) {
    throw new Error("Vui lòng nhập thông tin cần kiểm tra.");
  }

  let prompt = "";
  let reqContents: any;

  // --- LOGIC FOR IMAGE CHECK ---
  if (isImageCheck) {
    prompt = `Bạn là một chuyên gia an ninh mạng và điều tra lừa đảo trực tuyến (OSINT).
    
    NHIỆM VỤ CỦA BẠN:
    1. Phân tích hình ảnh được cung cấp (đây là ảnh chụp màn hình tin nhắn, giao dịch ngân hàng, hoặc hồ sơ mạng xã hội).
    2. Sử dụng khả năng OCR để đọc toàn bộ văn bản trong ảnh.
    3. Trích xuất các thực thể quan trọng: Số điện thoại, Số tài khoản ngân hàng, Tên người nhận, Link Website, Tên Facebook, Mã giao dịch...
    4. Phân tích ngữ nghĩa và ngữ cảnh: Tìm kiếm các dấu hiệu lừa đảo như tin nhắn giả mạo brandname, dụ dỗ việc nhẹ lương cao, biên lai chuyển tiền giả (fake bill), đe dọa, hoặc thông báo trúng thưởng giả.
    
    HÀNH ĐỘNG TÌM KIẾM (Tự động):
    - Nếu trích xuất được SĐT, STK, Website, hãy sử dụng Google Search để kiểm tra xem chúng có nằm trong danh sách đen (checkscam, scam.vn, chongluadao...) hay không.
    - Tìm kiếm các từ khóa liên quan đến nội dung tin nhắn nếu nó có dấu hiệu kịch bản lừa đảo phổ biến.

    ĐỊNH DẠNG TRẢ LỜI (VĂN BẢN THUẦN - MARKDOWN):
    ---------------------------------------------------
    Mức độ rủi ro: [AN TOÀN | CẢNH BÁO | RỦI RO CAO | KHÔNG RÕ]
    Tóm tắt: [Tóm tắt ngắn gọn nội dung ảnh và kết luận rủi ro]
    Chi tiết: 
    [Báo cáo chi tiết:
     - **Phân tích hình ảnh**: Liệt kê các thông tin trích xuất được (SĐT, STK...). Nhận xét về tính xác thực của hình ảnh (font chữ, layout có bị chỉnh sửa không).
     - **Dấu hiệu đáng ngờ**: Chỉ ra các điểm bất thường trong nội dung tin nhắn/giao dịch.
     - **Kết quả kiểm tra dữ liệu**: Kết quả tìm kiếm các thông tin trích xuất được trên mạng.
     - **Lời khuyên**: Cần làm gì tiếp theo.]
    ---------------------------------------------------
    `;

    // Strip header if present to get raw base64
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    reqContents = {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
        { text: prompt }
      ]
    };

  } else {
    // --- LOGIC FOR TEXT CHECK (Existing) ---
    let querySubject = "";
    let subjectType = "";

    if (isPhoneCheck) {
      querySubject = phoneNumber;
      subjectType = "Số điện thoại";
    } else if (isBankCheck) {
      querySubject = bankAccount;
      subjectType = "Số tài khoản";
    } else if (isWebsiteCheck) {
      querySubject = websiteUrl;
      subjectType = "Website/Tên miền";
    } else if (isFacebookCheck) {
      querySubject = facebookUrl;
      subjectType = "Tài khoản Facebook";
    }

    // Construct smart checkscam URLs
    const checkscamUrls = [];
    if (isPhoneCheck) checkscamUrls.push(`https://checkscam.vn/?qh_ss=${phoneNumber}`);
    if (isBankCheck) checkscamUrls.push(`https://checkscam.vn/?qh_ss=${bankAccount}`);

    const scamKeywords = ["lừa đảo", "scam", "phốt", "cảnh báo", "blacklist", "bùng hàng", "gian lận", "bom hàng", "tố cáo"];
    const webKeywords = ["giả mạo", "phishing", "fake", "không uy tín", "đánh giá", "review"];
    
    // Build Prompt Segments
    let specializedSourcesSegment = "";
    if (isWebsiteCheck) {
      specializedSourcesSegment = `
       - "site:chongluadao.vn ${querySubject}" (Ưu tiên hàng đầu cho website)
       - "site:scamadviser.com ${querySubject}"
       - "site:virustotal.com ${querySubject}"
       - "site:tinhte.vn ${querySubject} lừa đảo"
       - "site:voz.vn ${querySubject} lừa đảo"
       - "site:reviewcongty.com ${querySubject}"
      `;
    } else if (isFacebookCheck) {
      specializedSourcesSegment = `
       - "site:checkscam.vn ${querySubject}"
       - "site:scam.vn ${querySubject}"
       - "site:mmo4me.com ${querySubject}"
       - "site:admin.vn ${querySubject}"
      `;
    } else {
      const checkscamLink = checkscamUrls.length > 0 ? checkscamUrls[0] : "";
      specializedSourcesSegment = `
       - Truy cập đường dẫn định danh: "${checkscamLink}"
       - "site:checkscam.vn ${querySubject}"
       - "site:scam.vn ${querySubject}"
       - "site:mmo4me.com ${querySubject}"
       - "site:admin.vn ${querySubject}"
       - "site:toiuytin.com ${querySubject}"
       - "site:otofun.net ${querySubject} lừa đảo"
       - "site:lamchame.com ${querySubject} lừa đảo"
      `;
    }

    let facebookStrategySegment = "";
    if (isFacebookCheck) {
      facebookStrategySegment = `
       - Tìm kiếm chính xác link Profile/Page này trên Google để xem có bài đăng cảnh báo nào từ các trang web khác không.
       - Cú pháp: "${querySubject} lừa đảo", "${querySubject} phốt"
      `;
    } else {
      facebookStrategySegment = `
       - Cú pháp:
         - "site:facebook.com ${querySubject}"
         - "site:facebook.com ${querySubject} lừa đảo"
         - "site:facebook.com ${querySubject} phốt"
         - "site:facebook.com ${querySubject} cảnh báo"
      `;
    }

    let extraKeywords = scamKeywords.map(kw => `- "${querySubject} ${kw}"`).join('\n       ');
    if (isWebsiteCheck) {
      extraKeywords += '\n       ' + webKeywords.map(kw => `- "${querySubject} ${kw}"`).join('\n       ');
    }
    
    if (isFacebookCheck) {
        extraKeywords += `\n       - Trích xuất ID hoặc Username từ link Facebook "${facebookUrl}" để tìm kiếm.`;
        extraKeywords += `\n       - Tìm kiếm các bài viết trong các Group "Chống lừa đảo", "Bóc phốt" có chứa link Facebook này.`;
    }

    prompt = `Bạn là một chuyên gia điều tra an ninh mạng và phát hiện lừa đảo trực tuyến (OSINT) tại Việt Nam.
    
    ĐỐI TƯỢNG ĐIỀU TRA:
    - Loại: ${subjectType}
    - Giá trị: "${querySubject}"
    ${isBankCheck && bankName ? `- Ngân hàng: ${bankName}` : ''}

    NHIỆM VỤ CẤP BÁCH: 
    Sử dụng công cụ Google Search để thực hiện "Deep Search" (Tìm kiếm sâu) nhằm tìm ra bất kỳ dấu vết tiêu cực ("phốt") nào liên quan đến đối tượng trên.

    CHIẾN LƯỢC TÌM KIẾM MỞ RỘNG (BẮT BUỘC):
    
    1. **QUÉT CÁC KHO DỮ LIỆU TÍN NHIỆM & CẢNH BÁO QUỐC GIA**:
       - "site:canhbao.ncsc.gov.vn ${querySubject}" (Cổng cảnh báo an toàn thông tin Việt Nam)
       - "site:tinnhiemmang.vn ${querySubject}" (Dữ liệu Tín Nhiệm Mạng)
       - "site:phongchongluadao.vn ${querySubject}"

    2. **QUÉT CÁC KHO DỮ LIỆU CỘNG ĐỒNG CHUYÊN BIỆT**:
       ${specializedSourcesSegment}

    3. **QUÉT FACEBOOK TOÀN DIỆN**:
       ${facebookStrategySegment}

    4. **TÌM KIẾM TỪ KHÓA MỞ RỘNG TRÊN GOOGLE**:
       - Kết hợp với các từ khóa rủi ro:
         ${extraKeywords}

    QUY TRÌNH PHÂN TÍCH VÀ KẾT LUẬN:
    
    - **RỦI RO CAO**: 
      - Xuất hiện trên Cổng cảnh báo NCSC, checkscam, mmo4me, scam.vn, chongluadao...
      - Có bài đăng tố cáo chi tiết trên Facebook/Diễn đàn (Otofun, Voz...).
    - **CẢNH BÁO**: 
      - Thông tin không rõ ràng, nick ảo, web mới, hoặc có người nghi ngờ nhưng chưa kết luận.
      - Dấu hiệu nick clone, mới tạo, bán hàng giá rẻ bất thường.
    - **AN TOÀN/KHÔNG RÕ**: 
      - Không tìm thấy thông tin xấu (Không rõ).
      - Được xác thực bởi Tín Nhiệm Mạng hoặc các nguồn uy tín (An toàn).

    ĐỊNH DẠNG TRẢ LỜI (VĂN BẢN THUẦN - KHÔNG DÙNG JSON):
    ---------------------------------------------------
    Mức độ rủi ro: [AN TOÀN | CẢNH BÁO | RỦI RO CAO | KHÔNG RÕ]
    Tóm tắt: [Viết 2-3 câu tóm tắt ngắn gọn, súc tích bằng ngôn ngữ tự nhiên]
    Chi tiết: 
    [Viết một bài báo cáo phân tích chi tiết, dễ đọc, thân thiện. 
     Tuyệt đối KHÔNG dùng định dạng code block hay JSON.
     Sử dụng Markdown để trình bày đẹp mắt:
     - Dùng gạch đầu dòng (-) cho các ý.
     - Dùng in đậm (**) để nhấn mạnh các từ khóa quan trọng hoặc tên nguồn dữ liệu.
     - Chia đoạn rõ ràng.]
    ---------------------------------------------------
    `;

    reqContents = prompt;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: reqContents,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Không thể phân tích dữ liệu.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract sources
    const sources: Source[] = [];
    chunks.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({
          title: chunk.web.title || "Nguồn tin Google/Facebook",
          uri: chunk.web.uri || "#"
        });
      }
    });

    // Parsing logic
    const lowerText = text.toLowerCase();
    
    // Extract Risk Level
    let riskLevel: AnalysisResult['riskLevel'] = 'UNKNOWN';
    if (lowerText.includes('rủi ro cao') || lowerText.includes('lừa đảo') || lowerText.includes('scam') || lowerText.includes('phishing') || lowerText.includes('giả mạo') || lowerText.includes('fake bill')) {
      riskLevel = 'HIGH_RISK';
    } else if (lowerText.includes('cảnh báo') || lowerText.includes('nghi ngờ') || lowerText.includes('spam') || lowerText.includes('điểm tín nhiệm thấp') || lowerText.includes('nick ảo') || lowerText.includes('bất thường')) {
      riskLevel = 'WARNING';
    } else if (lowerText.includes('an toàn') || lowerText.includes('chưa ghi nhận') || lowerText.includes('không tìm thấy')) {
      if (lowerText.includes('an toàn') || lowerText.includes('sạch') || lowerText.includes('tín nhiệm cao')) {
        riskLevel = 'SAFE';
      } else {
        riskLevel = 'UNKNOWN';
      }
    }

    // Parse Text content
    let summaryParts = text.split('Chi tiết:');
    let summary = summaryParts[0]
      .replace('Mức độ rủi ro:', '')
      .replace('Tóm tắt:', '')
      .trim();
    
    summary = summary.replace(/^["']|["']$/g, '').trim();

    const details = summaryParts.length > 1 ? summaryParts[1].trim() : text;

    return {
      riskLevel,
      summary,
      details,
      sources: sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Hệ thống AI đang quá tải hoặc gặp lỗi kết nối. Vui lòng thử lại sau.");
  }
};

// --- NEWS FETCH SERVICE ---
export const fetchScamNews = async (): Promise<NewsItem[]> => {
  if (!apiKey) return [];

  const prompt = "Tìm kiếm 6 tin tức mới nhất về cảnh báo lừa đảo trực tuyến, tội phạm mạng tại Việt Nam trong 7 ngày qua từ các báo chính thống.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              url: { type: Type.STRING },
              source: { type: Type.STRING },
              publishedDate: { type: Type.STRING },
              summary: { type: Type.STRING },
            }
          }
        }
      },
    });

    if (response.text) {
        return JSON.parse(response.text) as NewsItem[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};