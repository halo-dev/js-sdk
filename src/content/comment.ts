import { AxiosAdapter } from "axios";

const baseUrl: string = '/api/content'

/**
 * 提交评论
 * @param target
 * @param comment
 * @param request
 */
export const createComment = (target: string, comment: string, request: AxiosAdapter) => {
  return request({
    url: `${baseUrl}/${target}/comments`,
    method: 'post',
    data: comment
  })
}

/**
 * 评论列表
 * @param target
 * @param targetId
 * @param view
 * @param pagination
 * @param request
 */
export const listComments = (target: string, targetId: number, view: string = 'tree_view', pagination: any, request: AxiosAdapter) => {
  return request({
    url: `${baseUrl}/${target}/${targetId}/comments/${view}`,
    params: pagination,
    method: 'get'
  })
}
