export type Response<T = any> = {
  status: number | string
  message?: string
  devMessage?: any
  data: T
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

export interface PageQuery {
  page?: number
  size?: number
  sort?: Array<string>
}

export type PostStatus = 'PUBLISHED' | 'DRAFT' | 'RECYCLE' | 'INTIMATE'

export type PostEditorType = 'MARKDOWN' | 'RICHTEXT'

export type BasePostMinimal = {
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
}

export type Tag = {
  id: number
  name: string
  slug: string
  color: string
  thumbnail: string
  createTime: number
  fullPath: string
}

export type Category = {
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

export interface PostList extends BasePostSimple {
  commentCount: number
  tags: Array<Tag>
  categories: Category
  metas: Record<string, any>
}

export type ArchiveYear = {
  year: number
  posts: Array<PostList>
}

export interface ArchiveMonth extends ArchiveYear {
  month: number
}

export interface CategoryQuery extends PageQuery {
  slug: string
  password?: string
}

export type JournalType = 'PUBLIC' | 'INTIMATE'

export type Journal = {
  id: number
  sourceContent: string
  content: string
  likes: number
  createTime: number
  type: JournalType
}

export interface JournalWithCmtCount extends Journal {
  commentCount: number
}

export type CommentStatus = 'PUBLISHED' | 'AUDITING' | 'RECYCLE'

export type BaseComment = {
  id: number
  author: string
  email: string
  ipAddress: string
  authorUrl: string
  gravatarMd5: string
  content: string
  status: CommentStatus
  userAgent: string
  parentId: string
  isAdmin: boolean
  allowNotification: boolean
  createTime: number
}

export interface BaseCommentTree extends BaseComment {
  children: Array<BaseCommentTree>
}

export interface BaseCommentWithParent extends BaseComment {
  parent: BaseCommentWithParent
}

export interface CommentWithHasChildren extends BaseComment {
  hasChildren: boolean
}

export type BaseCommentParam = {
  author: string
  email: string
  authorUrl?: string
  content: string
  postId?: number
  parentId?: number
  allowNotification?: boolean
}

export type Link = {
  id: number
  name: string
  url: string
  logo: string
  description: string
  team: string
  priority: number
}

export type LinkTeam = {
  team: string
  links: Array<Link>
}

export type Menu = {
  id: number
  name: string
  url: string
  priority: number
  target: string
  icon: string
  parentId: number
  team: string
}

export interface MenuTree extends Menu {
  children: Array<MenuTree>
}

export type Option = {
  key: string
  value: any
}

export type Photo = {
  id: number
  name: string
  thumbnail: string
  takeTime: number
  url: string
  team: string
  location: string
  description: string
}

export interface PhotoQuery extends PageQuery {
  keyword: string
  team: string
}

export interface BaseCommentQuery {
  page?: number
  sort?: Array<string>
}

export interface SheetList extends BasePostSimple {
  commentCount: number
}

export type BaseMeta = {
  id: number
  postId: number
  key: string
  value: string
  createTime: number
}

export interface BasePostDetail extends BasePostSimple {
  originalContent: string
  formatContent: string
  commentCount: number
}

export interface PostDetail extends BasePostDetail {
  tagIds: Array<number>
  tags: Array<Tag>
  categoryIds: Array<number>
  categories: Array<Category>
  metaIds: Array<number>
  metas: Array<BaseMeta>
}

export interface SheetDetail extends BasePostDetail {
  metaIds: Array<number>
  metas: Array<BaseMeta>
}

export type ContentQuery = {
  formatDisabled?: boolean
  sourceDisabled?: boolean
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
export type MFAType = 'NONE' | 'TFA_TOTP'

export type User = {
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

export interface StatisticWithUser extends Statistic {
  user: User
}

export type UpdateStrategy = 'BRANCH' | 'RELEASE'

export type Author = {
  name: string
  website: string
  avatar: string
}

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
  isActivated: boolean
  screenshots: string
  postMetaField: Array<string>
  sheetMetaField: Array<string>
}
