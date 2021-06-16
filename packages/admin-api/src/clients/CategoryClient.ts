import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Category,
  CategoryParam,
  CategoryTree,
} from "../types";

export class CategoryClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: {
    sort: Array<string>
    more: boolean
  }): Promise<Response<Array<Category>>> {
    const path = buildPath({
      endpointName: "categories"
    });
    return this.client.get(path, { ...params })
  }

  public create(params: CategoryParam): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: "categories"
    });
    return this.client.post(path, { ...params })
  }

  public getById(categoryId: number): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    return this.client.get(path, {})
  }

  public updateById(categoryId: number, params: CategoryParam): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteById(categoryId: number): Promise<void> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`
    });
    await this.client.delete(path, {})
  }

  public listAsTree(sort: Array<string>): Promise<Response<Array<CategoryTree>>> {
    const path = buildPath({
      endpointName: "categories/tree_view"
    });
    return this.client.get(path, { sort })
  }
}