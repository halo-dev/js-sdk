import { HaloRestAPIClient, HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "./url";
import { Environment, Response, AccessToken, LoginPreCheck } from "./types";
import {
  AttachmentClient,
  BackupClient,
  CategoryClient,
  InstallationClient,
  JournalCommentClient,
  JournalClient,
  LinkClient,
  LogClient,
  MailClient,
  MenuClient,
  MigrationClient,
  OptionClient,
  PhotoClient,
  PostCommentClient,
  PostClient,
  SheetCommentClient,
  SheetClient,
  StatisticClient,
  TagClient,
  ThemeClient,
  UserClient,
} from "./clients";

export class AdminApiClient {
  private client: HttpClient;
  private _attachment: AttachmentClient;
  private _backup: BackupClient;
  private _category: CategoryClient;
  private _installation: InstallationClient;
  private _journalComment: JournalCommentClient;
  private _journal: JournalClient;
  private _link: LinkClient;
  private _log: LogClient;
  private _mail: MailClient;
  private _menu: MenuClient;
  private _migration: MigrationClient;
  private _option: OptionClient;
  private _photo: PhotoClient;
  private _postComment: PostCommentClient;
  private _post: PostClient;
  private _sheetComment: SheetCommentClient;
  private _sheet: SheetClient;
  private _statistic: StatisticClient;
  private _tag: TagClient;
  private _theme: ThemeClient;
  private _user: UserClient;

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient();
    this._attachment = new AttachmentClient(this.client);
    this._backup = new BackupClient(this.client);
    this._category = new CategoryClient(this.client);
    this._installation = new InstallationClient(this.client);
    this._journalComment = new JournalCommentClient(this.client);
    this._journal = new JournalClient(this.client);
    this._link = new LinkClient(this.client);
    this._log = new LogClient(this.client);
    this._mail = new MailClient(this.client);
    this._menu = new MenuClient(this.client);
    this._migration = new MigrationClient(this.client);
    this._option = new OptionClient(this.client);
    this._photo = new PhotoClient(this.client);
    this._postComment = new PostCommentClient(this.client);
    this._post = new PostClient(this.client);
    this._sheetComment = new SheetCommentClient(this.client);
    this._sheet = new SheetClient(this.client);
    this._statistic = new StatisticClient(this.client);
    this._tag = new TagClient(this.client);
    this._theme = new ThemeClient(this.client);
    this._user = new UserClient(this.client);
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
    username: string;
    email: string;
    code?: string;
    password?: string;
  }): void {
    const path = buildPath({
      endpointName: "password/code",
    });
    this.client.post(path, params);
  }

  public resetPassword(params: {
    username: string;
    email: string;
    code?: string;
    password?: string;
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

  public needMFACode(params: {
    username: string;
    password: string;
  }): Promise<Response<LoginPreCheck>> {
    const path = buildPath({
      endpointName: "login/precheck",
    });
    return this.client.post(path, { ...params });
  }

  public get attachment() {
    return this._attachment;
  }

  public get backup() {
    return this._backup;
  }

  public get category() {
    return this._category;
  }

  public get installation() {
    return this._installation;
  }

  public get journalComment() {
    return this._journalComment;
  }

  public get journal() {
    return this._journal;
  }

  public get link() {
    return this._link;
  }

  public get log() {
    return this._log;
  }

  public get mail() {
    return this._mail;
  }

  public get menu() {
    return this._menu;
  }

  public get migration() {
    return this._migration;
  }

  public get option() {
    return this._option;
  }

  public get photo() {
    return this._photo;
  }

  public get postComment() {
    return this._postComment;
  }

  public get post() {
    return this._post;
  }

  public get sheetComment() {
    return this._sheetComment;
  }

  public get sheet() {
    return this._sheet;
  }

  public get statistic() {
    return this._statistic;
  }

  public get tag() {
    return this._tag;
  }

  public get theme() {
    return this._theme;
  }

  public get user() {
    return this._user;
  }
}
