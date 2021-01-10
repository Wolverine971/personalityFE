export default async function ({ store, redirect, $auth }) {
  console.log('access-token check')
  const accessToken = store.getters.getAccessToken
  if (!accessToken) {
    const refreshToken = $auth.getToken('local')
    if (!refreshToken) {
      console.log('access-token check fail redirecting!!!')
      // return redirect('/auth')
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
}
