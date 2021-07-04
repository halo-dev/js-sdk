import { HttpClient, FormData } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Group, Response, ThemeFile, ThemeProperty } from "../types";

export class ThemeClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List all themes.
   *
   * @returns array of ThemeProperty
   */
  public list(): Promise<Response<Array<ThemeProperty>>> {
    const path = buildPath({
      endpointName: "themes",
    });
    return this.client.get(path, {});
  }

  /**
   * Get theme property by themeId.
   *
   * @param themeId themeId
   * @returns ThemeProperty
   */
  public get(themeId: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}`,
    });
    return this.client.get(path, {});
  }

  /**
   * Delete theme by themeId.
   *
   * @param themeId themeId
   * @param deleteSettings whether to delete the theme settings at the same time.
   * @returns ThemeProperty
   */
  public delete(
    themeId: string,
    deleteSettings?: boolean
  ): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}?deleteSettings=${deleteSettings}`,
    });
    return this.client.delete(path, {});
  }

  /**
   * Active a theme.
   *
   * @param themeId themeId
   * @returns ThemeProperty
   */
  public active(themeId: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/activation`,
    });
    return this.client.post(path, {});
  }

  /**
   * List activated theme configurations.
   *
   * @returns array of configuration group.
   */
  public listActivatedConfigurations(): Promise<Response<Array<Group>>> {
    const path = buildPath({
      endpointName: "themes/activation/configurations",
    });
    return this.client.get(path, {});
  }

  /**
   * List theme configurations by themeId.
   *
   * @param themeId themeId
   * @returns array of configuration group.
   */
  public listConfigurations(themeId: string): Promise<Response<Array<Group>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/configurations`,
    });
    return this.client.get(path, {});
  }

  /**
   * List theme files by themeId.
   *
   * @param themeId themeId
   * @returns arrary of ThemeFile
   */
  public listFiles(themeId: string): Promise<Response<Array<ThemeFile>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/files`,
    });
    return this.client.get(path, {});
  }

  /**
   * List activated theme files.
   *
   * @returns arrary of ThemeFile
   */
  public listActivatedFiles(): Promise<Response<Array<ThemeFile>>> {
    const path = buildPath({
      endpointName: "themes/activation/files",
    });
    return this.client.get(path, {});
  }

  /**
   * Get activated template content by filepath.
   *
   * @param filepath filepath
   * @returns template content
   */
  public getActivatedTemplateContent(
    filepath: string
  ): Promise<Response<string>> {
    const path = buildPath({
      endpointName: "themes/files/content",
    });
    return this.client.get(path, { path: filepath });
  }

  /**
   * Get template content by themeId and filepath.
   *
   * @param themeId themeId
   * @param filepath filepath
   * @returns template content
   */
  public getTemplateContent(
    themeId: string,
    filepath: string
  ): Promise<Response<string>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/files/content`,
    });
    return this.client.get(path, { path: filepath });
  }

  /**
   * Update theme template content by themeId.
   *
   * @param themeId themeId
   * @param params path, content
   */
  public async updateTemplateContent(
    themeId: string,
    params: {
      path?: string;
      content?: string;
    }
  ): Promise<void> {
    const path = buildPath({
      endpointName: `themes/${themeId}/files/content`,
    });
    await this.client.put(path, { ...params });
  }

  /**
   * List theme settings by themeId.
   *
   * @param themeId themeId
   * @returns Record<string, unknown>
   */
  public listSettings(
    themeId: string
  ): Promise<Response<Record<string, unknown>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/settings`,
    });
    return this.client.get(path, {});
  }

  /**
   * List activated theme settings.
   *
   * @returns Record<string, unknown>
   */
  public listActivatedSettings(): Promise<Response<Record<string, unknown>>> {
    const path = buildPath({
      endpointName: "themes/activation/settings",
    });
    return this.client.get(path, {});
  }

  /**
   * Save settings by themeId.
   *
   * @param themeId themeId
   * @param settings settings
   */
  public async saveSettings(
    themeId: string,
    settings: Map<String, Object>
  ): Promise<void> {
    const path = buildPath({
      endpointName: `themes/${themeId}/settings`,
    });
    await this.client.post(path, { settings });
  }

  /**
   * Save activated theme settings.
   *
   * @param settings settings
   */
  public async saveActivatedSettings(
    settings: Map<String, Object>
  ): Promise<void> {
    const path = buildPath({
      endpointName: "themes/activation/settings",
    });
    await this.client.post(path, { settings });
  }

  /**
   * Get activated theme property.
   *
   * @returns ThemeProperty
   */
  public getActivatedTheme(): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: "themes/activation",
    });
    return this.client.get(path, {});
  }

  /**
   * List activated theme custom post templates.
   *
   * @returns array of template name.
   */
  public listCustomPostTemplates(): Promise<Response<Array<String>>> {
    const path = buildPath({
      endpointName: "themes/activation/template/custom/post",
    });
    return this.client.get(path, {});
  }

  /**
   * List activated theme custom sheet templates.
   *
   * @returns array of template name.
   */
  public listCustomSheetTemplates(): Promise<Response<Array<String>>> {
    const path = buildPath({
      endpointName: "themes/activation/template/custom/sheet",
    });
    return this.client.get(path, {});
  }

  /**
   * Check template exists
   *
   * @param template template name
   * @returns boolean
   */
  public exists(template: string): Promise<Response<boolean>> {
    const path = buildPath({
      endpointName: "themes/activation/template/exists",
    });
    return this.client.get(path, { template });
  }

  /**
   * Fetch theme by uri
   *
   * @param uri uri
   * @returns void
   */
  public fetchTheme(uri: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: "themes/fetching",
    });
    return this.client.get(path, { uri });
  }

  /**
   * update theme by fetch.
   *
   * @param themeId themeId
   * @returns void
   */
  public updateThemeByFetching(
    themeId: string
  ): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/fetching/${themeId}`,
    });
    return this.client.put(path, {});
  }

  /**
   * Update activated theme template content.
   *
   * @param params path, content
   * @returns void
   */
  public updateActivatedTemplateContent(params: {
    path?: string;
    content?: string;
  }): Promise<Response<void>> {
    const path = buildPath({
      endpointName: "themes/files/content",
    });
    return this.client.put(path, { ...params });
  }

  /**
   * Refresh theme list cache.
   *
   * @returns void
   */
  public reload(): Promise<Response<void>> {
    const path = buildPath({
      endpointName: "themes/reload",
    });
    return this.client.post(path, {});
  }

  /**
   * Upload a theme.
   *
   * @param data data
   * @returns ThemeProperty
   */
  public upload(data: unknown): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: "themes/upload",
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }

  /**
   * Update theme by upload.
   *
   * @param themeId themeId
   * @param data data
   * @returns ThemeProperty
   */
  public updateByUpload(
    themeId: string,
    data: unknown
  ): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/upload/${themeId}`,
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }
}
