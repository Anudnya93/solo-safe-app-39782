import { Request } from './request'
import { commonApiRoute } from './config'

/**
 * Login APIS
 */

export const login = data => {
  return Request.call({
    url: `${commonApiRoute}login/`,
    method: 'POST',
    data
  })
}

export const logout = () => {
  return Request.callWithToken({
    url: `${commonApiRoute}logout`,
    method: 'POST'
  })
}

export const sendDD = data => {
  return Request.callWithToken({
    url: 'daily/dairyresponse/',
    method: 'POST',
    data
  })
}
export const sendRecommendationNew = data => {
  return Request.callWithToken({
    url: 'daily/recommendationskill/',
    method: 'PUT',
    data
  })
}
