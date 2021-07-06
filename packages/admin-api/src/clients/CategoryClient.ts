import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Response, Category, CategoryParam, CategoryTree } from "../types";

export class CategoryClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all categories.
   *
   * @param params parameter for queries
   * @returns A response of all categories.
   */
  public list(params: {
    sort: Array<string>;
    more: boolean;
  }): Promise<Response<Array<Category>>> {
    const path = buildPath({
      endpointName: "categories",
    });
    return this.client.get(path, { ...params });
  }

  /**
   * Creates a category.
   *
   * @param params category parameter to create
   * @returns A response of created category.
   */
  public create(params: CategoryParam): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: "categories",
    });
    return this.client.post(path, { ...params });
  }

  /**
   * Gets category detail by id.
   *
   * @param categoryId category id
   * @returns A response of category detail.
   */
  public getById(categoryId: number): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`,
    });
    return this.client.get(path, {});
  }

  /**
   * Updates category by id
   *
   * @param categoryId category id
   * @param params category update parameter
   * @returns A response of updated category.
   */
  public updateById(
    categoryId: number,
    params: CategoryParam
  ): Promise<Response<Category>> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`,
    });
    return this.client.put(path, { ...params });
  }

  /**
   * Deletes a category by id.
   *
   * @param categoryId category id
   */
  public async deleteById(categoryId: number): Promise<void> {
    const path = buildPath({
      endpointName: `categories/${categoryId}`,
    });
    await this.client.delete(path, {});
  }

  /**
   * List all categories as tree.
   *
   * @param sort sort option for queries, value is category field
   * @returns A response of all categories.
   */
  public listAsTree(
    sort: Array<string>
  ): Promise<Response<Array<CategoryTree>>> {
    const path = buildPath({
      endpointName: "categories/tree_view",
    });
    return this.client.get(path, { sort });
  }
}
