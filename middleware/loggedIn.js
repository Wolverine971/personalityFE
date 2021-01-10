
export default function ({ redirect, $auth }) {
  console.log('must be logged in')
  if (!$auth.loggedIn) {
    console.log('redirecting must be logged in')
    return redirect('/auth')
  }
}
