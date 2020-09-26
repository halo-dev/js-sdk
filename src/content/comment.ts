import request from '../utils/service'

const baseUrl: string = '/api/content'

/**
 * 提交评论
 * @param target
 * @param comment
 */
export const createComment = (target: string, comment: string) => {
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
 */
export const listComments = (target: string, targetId: number, view: string = 'tree_view', pagination: any) => {
  return request({
    url: `${baseUrl}/${target}/${targetId}/comments/${view}`,
    params: pagination,
    method: 'get'
  })
}
