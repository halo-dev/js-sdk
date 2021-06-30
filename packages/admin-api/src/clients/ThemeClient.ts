import { HttpClient, FormData } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Group, Response, ThemeFile, ThemeProperty } from "../types";

export class ThemeClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public listAll(): Promise<Response<Array<ThemeProperty>>> {
    const path = buildPath({
      endpointName: "themes",
    });
    return this.client.get(path, {});
  }

  public getById(themeId: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}`,
    });
    return this.client.get(path, {});
  }

  public deleteById(
    themeId: string,
    deleteSettings?: boolean
  ): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}?deleteSettings=${deleteSettings}`,
    });
    return this.client.delete(path, {});
  }

  public active(themeId: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/activation`,
    });
    return this.client.post(path, {});
  }

  public fetchConfig(): Promise<Response<Array<Group>>> {
    const path = buildPath({
      endpointName: "themes/activation/configurations",
    });
    return this.client.get(path, {});
  }

  public fetchConfigById(themeId: string): Promise<Response<Array<Group>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/configurations`,
    });
    return this.client.get(path, {});
  }

  public listFilesById(themeId: string): Promise<Response<Array<ThemeFile>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/files`,
    });
    return this.client.get(path, {});
  }

  public listFiles(): Promise<Response<Array<ThemeFile>>> {
    const path = buildPath({
      endpointName: "themes/activation/files",
    });
    return this.client.get(path, {});
  }

  public getContentByPath(filepath: string): Promise<Response<string>> {
    const path = buildPath({
      endpointName: "themes/files/content",
    });
    return this.client.get(path, { path: filepath });
  }

  public getContentById(
    themeId: string,
    filepath: string
  ): Promise<Response<string>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/files/content`,
    });
    return this.client.get(path, { path: filepath });
  }

  public async updateContentById(
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

  public listSettingsById(
    themeId: string
  ): Promise<Response<Map<String, any>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/settings`,
    });
    return this.client.get(path, {});
  }

  public listSettings(): Promise<Response<Map<String, any>>> {
    const path = buildPath({
      endpointName: "themes/activation/settings",
    });
    return this.client.get(path, {});
  }

  public async saveSettingsById(
    themeId: string,
    settings: Map<String, Object>
  ): Promise<void> {
    const path = buildPath({
      endpointName: `themes/${themeId}/settings`,
    });
    await this.client.post(path, { settings });
  }

  public async saveSettings(settings: Map<String, Object>): Promise<void> {
    const path = buildPath({
      endpointName: "themes/activation/settings",
    });
    await this.client.post(path, { settings });
  }

  public getActivateTheme(): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: "themes/activation",
    });
    return this.client.get(path, {});
  }

  public getCustomPostTemplate(): Promise<Response<Array<String>>> {
    const path = buildPath({
      endpointName: "themes/activation/template/custom/post",
    });
    return this.client.get(path, {});
  }

  public getCustomSheetTemplate(): Promise<Response<Array<String>>> {
    const path = buildPath({
      endpointName: "themes/activation/template/custom/sheet",
    });
    return this.client.get(path, {});
  }

  public exists(template: string): Promise<Response<boolean>> {
    const path = buildPath({
      endpointName: "themes/activation/template/exists",
    });
    return this.client.get(path, { template });
  }

  public fetchTheme(uri: string) {
    const path = buildPath({
      endpointName: "themes/fetching",
    });
    return this.client.get(path, { uri });
  }

  public updateThemeByFetching(themeId: string) {
    const path = buildPath({
      endpointName: `themes/fetching/${themeId}`,
    });
    return this.client.put(path, {});
  }

  public updateContent(params: { path?: string; content?: string }) {
    const path = buildPath({
      endpointName: "themes/files/content",
    });
    return this.client.put(path, { ...params });
  }

  public async reload(): Promise<void> {
    const path = buildPath({
      endpointName: "themes/reload",
    });
    await this.client.post(path, {});
  }

  public uploadTheme(data: unknown): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: "themes/upload",
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }

  public updateThemeByUpload(
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
