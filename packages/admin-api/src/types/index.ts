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

export interface Page<T> extends Response<Page<T>> {
  hasContent: boolean;
  hasNext: boolean,
  hasPrevious: boolean,
  isEmpty: boolean,
  isFirst: boolean,
  page: number,
  pages: number,
  rpp: number,
  total: number,
  content: T
}

export interface UserParam {
  username: string
  nickname: string,
  email: string,
  password: string,
  avatar: string,
  description: string,
}

export interface InstallParam extends UserParam {
  locale: string,
  title: string,
  url: string,
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

export type PostStatus =
  | "PUBLISHED"
  | "DRAFT"
  | "RECYCLE"
  | "INTIMATE";

export type PostEditorType =
  | "MARKDOWN"
  | "RICHTEXT";

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

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  parentId: number;
  password: string;
  createTime: number;
  fullPath: string;
}

export interface CategoryTree extends Category {
  children: Array<Category>
}

export type CategoryParam = {
  name: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  password?: string;
  parentId?: number
}

export type CommentStatus =
  | "PUBLISHED"
  | "AUDITING"
  | "RECYCLE";

export interface BaseComment {
  id?: number;
  author: string;
  email: string;
  ipAddress: string;
  authorUrl: string;
  gravatarMd5: string;
  content: string;
  status: CommentStatus;
  userAgent: string;
  parentId: number;
  isAdmin: boolean;
  allowNotification: boolean;
  createTime: number;
  children?: BaseComment;
}

export type JournalType =
  | "PUBLIC"
  | "INTIMATE";

export interface JournalCommentParam extends PageQuery {
  status?: CommentStatus
}

export type Journal = {
  id?: number;
  sourceContent: string;
  content: string;
  likes: number;
  createTime: number;
  type: JournalType;
}

export interface JournalCommentWithJournal extends BaseComment {
  journal: Journal
}

export interface JournalQuery extends PageQuery {
  type: JournalType
}

export interface JournalWithCmtCount extends Journal {
  commentCount: number;
}

export type Link = {
  id?: number;
  name: string;
  logo?: string;
  priority?: number;
  team?: string;
  url?: string;
  description?: string;
}

export type LogType =
  | "BLOG_INITIALIZED"
  | "POST_PUBLISHED"
  | "POST_EDITED"
  | "POST_DELETED"
  | "LOGGED_IN"
  | "LOGGED_OUT"
  | "LOGIN_FAILED"
  | "PASSWORD_UPDATED"
  | "PROFILE_UPDATED"
  | "SHEET_PUBLISHED"
  | "SHEET_EDITED"
  | "SHEET_DELETED"
  | "MFA_UPDATED"
  | "LOGGED_PRE_CHECK";

export type Log = {
  id: number;
  logKey: string;
  type: LogType
  content: string;
  ipAddress: string;
  createTime: number;
}

export type Menu = {
  id?: number;
  name: string;
  url: string;
  priority?: number;
  target?: string;
  icon?: string;
  parentId?: number;
  team?: string;
  children?: Array<Menu>
}

export type OptionType =
  | "INTERNAL"
  | "CUSTOM";

export type Option = {
  id?: number;
  key: string;
  value?: any;
  type?: OptionType;
}

export interface OptionQuery extends PageQuery {
  type?: OptionType;
}