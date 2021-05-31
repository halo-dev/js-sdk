import { HaloRestAPIClient, HttpClient, FormData } from "../../rest-api-client";
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
  JournalCommentParam,
  JournalCommentWithJournal,
  CommentStatus,
  Journal,
  JournalType,
  JournalQuery,
  JournalWithCmtCount,
  Link,
  Log,
  Menu
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
    email: string,
    code?: string,
    password?: string,
  }): void {
    const path = buildPath({
      endpointName: "password/code",
    });
    this.client.post(path, params);
  }

  public resetPassword(params: {
    username: string
    email: string,
    code?: string,
    password?: string,
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
    sort: Array<string>;
    more: boolean;
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

  public async listJournalComments(params: JournalCommentParam): Promise<Page<JournalCommentWithJournal>> {
    const path = buildPath({
      endpointName: "journals/comments"
    });
    return this.client.get(path, { ...params })
  }

  public createJournalComment(params: BaseComment): Promise<Response<BaseComment>> {
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
    journalId: number,
    sort?: Array<string>,
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listJournalCommentAsTree(params: {
    journalId: number,
    sort?: Array<string>,
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latestJournalComment(params: {
    top?: number,
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
    journalId: number,
    sourceContent: string,
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
    page: number,
    size: number,
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
    content: string,
    subject: string,
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

}
