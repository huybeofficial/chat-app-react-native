import axios from "axios"
import { loginUrl, registerUrl } from "./api"

interface RegisterBody { 
    username: string
    email: string
    password: string
}

interface LoginBody {
    username: string
    password: string
}

export const registerApi = ({ username, password, email } : RegisterBody) => {
    const registerRequest = axios({
        method: "POST",
        url: registerUrl,
        data: { username, email, password },
        headers: { 
            'Content-Type': 'application/json'
        },
    })
    return registerRequest
}

export const loginApi = ({ username, password }: LoginBody) => {
    const loginRequest = axios({
        method: "POST",
        url: loginUrl,
        data: { username, password },
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    return loginRequest
}


