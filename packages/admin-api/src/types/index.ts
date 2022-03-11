// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CancelToken } from 'axios'

export type UploadOptions = {
  timeout?: number
  cancelToken?: CancelToken
  onUploadProgress?: (e: ProgressEvent) => void
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
}

export type Response<T = any> = {
  status: number | string
  message?: string
  devMessage?: any
  data: T
}

export interface PageQuery {
  keyword?: string
  page?: number
  size?: number
  sort?: Array<string>
}

export interface Page<T = any> {
  hasContent: boolean
  hasNext: boolean
  hasPrevious: boolean
  isEmpty: boolean
  isFirst: boolean
  page: number
  pages: number
  rpp: number
  total: number
  content: Array<T>
}

export type MFAType = 'NONE' | 'TFA_TOTP'

export interface UserParam {
  username: string
  nickname: string
  email: string
  password: string
  avatar: string
  description: string
}

export interface User {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  description: string
  mfaType: MFAType
  createTime: number
  updateTime: number
}

export interface InstallParam extends UserParam {
  locale: string
  title: string
  url: string
}

export type LoginPreCheck = {
  needMFACode: boolean
}

export type Environment = {
  database: string
  mode: ModeType
  startTime: number
  version: string
}
type ModeType = 'PRODUCTION' | 'DEVELOPMENT' | 'DEMO' | 'TEST'

export type AccessToken = {
  access_token: string
  expired_in: number
  refresh_token: string
}

export interface AttachmentQuery extends PageQuery {
  attachmentType?: string
  mediaType?: string
}

export interface Attachment {
  id: number
  createTime: string
  fileKey: string
  mediaType: string
  name: string
  path: string
  size: number
  suffix: string
  thumbPath: string
  type: string
  width: number
  height: number
}

export type Backup = {
  downloadLink: string
  fileSize: number
  filename: string
  updateTime: number
}

export type PostStatus = 'PUBLISHED' | 'DRAFT' | 'RECYCLE' | 'INTIMATE'

export type PostEditorType = 'MARKDOWN' | 'RICHTEXT'

export interface BasePostMinimal {
  id: number
  title: string
  status: PostStatus
  slug: string
  editorType: PostEditorType
  updateTime: number
  createTime: number
  editTime: number
  metaKeywords: string
  metaDescription: string
  fullPath: string
}

export interface BasePostSimple extends BasePostMinimal {
  summary: string
  thumbnail: string
  visits: number
  disallowComment: boolean
  password: string
  template: string
  topPriority: number
  likes: number
  wordCount: number
  isTopped: boolean
  inProcess: boolean
}

export interface BasePostDetail extends BasePostSimple {
  originalContent: string
  formatContent: string
  commentCount: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  thumbnail: string
  parentId: number
  password: string
  createTime: number
  fullPath: string
}

export interface CategoryTree extends Category {
  children: Array<Category>
}

export type CategoryParam = {
  name: string
  slug?: string
  description?: string
  thumbnail?: string
  password?: string
  parentId?: number
}

export type CommentStatus = 'PUBLISHED' | 'AUDITING' | 'RECYCLE'

export type BaseCommentParam = {
  id?: number
  author: string
  email: string
  authorUrl?: string
  content: string
  postId?: number
  parentId?: number
  allowNotification?: boolean
}

export interface BaseComment {
  id: number
  author: string
  email: string
  ipAddress: string
  authorUrl: string
  gravatarMd5: string
  content: string
  status: CommentStatus
  userAgent: string
  parentId: number
  isAdmin: boolean
  allowNotification: boolean
  createTime: number
  children?: BaseComment
}

export interface BaseCommentWithParent extends BaseComment {
  parent: BaseCommentWithParent
}

export type JournalType = 'PUBLIC' | 'INTIMATE'

export interface JournalCommentQuery extends PageQuery {
  status?: CommentStatus
}

export type Journal = {
  id?: number
  sourceContent: string
  content: string
  likes: number
  createTime: number
  type: JournalType
}

export type JournalParam = {
  sourceContent: string
  content: string
  type: JournalType
  keepRaw?: boolean
}

export interface JournalCommentWithJournal extends BaseComment {
  journal: Journal
}

export interface JournalQuery extends PageQuery {
  type?: JournalType
}

export interface JournalWithCmtCount extends Journal {
  commentCount: number
}

export type Link = {
  id?: number
  name: string
  logo?: string
  priority?: number
  team?: string
  url?: string
  description?: string
}

export type LogType =
  | 'BLOG_INITIALIZED'
  | 'POST_PUBLISHED'
  | 'POST_EDITED'
  | 'POST_DELETED'
  | 'LOGGED_IN'
  | 'LOGGED_OUT'
  | 'LOGIN_FAILED'
  | 'PASSWORD_UPDATED'
  | 'PROFILE_UPDATED'
  | 'SHEET_PUBLISHED'
  | 'SHEET_EDITED'
  | 'SHEET_DELETED'
  | 'MFA_UPDATED'
  | 'LOGGED_PRE_CHECK'

export type Log = {
  id: number
  logKey: string
  type: LogType
  content: string
  ipAddress: string
  createTime: number
}

export type Menu = {
  id?: number
  name: string
  url: string
  priority?: number
  target?: string
  icon?: string
  parentId?: number
  team?: string
  children?: Array<Menu>
}

