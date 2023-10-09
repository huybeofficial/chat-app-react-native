import axios from "axios"

const BASE_URL = 'https://realtime-message-app-backend.vercel.app/api';

export const getAllConversationApi = () => {
    const conversations = axios({
        method: "GET",
        url: BASE_URL.concat(`/chat/c`),
    })
    return conversations
}

export const getMessageOfConversationApi = (id: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat(`/chat/m/${id}`)
    })
}