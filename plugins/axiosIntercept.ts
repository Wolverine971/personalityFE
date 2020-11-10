export default function({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    const accessToken = store.getters.getAccessToken
    if (accessToken) {
      config.headers.common.Authorization = accessToken
    }
  })
  $axios.onError(async (error) => {
    if (error.response.status === 500) {
      redirect('/auth')
    }
    console.log('error')
    if (error.response && error.response.status === 403) {
      console.log('jwt expired')
      const refreshToken = store.$auth.$storage._state['_token.local']

      if (!refreshToken) {
        console.log('redirecting1!!!')
        return redirect('/auth')
      } else {
        const resp = await store.dispatch('getAccessToken', refreshToken)
        if (!resp) {
          console.log('redirecting2!!!')
          return redirect('/auth')
        } else {
          console.log('stay on page!!!')
        }
      }
    }
  })
}
