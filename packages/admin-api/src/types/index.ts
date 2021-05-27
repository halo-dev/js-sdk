export type Response<T = any> = {
  status: number | string;
  message?: string;
  devMessage?: any;
  data: T;
};

export interface PageQuery {
  keyword?: string;
  page?: number,
  size?: number,
  sort?: Array<string>
}

export interface Page<T> extends Response<T> {
  hasContent: boolean;
  hasNext: boolean,
  hasPrevious: boolean,
  isEmpty: boolean,
  isFirst: boolean,
  page: number,
  pages: number,
  rpp: number,
  total: number
}

export type Environment = {
  database: string;
  mode: ModeType;
  startTime: number;
  version: string;
};
type ModeType = "PRODUCTION" | "DEVELOPMENT" | "DEMO" | "TEST";

export type AccessToken = {
  access_token: string,
  expired_in: number,
  refresh_token: string
}

export interface AttachmentQuery extends PageQuery {
  attachmentType?: string;
  mediaType?: string;
}

export interface Attachment {
  id: number;
  createTime: string;
  fileKey: string;
  mediaType: string;
  name: string;
  path: string;
  size: number;
  suffix: string;
  thumbPath: string;
  type: string;
  width: number
  height: number;
}

export type Backup = {
  downloadLink: string;
  fileSize: number;
  filename: string;
  updateTime: number
}

export enum PostStatus {
  PUBLISHED = 0,
  DRAFT = 1,
  RECYCLE = 2,
  INTIMATE = 3,
}

export enum PostEditorType {
  MARKDOWN = 0,
  RICHTEXT = 1
}

export interface BasePostMinimal {
  id: number;
  title: string;
  status: PostStatus;
  slug: string;
  editorType: PostEditorType;
  updateTime: number;
  createTime: number;
  editTime: number;
  metaKeywords: string;
  metaDescription: string;
  fullPath: string;
}

export interface BasePostSimple extends BasePostMinimal {
  summary: string;
  thumbnail: string;
  visits: number;
  disallowComment: boolean;
  password: string;
  template: string;
  topPriority: number;
  likes: number;
  wordCount: number;
  isTopped: boolean;
}

export interface BasePostDetail extends BasePostSimple {
  originalContent: string;
  formatContent: string;
  commentCount: string;
}