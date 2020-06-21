import axios, { AxiosResponse } from 'axios'
import { IPost, IPostFormValues } from '../models/post'
import { ILoginFormValues, IAppUser, IRegisterFormValues } from '../models/appUser'
import { toast } from 'react-toastify'
import { IProfile } from '../models/profile'
import { history } from '../..'
import { IPhoto } from '../models/photo'

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
    if(!errors.response && errors.message === 'Network Error'){
        toast.error('Could not connect to server - Please try again later!')
    }
    if(errors.response.status === 404){
        history.push('/notfound')
    }
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
    post: (url: string, body: {}) => axios.post(url, body).then(responeBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData()
        formData.append('File', file)
        return axios.post(url, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(responeBody)
    }
}

const Posts = {
    list: (): Promise<IPost[]> => requests.get('/posts'),
    like: (id: string) => requests.post(`/posts/like/${id}`, {}),
    create: (text: IPostFormValues): Promise<IPost> => requests.post('/posts/post', text)
}

const Users = {
    login: (values: ILoginFormValues): Promise<IAppUser> => requests.post('/users/login', values),
    register: (values: IRegisterFormValues): Promise<IAppUser> => requests.post('/users/register', values),
    currentUser: (): Promise<IAppUser> => requests.get('/users/current')
}

const Profiles = {
    getProfile: (userName: string): Promise<IProfile> => requests.get(`/profiles/${userName}`)
}

const Photo = {
    upload: (photo: Blob): Promise<IPhoto> => requests.postForm('/photos/add', photo)
}

export default { Posts, Users, Profiles, Photo }