import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Menu
} from "../types";

export class MenuClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public listAll(): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus"
    });
    return this.client.get(path, {})
  }

  public create(params: Menu): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: "menus"
    });
    return this.client.post(path, { ...params })
  }

  public createInBatch(params: Array<Menu>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    return this.client.post(path, [...params])
  }

  public getById(menuId: number): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: `menus/${menuId}`
    });
    return this.client.post(path, {})
  }

  public updateById(menuId: number, params: Menu): Promise<Response<Menu>> {
    const path = buildPath({
      endpointName: `menus/${menuId}`
    });
    return this.client.put(path, { ...params })
  }

  public updateInBatch(params: Array<Menu>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    return this.client.put(path, [...params])
  }

  public async deleteById(menuId: number): Promise<void> {
    const path = buildPath({
      endpointName: `menus/${menuId}`
    });
    await this.client.delete(path, {})
  }

  public async deleteInBatch(menuIds: Array<number>): Promise<void> {
    const path = buildPath({
      endpointName: "menus/batch"
    });
    await this.client.delete(path, [...menuIds])
  }

  public listTreeViewByTeam(team: string, sort?: Array<string>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/team/tree_view"
    });
    return this.client.get(path, { team, sort })
  }

  public listTeams(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "menus/teams"
    });
    return this.client.get(path, {})
  }

  public listTreeView(sort?: Array<string>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: "menus/tree_view"
    });
    return this.client.get(path, { sort })
  }
}