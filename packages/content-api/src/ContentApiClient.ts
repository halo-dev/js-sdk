import { HaloRestAPIClient, HttpClient } from "@halo-dev/rest-api-client";
import {
  ArchiveClient,
  CategoryClient,
  JournalClient,
  LinkClient,
  MenuClient,
  OptionClient,
  PhotoClient,
  PostClient,
  SheetClient,
  StatisticClient,
  TagClient,
  ThemeClient,
  UserClient,
} from "./clients";

export class ContentApiClient {
  private client: HttpClient;
  private _archive: ArchiveClient;
  private _category: CategoryClient;
  private _journal: JournalClient;
  private _link: LinkClient;
  private _menu: MenuClient;
  private _option: OptionClient;
  private _photo: PhotoClient;
  private _post: PostClient;
  private _sheet: SheetClient;
  private _statistic: StatisticClient;
  private _tag: TagClient;
  private _theme: ThemeClient;
  private _user: UserClient;

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient();
    this._archive = new ArchiveClient(this.client);
    this._category = new CategoryClient(this.client);
    this._journal = new JournalClient(this.client);
    this._link = new LinkClient(this.client);
    this._menu = new MenuClient(this.client);
    this._option = new OptionClient(this.client);
    this._photo = new PhotoClient(this.client);
    this._post = new PostClient(this.client);
    this._sheet = new SheetClient(this.client);
    this._statistic = new StatisticClient(this.client);
    this._tag = new TagClient(this.client);
    this._theme = new ThemeClient(this.client);
    this._user = new UserClient(this.client);
  }

  public get archive() {
    return this._archive;
  }

  public get category() {
    return this._category;
  }

  public get journal() {
    return this._journal;
  }

  public get link() {
    return this._link;
  }

  public get menu() {
    return this._menu;
  }

  public get option() {
    return this._option;
  }

  public get photo() {
    return this._photo;
  }

  public get post() {
    return this._post;
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
