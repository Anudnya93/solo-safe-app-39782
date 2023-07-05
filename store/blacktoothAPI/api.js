import axios from "axios"
const blacktoothAPI = axios.create({
  baseURL: "https://solo-safe-app-39782.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function api_docs_schema_retrieve(payload) {
  return blacktoothAPI.get(`/api-docs/schema/`, {
    params: { lang: payload.lang }
  })
}
function api_v1_login_create(payload) {
  return blacktoothAPI.post(`/api/v1/login/`, payload.data)
}
function api_v1_signup_create(payload) {
  return blacktoothAPI.post(`/api/v1/signup/`, payload.data)
}
function modules_payments_get_payments_history_retrieve(payload) {
  return blacktoothAPI.get(`/modules/payments/get_payments_history/`)
}
function modules_payments_get_payments_methods_retrieve(payload) {
  return blacktoothAPI.get(`/modules/payments/get_payments_methods/`)
}
function modules_payments_payment_sheet_create(payload) {
  return blacktoothAPI.post(`/modules/payments/payment_sheet/`)
}
function modules_social_auth_apple_connect_create(payload) {
  return blacktoothAPI.post(`/modules/social-auth/apple/connect/`, payload.data)
}
function modules_social_auth_apple_login_create(payload) {
  return blacktoothAPI.post(`/modules/social-auth/apple/login/`, payload.data)
}
function modules_social_auth_facebook_connect_create(payload) {
  return blacktoothAPI.post(
    `/modules/social-auth/facebook/connect/`,
    payload.data
  )
}
function modules_social_auth_facebook_login_create(payload) {
  return blacktoothAPI.post(
    `/modules/social-auth/facebook/login/`,
    payload.data
  )
}
function modules_social_auth_google_connect_create(payload) {
  return blacktoothAPI.post(
    `/modules/social-auth/google/connect/`,
    payload.data
  )
}
function modules_social_auth_google_login_create(payload) {
  return blacktoothAPI.post(`/modules/social-auth/google/login/`, payload.data)
}
function modules_social_auth_socialaccounts_list(payload) {
  return blacktoothAPI.get(`/modules/social-auth/socialaccounts/`)
}
function modules_social_auth_socialaccounts_disconnect_create(payload) {
  return blacktoothAPI.post(
    `/modules/social-auth/socialaccounts/${payload.id}/disconnect/`,
    payload.data
  )
}
function rest_auth_login_create(payload) {
  return blacktoothAPI.post(`/rest-auth/login/`, payload.data)
}
function rest_auth_logout_retrieve(payload) {
  return blacktoothAPI.get(`/rest-auth/logout/`)
}
function rest_auth_logout_create(payload) {
  return blacktoothAPI.post(`/rest-auth/logout/`)
}
function rest_auth_password_change_create(payload) {
  return blacktoothAPI.post(`/rest-auth/password/change/`, payload.data)
}
function rest_auth_password_reset_create(payload) {
  return blacktoothAPI.post(`/rest-auth/password/reset/`, payload.data)
}
function rest_auth_password_reset_confirm_create(payload) {
  return blacktoothAPI.post(`/rest-auth/password/reset/confirm/`, payload.data)
}
function rest_auth_registration_create(payload) {
  return blacktoothAPI.post(`/rest-auth/registration/`, payload.data)
}
function rest_auth_registration_verify_email_create(payload) {
  return blacktoothAPI.post(
    `/rest-auth/registration/verify-email/`,
    payload.data
  )
}
function rest_auth_user_retrieve(payload) {
  return blacktoothAPI.get(`/rest-auth/user/`)
}
function rest_auth_user_update(payload) {
  return blacktoothAPI.put(`/rest-auth/user/`, payload.data)
}
function rest_auth_user_partial_update(payload) {
  return blacktoothAPI.patch(`/rest-auth/user/`, payload.data)
}
export const apiService = {
  api_docs_schema_retrieve,
  api_v1_login_create,
  api_v1_signup_create,
  modules_payments_get_payments_history_retrieve,
  modules_payments_get_payments_methods_retrieve,
  modules_payments_payment_sheet_create,
  modules_social_auth_apple_connect_create,
  modules_social_auth_apple_login_create,
  modules_social_auth_facebook_connect_create,
  modules_social_auth_facebook_login_create,
  modules_social_auth_google_connect_create,
  modules_social_auth_google_login_create,
  modules_social_auth_socialaccounts_list,
  modules_social_auth_socialaccounts_disconnect_create,
  rest_auth_login_create,
  rest_auth_logout_retrieve,
  rest_auth_logout_create,
  rest_auth_password_change_create,
  rest_auth_password_reset_create,
  rest_auth_password_reset_confirm_create,
  rest_auth_registration_create,
  rest_auth_registration_verify_email_create,
  rest_auth_user_retrieve,
  rest_auth_user_update,
  rest_auth_user_partial_update
}
