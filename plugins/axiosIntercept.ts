// // import store from '~/store'
// // import { $axios } from './axios'

// const onFufilled = (resp: any) => {
//   return resp
// }
// const onRejected = async (error: { response: { status: number } }) => {
//   if (error && error.response && error.response.status === 401) {
//     console.log('gotta 401')
//   }
//   console.log('intercept')
// }

// export default function (opts: any) {
//   const { $nuxt, $axios, store, $9tcookie, auth } = opts

//   // $axios.interceptors.response.use(onFufilled, onRejected)

//   // $axios.onResponseError((err: any) => {
//   //   return onRejected(err)
//   // })

//   // $axios.onRequest(async (config: any) => {
//   //   if (!auth.loggedIn) {
//   //     let accessToken = await store.dispatch('refreshToken')
//   //     config.headers.Authorization = accessToken
//   //   }

//   //   //   let accessToken = store.getters.getAccessToken

//   //   // if (!accessToken) {
//   //   //   accessToken = await store.dispatch('refreshToken')
//   //   // }
//   //   // config.headers.Authorization = accessToken
//   // })
//   $axios.onError(async (error: any) => {
//     if (
//       !error.isAxiosError &&
//       error.response &&
//       error.response.status === 500
//     ) {
//       // redirect('/auth')

//       store.dispatch('refreshToken')
//     } else if (error && error.name === 'ExpiredAuthSessionError') {
//       // const token = await store.dispatch('refreshToken')
//       // // $auth.strategy.refreshToken.set(resp.data.refreshToken)
//       // $axios.setHeader('Authorization', token)
//       // const { config } = error
//       // const originalRequest = config
//       // const retryOriginalRequest = new Promise((resolve) => {
//       //   originalRequest.headers.Authorization = token
//       //   resolve($axios(originalRequest))
//       // })
//       // $nuxt.refresh()
//       // return retryOriginalRequest
//     } else {
//       console.log(error)
//     }
//     // else if (error.response && error.response.status === 403) {
//     //   const refreshToken = $9tcookie.get('9tcookie')
//     //   const { config } = error
//     //   const originalRequest = config

//     //   if (!refreshToken) {
//     //     console.log('no refresh token')
//     //     const randoCookie = $9tcookie.get('9tAnonymous')
//     //     const retryOriginalRequest = new Promise((resolve) => {
//     //       originalRequest.headers.Authorization = randoCookie
//     //       resolve($axios(originalRequest))
//     //     })
//     //     return retryOriginalRequest
//     //   } else {
//     //     await store.dispatch('getAccessToken', refreshToken)
//     //     const accessToken = store.getters.getAccessToken
//     //     console.log('intercept get token')
//     //     if (!accessToken) {
//     //       console.log('redirecting2!!!')
//     //       return redirect('/auth')
//     //     } else {
//     //       const retryOriginalRequest = new Promise((resolve) => {
//     //         originalRequest.headers.Authorization = accessToken
//     //         resolve($axios(originalRequest))
//     //       })
//     //       return retryOriginalRequest
//     //     }
//     //   }
//     // } else {
//     //   return error
//     // }
//   })
// }
