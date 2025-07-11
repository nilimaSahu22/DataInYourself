export interface Course {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  duration: string;
  description?: string;
  careerOutcomes?: string[];
  level?: string;
  badge?: string;
  rating?: number;
  pdfSrc?: string;
} 