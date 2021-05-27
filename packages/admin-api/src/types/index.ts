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