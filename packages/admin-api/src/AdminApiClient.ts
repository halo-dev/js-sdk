import { HaloRestAPIClient, HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from './url'
import { AccessToken, Environment, LoginPreCheck, Response } from './types'
import {
  ActuatorClient,
  AttachmentClient,
  BackupClient,
  CategoryClient,
  CommentClient,
  InstallationClient,
  JournalClient,
  JournalCommentClient,
  LinkClient,
  LogClient,
  MailClient,
  MenuClient,
  MigrationClient,
  OptionClient,
  PhotoClient,
  PostClient,
  PostCommentClient,
  SheetClient,
  SheetCommentClient,
  StaticStorageClient,
  StatisticClient,
  TagClient,
  ThemeClient,
  UserClient,
} from './clients'

export class AdminApiClient {
  private readonly client: HttpClient
  private readonly _attachment: AttachmentClient
  private readonly _backup: BackupClient
  private readonly _category: CategoryClient
  private readonly _installation: InstallationClient
  private readonly _journalComment: JournalCommentClient
  private readonly _journal: JournalClient
  private readonly _link: LinkClient
  private readonly _log: LogClient
  private readonly _mail: MailClient
  private readonly _menu: MenuClient
  private readonly _migration: MigrationClient
  private readonly _option: OptionClient
  private readonly _photo: PhotoClient
  private readonly _postComment: PostCommentClient
  private readonly _post: PostClient
  private readonly _sheetComment: SheetCommentClient
  private readonly _sheet: SheetClient
  private readonly _statistic: StatisticClient
  private readonly _tag: TagClient
  private readonly _theme: ThemeClient
  private readonly _user: UserClient
  private readonly _staticStorage: StaticStorageClient
  private readonly _comment: CommentClient
  private readonly _actuator: ActuatorClient

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient()
    this._attachment = new AttachmentClient(this.client)
    this._backup = new BackupClient(this.client)
    this._category = new CategoryClient(this.client)
    this._installation = new InstallationClient(this.client)
    this._journalComment = new JournalCommentClient(this.client)
    this._journal = new JournalClient(this.client)
    this._link = new LinkClient(this.client)
    this._log = new LogClient(this.client)
    this._mail = new MailClient(this.client)
    this._menu = new MenuClient(this.client)
    this._migration = new MigrationClient(this.client)
    this._option = new OptionClient(this.client)
    this._photo = new PhotoClient(this.client)
    this._postComment = new PostCommentClient(this.client)
    this._post = new PostClient(this.client)
    this._sheetComment = new SheetCommentClient(this.client)
    this._sheet = new SheetClient(this.client)
    this._statistic = new StatisticClient(this.client)
    this._tag = new TagClient(this.client)
    this._theme = new ThemeClient(this.client)
    this._user = new UserClient(this.client)
    this._staticStorage = new StaticStorageClient(this.client)
    this._comment = new CommentClient(this.client)
    this._actuator = new ActuatorClient(this.client)
  }

  public get attachment() {
    return this._attachment
  }

  public get backup() {
    return this._backup
  }

  public get category() {
    return this._category
  }

  public get installation() {
    return this._installation
  }

  public get journalComment() {
    return this._journalComment
  }

  public get journal() {
    return this._journal
  }

  public get link() {
    return this._link
  }

  public get log() {
    return this._log
  }

  public get mail() {
    return this._mail
  }

  public get menu() {
    return this._menu
  }

  public get migration() {
    return this._migration
  }

  public get option() {
    return this._option
  }

  public get photo() {
    return this._photo
  }

  public get postComment() {
    return this._postComment
  }

  public get post() {
    return this._post
  }

  public get sheetComment() {
    return this._sheetComment
  }

  public get sheet() {
    return this._sheet
  }

  public get statistic() {
    return this._statistic
  }

  public get tag() {
    return this._tag
  }

  public get theme() {
    return this._theme
  }

  public get user() {
    return this._user
  }

  public get staticStorage() {
    return this._staticStorage
  }

  public get comment() {
    return this._comment
  }

  public get actuator() {
    return this._actuator
  }

  public getEnvironment(): Promise<Response<Environment>> {
    const path = buildPath({
      endpointName: 'environments',
    })
    return this.client.get(path, {})
  }

  public getLogFile(lines: number): Promise<Response<string>> {
    const path = buildPath({
      endpointName: 'halo/logfile',
    })
    return this.client.get(path, { lines })
  }

  public isInstalled(): Promise<Response<boolean>> {
    const path = buildPath({
      endpointName: 'is_installed',
    })
    return this.client.get(path, {})
  }

  public logout(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'logout',
    })
    return this.client.post(path, {})
  }

  public sendResetPasswordCode(params: {
    username: string
    email: string
    code?: string
    password?: string
  }): Promise<object> {
    const path = buildPath({
      endpointName: 'password/code',
    })
    return this.client.post(path, params)
  }

  public resetPassword(params: { username: string; email: string; code?: string; password?: string }): Promise<object> {
    const path = buildPath({
      endpointName: 'password/reset',
    })
    return this.client.put(path, params)
  }

  public refreshToken(refreshToken: string): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: `refresh/${refreshToken}`,
    })
    return this.client.post(path, {})
  }

  public needMFACode(params: { username: string; password: string }): Promise<Response<LoginPreCheck>> {
    const path = buildPath({
      endpointName: 'login/precheck',
    })
    return this.client.post(path, { ...params })
  }

  public login(params: { username: string; password: string; authcode: boolean }): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: 'login',
    })
    return this.client.post(path, { ...params })
  }
}
