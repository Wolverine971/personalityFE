export default function ({ $axios, redirect, store, $9tcookie }: any) {
  $axios.onRequest((config: any) => {
    const accessToken = store.getters.getAccessToken
    config.headers.common.Authorization = accessToken
  })
  $axios.onError(async (error: any) => {
    if (
      !error.isAxiosError &&
      error.response &&
      error.response.status === 500
    ) {
      redirect('/auth')
    } else if (error.response && error.response.status === 403) {
      const refreshToken = $9tcookie.get('9tcookie')

      if (!refreshToken) {
        console.log('no refresh token')
      } else {
        const {
          config
        } = error
        const originalRequest = config
        const resp = await store.dispatch('getAccessToken', refreshToken)
        console.log('intercept get token')
        if (!resp) {
          console.log('redirecting2!!!')
          return redirect('/auth')
        } else {
          const retryOriginalRequest = new Promise((resolve) => {
            originalRequest.headers.Authorization = resp
            resolve($axios(originalRequest))
          })
          return retryOriginalRequest
        }
      }
    } else {
      return error
    }
  })
}
