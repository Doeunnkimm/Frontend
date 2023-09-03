import axios from 'axios'

export const getPostList = async (params) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params,
  })
  return res.data
}
