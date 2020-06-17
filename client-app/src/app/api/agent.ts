import axios, { AxiosResponse } from 'axios'
import { IPost } from '../models/post'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responeBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responeBody)
}

const Posts = {
    list: (): Promise<IPost[]> => requests.get('/posts')
}

export default { Posts }