export type OptionType = 'INTERNAL' | 'CUSTOM'

export type Option = {
  id?: number
  key: string
  value?: any
  type?: OptionType
}

export interface OptionQuery extends PageQuery {
  type?: OptionType
}

export type Photo = {
  id?: number
  name: string
  thumbnail: string
  takeTime?: number
  url: string
  team?: string
  location?: string
  description?: string
}

export interface PhotoQuery extends PageQuery {
  team?: string
}

export interface PostCommentWithPost extends BaseComment {
  post: BasePostMinimal
}

export interface CommentQuery extends PageQuery {
  status?: CommentQuery
}

export interface PostQuery extends PageQuery {
  categoryId?: number
  status?: PostStatus
  more?: boolean
}

export type BaseMetaParam = {
  postId: number
  key: string
  value: string
}

export type BaseMeta = {
  id: number
  postId: number
  key: string
  value: string
  createTime: number
}

export type PostMetaParam = BaseMetaParam

export type Tag = {
  id: number
  name: string
  slug: string
  color: string
  thumbnail: string
  createTime: string
  fullPath: string
}

export type PostParam = {
  title: string
  status?: PostStatus
  slug?: string
  editorType?: PostEditorType
  originalContent?: string
  summary?: string
  thumbnail?: string
  disallowComment?: boolean
  password?: string
  template?: string
  topPriority?: number
  createTime?: number
  metaKeywords?: string
  metaDescription?: string
  tagIds?: Array<number>
  categoryIds?: Array<number>
  metas?: Array<PostMetaParam>
  keepRaw?: boolean
}

export interface BasePostDetail extends BasePostSimple {
  originalContent: string
  formatContent: string
  commentCount: string
}

export type Post = {
  id: number
  title: string
  status: PostStatus
  url: string
  slug: string
  editorType: PostEditorType
  originalContent: string
  formatContent: string
  summary: string
  thumbnail: string
  visits: number
  disallowComment: boolean
  password: string
  template: string
  topPriority: number
  likes: number
  editTime: number
  metaKeywords: string
  metaDescription: string
  wordCount: number
}

export interface PostDetail extends BasePostDetail {
  tagIds: Array<number>
  tags: Array<Tag>
  categoryIds: Array<number>
  categories: Array<Category>
  metaIds: Array<number>
  metas: Array<BaseMeta>
}

export interface SheetCommentWithSheet extends BaseComment {
  sheet: BasePostMinimal
}

export interface Sheet extends BasePostSimple {
  commentCount: number
}

export interface SheetDetail extends BasePostDetail {
  metaIds: Array<number>
  metas: Array<BaseMeta>
}

export type IndependentSheet = {
  id: number
  title: string
  fullPath: string
  routeName: string
  available: boolean
}

export type SheetParam = {
  title: string
  status?: PostStatus
  slug?: string
  editorType?: PostEditorType
  originalContent?: string
  summary?: string
  thumbnail?: string
  disallowComment?: boolean
  password?: string
  template?: string
  topPriority?: number
  createTime?: number
  metaKeywords?: string
  metaDescription?: string
  metas?: Array<BaseMetaParam>
}

export type Statistic = {
  postCount: number
  commentCount: number
  categoryCount: number
  attachmentCount: number
  tagCount: number
  journalCount: number
  birthday: number
  establishDays: number
  linkCount: number
  visitCount: number
  likeCount: number
}

export interface StatisticWithUser extends Statistic {
  user: User
}

export type TagParam = {
  name: string
  slug?: string
  color?: string
  thumbnail?: string
}
export type UpdateStrategy = 'BRANCH' | 'RELEASE'

export type Author = {
  name: string
  website: string
  avatar: string
}

export type InputType = 'TEXT' | 'NUMBER' | 'RADIO' | 'SELECT' | 'TEXTAREA' | 'COLOR' | 'ATTACHMENT' | 'SWITCH'

export type DataType = 'STRING' | 'LONG' | 'DOUBLE' | 'BOOL'

export type ThemeProperty = {
  id: string
  name: string
  website: string
  branch: string
  repo: string
  updateStrategy: UpdateStrategy
  description: string
  logo: string
  version: string
  require: string
  author: Author
  themePath: string
  folderName: string
  hasOptions: boolean
  activated: boolean
  screenshots: string
  postMetaField: Array<string>
  sheetMetaField: Array<string>
}

export type Item = {
  name: string
  label: string
  type: InputType
  dataType: DataType
  defaultValue: any
  placeholder: string
  description: string
  options: Array<Option>
}

export type Group = {
  name: string
  label: string
  items: Array<Item>
}

export type ThemeFile = {
  name: string
  path: string
  isFile: boolean
  editable: boolean
  node: Array<ThemeFile>
}

export type MultiFactorAuthParam = {
  mfaType: 'NONE' | 'TFA_TOTP'
  mfaKey: string
  authcode: string
}

export type MultiFactorAuth = {
  qrImage: string
  optAuthUrl: string
  mfaKey: string
  mfaType: string
}

export type StaticFile = {
  id: number
  name: string
  path: string
  relativePath: string
  isFile: boolean
  mimeType: string
  createTime: number
  children: Array<StaticFile>
}

export type StaticContentParam = {
  path: string
  content: string
}
