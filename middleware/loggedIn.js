
export default function ({ redirect, store }) {
  // console.log('must be logged in')
  if (!store.getters.getUser) {
    console.log('redirecting must be logged in')
    return redirect('/auth')
  }
}
