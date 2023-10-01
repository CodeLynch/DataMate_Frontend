/*add your dataTypes here*/

export interface FileEntity {
  fileId: number;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  latestDateModified: string;
  isdeleted: boolean;
  data?: Uint8Array; // Make 'data' property optional
  userId: number;
}

export interface ResponseFile {
  fileId: number;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  latestDateModified: string;
  isdeleted: boolean;
  fileDownloadUri: string;
  userId: number;
  // thumbnailUrl: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  username: string;
  password: string;
  businessName: string;
  businessType: string;
}
