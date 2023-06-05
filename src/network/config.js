import { store } from '../store'

//Base Url for api requests
export const BASE_URL = 'https://broken-limit-34877.botics.co/'
// export const BASE_URL = 'https://7e8c-14-102-43-42.ngrok.io/admin/'

export const commonApiRoute = 'home/api/v1/'

export const MULTIPART_HEADER = async () => {
  const token = await store.getState().loginReducer?.loginUser?.data?.token
  const header = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  if (token) {
    header.Authorization = `Token ${token}`
  }
  return header
}

export const APP_JSON_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const TOKEN_HEADER = async () => {
  const token = await store.getState().loginReducer?.loginData?.data?.token
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  }
  return header
}
