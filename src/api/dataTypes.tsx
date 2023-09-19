/*add your dataTypes here*/

export interface FileEntity {
  fileId: number;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  latestDateModified: string;
  isdeleted: boolean;
  data: Uint8Array;
  // thumbnailUrl: string;
}

export interface ResponseFile {
  fileId: number;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  latestDateModified: string;
  isdeleted: boolean;
  fileDownloadUri: string;
  // thumbnailUrl: string;
}
