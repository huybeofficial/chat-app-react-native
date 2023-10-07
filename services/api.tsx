const BASE_URL = "https://realtime-message-app-backend.vercel.app/api"

export const registerUrl = BASE_URL.concat("/auth/signup")
export const loginUrl = BASE_URL.concat("/auth/login")
export const logoutUrl = BASE_URL.concat("/auth/logout")
export const listConversationUrl = BASE_URL.concat("/chat")