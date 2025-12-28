
export enum CompressionStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  COMPRESSING = 'COMPRESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface PDFFile {
  name: string;
  size: number;
  compressedSize?: number;
  blob: Blob;
  compressedBlob?: Blob;
}
