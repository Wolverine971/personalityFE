export default function ({ $axios, redirect, store }: any) {
  $axios.onRequest((config: any) => {
    const accessToken = store.getters.getAccessToken
    if (accessToken) {
      config.headers.common.Authorization = accessToken
    }
  })
  $axios.onError(async (error: any) => {
    console.log('error')
    if (
      !error.isAxiosError &&
      error.response &&
      error.response.status === 500
    ) {
      redirect('/auth')
    } else if (error.response && error.response.status === 403) {
      console.log('jwt expired')
      const refreshToken = store.$auth.$storage._state['_token.local']

      if (!refreshToken) {
        console.log('redirecting1!!!')
        return redirect('/auth')
      } else {
        const {
          config
        } = error
        const originalRequest = config
        const resp = await store.dispatch('getAccessToken', refreshToken)
        if (!resp) {
          console.log('redirecting2!!!')
          return redirect('/auth')
        } else {
          const retryOriginalRequest = new Promise((resolve) => {
            originalRequest.headers.Authorization = resp
            resolve($axios(originalRequest))
          })
          console.log('stay on page!!!')
          return retryOriginalRequest
        }
      }
    } else {
      return error
    }
  })
}
