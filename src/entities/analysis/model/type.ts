export interface File {
  fileName: string;
  size: number;
  url: string;
}

export interface ILayersResponse {
  analysisId: string;
  files: File[];
}
