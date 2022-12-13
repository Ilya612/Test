export interface QuizeProps {
  data: QuizeData[];
}
export interface QuizeData {
  title: string;
  options: string[];
  answer: string;
}
