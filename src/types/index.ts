export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  platform: 'telegram' | 'youtube' | 'github' | 'local';
  url: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  folderId?: string;
  shared?: boolean;
  shareLink?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformConnection {
  id: string;
  platform: 'telegram' | 'youtube' | 'github';
  connected: boolean;
  username?: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'basic' | 'pro' | 'business';
  storageUsed: number;
  storageLimit: number;
}

export interface ShareLink {
  id: string;
  fileId: string;
  token: string;
  expiresAt?: Date;
  password?: string;
  downloads: number;
  maxDownloads?: number;
}
