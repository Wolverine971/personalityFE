export default function ({ store, redirect }) {
  const role = store.getters.getRole
  if (role) {
    if (role === 'admin') {
      return true
    } else {
      return redirect('/auth')
    }
  } else {
    return redirect('/auth')
  }
}
