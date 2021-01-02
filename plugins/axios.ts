// import Auth from '@nuxtjs/auth/lib/core/auth'
import { Auth } from '@nuxtjs/auth'
/* eslint-disable import/no-mutable-exports */
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance
let $auth: Auth
let $toast: any

export function initializeAxios (axiosInstance: NuxtAxiosInstance, authInstance: Auth) {
  $axios = axiosInstance
  $auth = authInstance
}

export { $axios, $auth, $toast }
