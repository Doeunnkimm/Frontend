import { HTTP_BASE_URL } from '@/shared/constants/http'
import axios from 'axios'

const Instance = axios.create({
  baseURL: HTTP_BASE_URL,
  //   withCredentials: true
})
export default Instance
