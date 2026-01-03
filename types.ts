export interface Source {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  riskLevel: 'SAFE' | 'WARNING' | 'HIGH_RISK' | 'UNKNOWN';
  summary: string;
  details: string;
  sources: Source[];
}

export interface CheckFormData {
  phoneNumber: string;
  bankAccount: string;
  bankName?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  image?: string; // Base64 string
}

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedDate: string;
  summary: string;
}