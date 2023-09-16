import axios from "axios"
import { registerUrl, loginUrl } from "./api"
import * as SecureStore from 'expo-secure-store'

const BASE_URL = 'http://localhost:8080/api/v1'

interface RegisterBody { 
    name: string
    email: string
    password: string
}

interface LoginBody {
    email: string
    password: string
}

export const registerApi = ({ name, password, email } : RegisterBody) => {
    const registerRequest = axios({
        method: "POST",
        url: registerUrl,
        data: { name, email, password },
        headers: { 
            'Content-Type': 'application/json'
        },
    })
    return registerRequest
}

export const loginApi = ({ email, password }: LoginBody) => {
    const loginRequest = axios({
        method: "POST",
        url: loginUrl,
        data: { email, password },
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    return loginRequest
}

export const setAccessToken = async(accessToken : string) => {
    if(!accessToken) {
        return false
    }
    try {
        await SecureStore.setItemAsync('accessToken', accessToken)
        addTokenToAxios(accessToken)
        return true
    } catch(error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const getAccessToken = async() => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        return accessToken
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

const getUsersTest = async() => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/users"),
    })
}

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${accessToken}`
        // config.headers.Authorization = `123456789`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      })
}

