import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import { registerUrl, loginUrl, logoutUrl, listConversationUrl } from "./api"

export interface Conversation {
    name: string,
    textMessage: string,
    avatar: string
}


interface RegisterBody {
    email: string
    username: string
    password: string
}
export interface User {
    username: string,
    email: string,
    password: string
}

export interface LoginBody {
    email: string
    password: string
}
interface LogoutBody {
    email: string
    password: string
}

export const registerApi = ({ email, username, password }: RegisterBody) => {
    const registerRequest = axios({
        method: "POST",
        url: registerUrl,
        data: { email: email, username: username, password: password },
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return registerRequest
}

export const loginApi = ({ email, password }: LoginBody) => {
    return axios({
        method: "POST",
        url: loginUrl,
        data: { email, password },
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
export const logoutApi = ({ email, password }: LogoutBody) => {
    return axios({
        method: "POST",
        url: logoutUrl,
        data: { email, password },
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const getConversationApi = () => {
    return axios({
        method: "GET",
        url: 'https://65219161a4199548356d60b0.mockapi.io/conversation'
    })
}

export const setAccessToken = async (accessToken: string) => {
    if (!accessToken) {
        return false
    }
    try {
        await SecureStore.setItemAsync('accessToken', accessToken)
        addTokenToAxios(accessToken)
        return true
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const getAccessToken = async () => {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        return accessToken
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
    return false
}

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {

        config.headers.Authorization = `Bearer ${accessToken}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    })
}


export const deleteAccessToken = async () => {
    try {
        await SecureStore.deleteItemAsync('accessToken');
        removeTokenFromAxios();
        return true;
    } catch (error) {
        console.log("Lỗi khi xóa token", error);
    }
    return false;

}
export const removeTokenFromAxios = () => {
    // axios.interceptors.request.eject(axios.interceptors.request); // Xóa Axios interceptors
    // Hoặc chỉ cần xóa Authorization header:
    axios.interceptors.request.use(function (config) {
        delete config.headers.Authorization;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
}



