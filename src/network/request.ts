import { AxiosInstance, default as BaseAxios } from 'axios'
import get from 'lodash/get'
import alertDialog from '../helpers/alertDialog'
import {
  APP_JSON_HEADER,
  BASE_URL,
  MULTIPART_HEADER,
  TOKEN_HEADER
} from './config'

class RequestClass {
  axios: AxiosInstance
  serverBaseUrl: string

  constructor() {
    this.axios = BaseAxios.create({ timeout: 60000 })
    this.serverBaseUrl = BASE_URL
  }

  async call(config) {
    try {
      const res = await this.axios.request({
        baseURL: this.serverBaseUrl,
        APP_JSON_HEADER,
        ...config
      })
      return { ...res.data, status: 1 }
    } catch (error) {
      const errorStatus = get(error, 'response.status', null)
      const data = get(error, 'response.data', {})
      const method = get(error, 'response.config.method', {})
      const url = get(error, 'response.config.url', {})
      console.info('my data', data)
      console.warn('AXIOS_errorStatus', errorStatus)
      console.warn('AXIOS_errorURL', url)
      console.error('AXIOS_errorMethod', method)
      console.warn('AXIOS_errorData', data)
      alertDialog({
        title: 'Error',
        onPress: () => {
          undefined
        },
        message:
          // 'Invalid credentials provided! Kindly enter the correct details.'
          typeof data?.error_message === 'string'
            ? data?.error_message
            : JSON.stringify(data)
      })
      return {
        status: 0,
        errorStatus,
        message: data
      }
    }
  }
  async callWithToken(config) {
    try {
      const tok = await TOKEN_HEADER()
      const res = await this.axios.request({
        baseURL: this.serverBaseUrl,
        headers: tok,
        ...config
      })
      if (Array.isArray(res.data)) {
        return { data: res.data, status: 1 }
      }
      return { ...res.data, status: 1 }
    } catch (error) {
      const errorStatus = get(error, 'response.status', null)
      const data = get(error, 'response.data', {})
      const method = get(error, 'response.config.method', {})
      const url = get(error, 'response.config.url', {})
      console.info('my data', data)
      console.warn('AXIOS_errorStatus', errorStatus)
      console.warn('AXIOS_errorURL', url)
      console.error('AXIOS_errorMethod', method)
      console.warn('AXIOS_errorData', data)
      if (data?.error_message) {
        alertDialog({
          title: 'Error',
          onPress: () => {
            undefined
          },
          message:
            typeof data?.error_message === 'string'
              ? data?.error_message
              : JSON.stringify(data)
        })
      }
      return {
        status: 0,
        errorStatus,
        message: get(data, 'message')
      }
    }
  }

  async multiPartCall(config) {
    try {
      const tokenHeader = await MULTIPART_HEADER()
      const serverBaseUrl = this.serverBaseUrl
      const res = await this.axios.request({
        baseURL: serverBaseUrl,
        headers: tokenHeader,
        ...config
      })
      return { ...res.data, status: 1 }
    } catch (error) {
      const errorStatus = get(error, 'response.status', null)
      const data = get(error, 'response.data', {})
      console.warn('AXIOS_errorStatus', errorStatus)
      console.warn('AXIOS_errorData', data)
      alertDialog({
        title: 'Error',
        onPress: () => {
          undefined
        },
        message:
          typeof data?.error_message === 'string'
            ? data?.error_message
            : JSON.stringify(data)
      })
      return {
        status: 0,
        errorStatus,
        message: get(data, 'message')
      }
    }
  }
}

const Request = new RequestClass()

export { Request }
