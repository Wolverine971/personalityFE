// import { uuid } from 'vue-uuid'
export default async function ({ store, $9tcookie, $axios }) {
  // console.log('must be logged in')
  const user = store.state.auth.user
  if (!user) {
    const refreshToken = $9tcookie.get('9tcookie')
    if (refreshToken) {
      // $axios.setHeader('Authorization', refreshToken)
      $axios.defaults.headers.Authorization = refreshToken
      await store.dispatch('refreshToken')
    } else {
      await store.dispatch('setAnonymous')

      // const cookie = `${process.env.RANDO_PREFIX}${uuid.v1()}`
      // // this.$axios.defaults.headers.Authorization = cookie
      // // $axios.setHeader('Authorization', cookie)
      // $axios.defaults.headers.Authorization = cookie
      // $axios.setToken(cookie)

      // $9tcookie.set('9tAnonymous', cookie, {
      //   path: '/',
      //   maxAge: 100 * 60 * 60 * 24 * 7,
      // })
      // $axios.setHeader('Authorization', cookie)
    }
    // this.$axios.setHeader('Authorization', refreshToken)
    // await store.dispatch('getAccessToken', refreshToken)
  }

  // if (!store.getters.getUser) {
  //   console.log('redirecting must be logged in')
  //   return redirect('/auth')
  // }
}
