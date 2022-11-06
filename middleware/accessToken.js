export default async function ({ store, redirect, $9tcookie }) {
  // console.log('access-token check')
  const accessToken = store.getters.getAccessToken
  if (!accessToken) {
    const refreshToken = $9tcookie.get('9tcookie')
    if (!refreshToken) {
      // console.log('access-token check fail redirecting!!!')
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
