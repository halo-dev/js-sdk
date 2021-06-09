// import { HaloRestAPIClient, HttpClient, FormData } from "../../rest-api-client";
import { HaloRestAPIClient, HttpClient, FormData } from "@guching/rest-api-client";
import { buildPath } from "./url";
import {
  InstallParam,
  Environment,
  Response,
  Page,
  AccessToken,
  AttachmentQuery,
  Attachment,
  Backup,
  BasePostDetail,
  Category,
  CategoryParam,
  CategoryTree,
  BaseComment,
  BaseCommentParam,
  JournalCommentQuery,
  JournalCommentWithJournal,
  CommentStatus,
  Journal,
  JournalType,
  JournalQuery,
  JournalWithCmtCount,
  Link,
  Log,
  Menu,
  Option,
  OptionQuery,
  Photo,
  PhotoQuery,
  PostCommentWithPost,
  CommentQuery,
  PostQuery,
  BasePostSimple,
  PostParam,
  Post,
  PostDetail,
  PostStatus,
  BasePostMinimal,
  SheetCommentWithSheet,
  BaseCommentWithParent
} from "./types";

export class AdminApiClient {
  private client: HttpClient;

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient();
  }

  public install(params: InstallParam) {
    const path = buildPath({
      endpointName: "installations",
    });
    return this.client.post(path, { ...params });
  }

  public getEnvironment(): Promise<Response<Environment>> {
    const path = buildPath({
      endpointName: "environments",
    });
    return this.client.get(path, {});
  }

  public getLogFile(lines: number): Promise<Response<String>> {
    const path = buildPath({
      endpointName: "halo/logfile",
    });
    return this.client.get(path, { lines });
  }

  public isInstalled(): Promise<Response<Boolean>> {
    const path = buildPath({
      endpointName: "is_installed",
    });
    return this.client.get(path, {});
  }

  public logout(): void {
    const path = buildPath({
      endpointName: "logout",
    });
    this.client.post(path, {});
  }

  public sendResetPasswordCode(params: {
    username: string
    email: string
    code?: string
    password?: string
  }): void {
    const path = buildPath({
      endpointName: "password/code",
    });
    this.client.post(path, params);
  }

  public resetPassword(params: {
    username: string
    email: string
    code?: string
    password?: string
  }): void {
    const path = buildPath({
      endpointName: "password/reset",
    });
    this.client.post(path, params);
  }

  public refreshToken(refreshToken: string): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: `refresh/${refreshToken}`,
    });
    return this.client.post(path, {});
  }

  public getAttachment(attachmentId: number): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.get(path, {})
  }

  public listAttachments(params: AttachmentQuery): Promise<Page<Attachment>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.get(path, { ...params })
  }

  public deleteAttachments(attachmentIds: Array<number>): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.delete(path, attachmentIds)
  }

  public deleteAttachmentById(attachmentId: number): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.delete(path, {})
  }

  public updateAttachmentById(attachmentId: number, name: string): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.put(path, { name })
  }

  public listAttachmentMediaTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/media_types"
    });
    return this.client.get(path, {})
  }

  public listAttachmentTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/types"
    });
    return this.client.get(path, {})
  }

  public uploadAttachment(data: unknown): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/upload"
    });
    const formData = new FormData()
    formData.append("file", data)
    return this.client.post(path, formData)
  }

  public uploadAttachments(data: Array<unknown>): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/uploads"
    });
    const formData = new FormData()
    data.forEach(fileStream => {
      formData.append("files", fileStream)
    })
    return this.client.post(path, formData)
  }

  public listBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.get(path, {})
  }

  public exportAllBackups(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.post(path, {})
  }

  public async deleteBackup(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    await this.client.delete(path, { filename })
  }

  public downloadBackup(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/data/${filename}`
    });
    return this.client.get(path, {})
  }

  public fetchBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data/fetch"
    });
    return this.client.get(path, { filename })
  }

  public listMarkdownBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.get(path, {})
  }

  public exportMarkdownBackup(needFrontMatter?: boolean): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.post(path, { needFrontMatter })
  }

  public async deleteMarkdownBackup(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    await this.client.delete(path, { filename })
  }

  public downloadMarkdownBackup(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/markdown/export/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchMarkdownBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/fetch"
    });
    return this.client.get(path, { filename })
  }

  public importMarkdown(data: unknown): Promise<Response<BasePostDetail>> {
    const path = buildPath({
      endpointName: "backups/markdown/import"
    });
    const formData = new FormData()
    formData.append("file", data)
    return this.client.post(path, formData)
  }

  public listBackupsFromWorkDir(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    return this.client.get(path, {})
  }

  public async deleteBackupsFromWorkDir(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    await this.client.delete(path, { filename })
  }

  public downloadBackupsFromWorkDir(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/work-dir/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchBackupsFromWorkDir(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir/fetch"
    });
    return this.client.get(path, { filename })
  }

  public listCategories(params: {
    sort: Array<string>
    more: boolean
  }): Promise<Response<Array<Category>>> {
    const path = buildPath({
      endpointName: "categories"
    });
    return this.client.get(path, { ...params })
  }

  public createCategory(params: CategoryParam): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: "categories"
    });
    return this.client.post(path, { ...params })
  }

  public getCategory(categoryId: number): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    return this.client.get(path, {})
  }

  public updateCategory(categoryId: number, params: CategoryParam): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteCategory(categoryId: number): Promise<void> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    await this.client.delete(path, {})
  }

  public listCategoryAsTree(sort: Array<string>): Promise<Response<Array<CategoryTree>>> {
    const path = buildPath({
      endpointName: "categories/tree_view"
    });
    return this.client.get(path, { sort })
  }

  public async listJournalComments(params: JournalCommentQuery): Promise<Page<JournalCommentWithJournal>> {
    const path = buildPath({
      endpointName: "journals/comments"
    });
    return this.client.get(path, { ...params })
  }

  public createJournalComment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "journals/comments"
    });
    return this.client.post(path, { ...params })
  }

  public deleteJournalComment(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}`
    });
    return this.client.delete(path, {})
  }

  public updateJournalComment(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public listJournalCommentAsView(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listJournalCommentAsTree(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latestJournalComment(params: {
    top?: number
    status?: CommentStatus
  }): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "journals/comments/latest"
    });
    return this.client.get(path, { ...params })
  }

  public listJournals(params: JournalQuery): Promise<Page<JournalWithCmtCount>> {
    const path = buildPath({
      endpointName: "journals"
    });
    return this.client.get(path, { ...params })
  }

  public createJournal(params: Journal): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: "journals"
    });
    return this.client.post(path, { ...params })
  }

  public updateJournal(params: {
    journalId: number
    sourceContent: string
    type?: JournalType
  }): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: `journals/${params.journalId}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteJournal(journalId: number): Promise<void> {
    const path = buildPath({
      endpointName: `journals/${journalId}`
    });
    await this.client.delete(path, {})
  }

  public latestJournal(top: number): Promise<Response<Array<Journal>>> {
    const path = buildPath({
      endpointName: "journals/latest"
    });
    return this.client.get(path, { top })
  }

  public listLinks(sort?: Array<string>): Promise<Response<Array<Link>>> {
    const path = buildPath({
      endpointName: "links"
    });
    return this.client.get(path, { sort })
  }

  public createLink(params: Link): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: "links"
    });
    return this.client.post(path, { ...params })
  }

  public getLink(id: number): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: `links/${id}`
    });
    return this.client.get(path, {})
  }

  public updateLink(params: Link): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: `links/${params.id}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteLink(id: number): Promise<void> {
    const path = buildPath({
      endpointName: `links/${id}`
    });
    await this.client.delete(path, {})
  }

  public listLinkTeams(): Promise<Array<string>> {
    const path = buildPath({
      endpointName: "links/teams"
    });
    return this.client.get(path, {})
  }

  public listLogs(params: {
    page: number
    size: number
    sort: Array<string>
  }): Promise<Page<Log>> {
    const path = buildPath({
      endpointName: "logs"
    });
    return this.client.get(path, { ...params })
  }

  public async clearLogs(): Promise<void> {
    const path = buildPath({
      endpointName: "logs/clear"
    });
    await this.client.get(path, {})
  }

  public latestLogs(top: number): Promise<Array<Log>> {
    const path = buildPath({
      endpointName: "logs/latest"
    });
    return this.client.get(path, { top })
  }

  public testSmtpService(params: {
    content: string
    subject: string
    to: string
  }): Promise<Response<string>> {
    const path = buildPath({
      endpointName: "mails/test"
    });
    return this.client.post(path, { ...params })
  }

  public testConnectToEmailServer(): Promise<Response<string>> {
    const path = buildPath({
      endpointName: "mails/test/connection"
    });
    return this.client.post(path, {})
  }

  public listAllMenus(): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus"
    });
    return this.client.get(path, {})
  }

  public createMenu(params: Menu): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: "menus"
    });
    return this.client.post(path, { ...params })
  }

  public createMenus(params: Array<Menu>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    return this.client.post(path, [...params])
  }

  public getMenu(menuId: number): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: `menus/${menuId}`
    });
    return this.client.post(path, {})
  }

  public updateMenu(params: Menu): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: `menus/${params.id}`
    });
    return this.client.put(path, { ...params })
  }

  public updateMenus(params: Array<Menu>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    return this.client.put(path, [...params])
  }

  public async deleteMenu(menuId: number): Promise<void> {
    const path = buildPath({
      endpointName: `menus/${menuId}`
    });
    await this.client.delete(path, {})
  }

  public async deleteMenus(menuIds: Array<number>): Promise<void> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    await this.client.delete(path, [...menuIds])
  }

  public listMenusTreeViewByTeam(team: string, sort?: Array<string>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/team/tree_view"
    });
    return this.client.get(path, { team, sort })
  }

  public listMenuTeams(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "menus/teams"
    });
    return this.client.get(path, {})
  }

  public listMenusTreeView(sort?: Array<string>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/tree_view"
    });
    return this.client.get(path, { sort })
  }

  public async migrate(data: unknown): Promise<void> {
    const path = buildPath({
      endpointName: "migrations/halo"
    });
    const formData = new FormData()
    formData.append("file", data)
    await this.client.post(path, formData)
  }

  public listOptions(): Promise<Response<Array<Option>>> {
    const path = buildPath({
      endpointName: "options"
    });
    return this.client.get(path, {})
  }

  public createOption(params: Option): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: "options"
    });
    return this.client.post(path, { ...params })
  }

  public getOption(id: number): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: `options/${id}`
    });
    return this.client.get(path, {})
  }

  public updateOption(params: Option): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: `options/${params.id}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteOption(params: Option): Promise<void> {
    const path = buildPath({
      endpointName: `options/${params.id}`
    });
    await this.client.delete(path, {})
  }

  public listOptionsListView(params: OptionQuery): Promise<Response<Array<Option>>> {
    const path = buildPath({
      endpointName: "options/list_view"
    });
    return this.client.get(path, { ...params })
  }

  public listOptionsMapView(): Promise<Response<Map<string, any>>> {
    const path = buildPath({
      endpointName: "options/map_view"
    });
    return this.client.get(path, {})
  }

  public listOptionsMapViewByKeys(params: Array<string>): Promise<Response<Map<string, any>>> {
    const path = buildPath({
      endpointName: "options/map_view/keys"
    });
    return this.client.get(path, { ...params })
  }

  public async saveOptionsMapView(params: any): Promise<void> {
    const path = buildPath({
      endpointName: "options/map_view/saving"
    });
    await this.client.post(path, { ...params })
  }

  public async saveOptions(params: Array<Option>): Promise<void> {
    const path = buildPath({
      endpointName: "options/saving"
    });
    await this.client.post(path, [...params])
  }

  public listPhotos(params: PhotoQuery): Promise<Page<Photo>> {
    const path = buildPath({
      endpointName: "photos"
    });
    return this.client.get(path, { ...params })
  }

  public createPhoto(params: Photo): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: "photos"
    });
    return this.client.post(path, { ...params })
  }

  public getPhoto(photoId: number): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: `photos/${photoId}`
    });
    return this.client.get(path, {})
  }

  public updatePhoto(params: Photo): Promise<Response<Photo>> {
    const path = buildPath({
      endpointName: `photos/${params.id}`
    });
    return this.client.put(path, { ...params })
  }

  public async deletePhoto(photoId: number): Promise<void> {
    const path = buildPath({
      endpointName: `photos/${photoId}`
    });
    await this.client.delete(path, {})
  }

  public latestPhotos(sort?: Array<string>): Promise<Response<Array<Photo>>> {
    const path = buildPath({
      endpointName: "photos/latest"
    });
    return this.client.get(path, { sort })
  }

  public listPhotoTeams(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "photos/teams"
    });
    return this.client.get(path, {})
  }

  public listPostComments(params: CommentQuery): Promise<Page<PostCommentWithPost>> {
    const path = buildPath({
      endpointName: "posts/comments"
    });
    return this.client.get(path, { ...params })
  }

  public listPostCommentsWithListView(params: {
    postId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${params.postId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listPostCommentsWithTreeView(params: {
    postId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${params.postId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latestPostComments(params: {
    top?: number
    status?: CommentStatus
  }): Promise<Response<Array<PostCommentWithPost>>> {
    const path = buildPath({
      endpointName: "posts/comments/latest"
    });
    return this.client.get(path, { ...params })
  }

  public createPostComment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "posts/comments"
    });
    return this.client.post(path, { ...params })
  }

  public updatePostComment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${params.id}`
    });
    return this.client.get(path, { ...params })
  }

  public updatePostCommentStatus(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${commentId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public updatePostCommentsStatus(commentIds: Array<number>,
    status: CommentStatus): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `posts/comments/status/${status}`
    });
    return this.client.put(path, commentIds)
  }

  public deletePostComment(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${commentId}`
    });
    return this.client.delete(path, {})
  }

  public deletePostComments(postCommentIds: Array<number>): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "posts/comments"
    });
    return this.client.delete(path, postCommentIds)
  }

  public listPosts(params: PostQuery): Promise<Page<BasePostSimple>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.get(path, { ...params })
  }

  public getPost(postId: number): Promise<Page<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}`
    });
    return this.client.get(path, {})
  }

  public getPostPreviewLink(postId: number): Promise<Response<string>> {
    const path = buildPath({
      endpointName: `posts/${postId}/preview`
    });
    return this.client.get(path, {})
  }

  public latestPosts(top?: number): Promise<Response<Array<BasePostMinimal>>> {
    const path = buildPath({
      endpointName: "posts/latest"
    });
    return this.client.get(path, { top })
  }

  public listPostsByStatus(status: PostStatus, query?: PostQuery): Promise<Page<BasePostSimple>> {
    const path = buildPath({
      endpointName: `posts/status/${status}`
    });
    return this.client.get(path, { ...query })
  }

  public createPost(params: PostParam): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.post(path, { ...params })
  }

  public updatePost(params: {
    postId: number
    autoSave?: boolean
    post: PostParam
  }): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${params.postId}`
    });
    return this.client.put(path, { ...params })
  }

  public updatePostStatus(postId: number, status: PostStatus): Promise<Response<BasePostMinimal>> {
    const path = buildPath({
      endpointName: `posts/${postId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public updatePostsStatus(postIds: Array<number>, status: PostStatus): Promise<Response<Array<Post>>> {
    const path = buildPath({
      endpointName: `posts/status/${status}`
    });
    return this.client.put(path, postIds)
  }

  public updatePostDraft(postId: number, content?: string): Promise<Response<BasePostMinimal>> {
    const path = buildPath({
      endpointName: `posts/${postId}/status/draft/content`
    });
    return this.client.put(path, { content })
  }


  public async likePost(postId: number): Promise<void> {
    const path = buildPath({
      endpointName: `posts/${postId}/likes`
    });
    await this.client.put(path, {})
  }

  public deletePost(postId: number): Promise<Response<Post>> {
    const path = buildPath({
      endpointName: `posts/${postId}`
    });
    return this.client.delete(path, {})
  }

  public deletePosts(postIds: Array<number>): Promise<Response<Array<Post>>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.delete(path, postIds)
  }

  public listSheetComments(params: CommentQuery): Promise<Page<SheetCommentWithSheet>> {
    const path = buildPath({
      endpointName: "sheets/comments"
    });
    return this.client.get(path, { ...params })
  }

  public getSheetComment(commentId: number): Promise<Response<SheetCommentWithSheet>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`
    });
    return this.client.get(path, {})
  }

  public listSheetCommentWithListView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseCommentWithParent>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listSheetCommentWithTreeView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latestSheetComments(params: {
    top?: number
    status?: CommentStatus
  }): Promise<Response<Array<SheetCommentWithSheet>>> {
    const path = buildPath({
      endpointName: "sheets/comments/latest"
    });
    return this.client.get(path, { ...params })
  }

  public createSheetComment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "sheets/comments"
    });
    return this.client.post(path, { ...params })
  }

  public updateSheetComment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.id}`
    });
    return this.client.put(path, { ...params })
  }

  public updateSheetCommentStatus(params: {
    commentId: number
    status: CommentStatus
  }): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `​sheets​/comments​/${params.commentId}​/status​/${params.status}`
    });
    return this.client.put(path, {})
  }

  public updateSheetCommentsStatus(commentIds: Array<number>,
    status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `​sheets​/comments​​/status​/${status}`
    });
    return this.client.put(path, commentIds)
  }

  public deleteSheetComments(commentIds: Array<number>): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "sheets​/comments​​"
    });
    return this.client.delete(path, commentIds)
  }

  public deleteSheetComment(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets​/comments​​/${commentId}`
    });
    return this.client.delete(path, {})
  }
}
