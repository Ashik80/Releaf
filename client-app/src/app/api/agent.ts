import axios, { AxiosResponse } from 'axios'
import { IPost, IPostFormValues } from '../models/post'
import { ILoginFormValues, IAppUser } from '../models/appUser'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(undefined, errors => {
    // const { status, config, data } = errors.response
    // if (status === 401) {
    //     history.push('/')
    //     toast.error("Login first!")
    // }
    throw errors.response
})

const responeBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responeBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responeBody)
}

const Posts = {
    list: (): Promise<IPost[]> => requests.get('/posts'),
    like: (id: string) => requests.post(`/posts/like/${id}`, {}),
    create: (text: IPostFormValues): Promise<IPost> => requests.post('/posts/post', text)
}

const Users = {
    login: (values: ILoginFormValues): Promise<IAppUser> => requests.post('/users/login', values),
    currentUser: (): Promise<IAppUser> => requests.get('/users/current')
}

export default { Posts, Users }