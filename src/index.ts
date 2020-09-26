import { createComment, listComments } from './content/comment'

const HaloSDK = ({ url }) => {
  const commentsApi = {
    createComment,
    listComments
  }

  return {
    commentsApi
  }
}

export default HaloSDK
