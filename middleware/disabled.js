export default function ({ redirect }) {
  console.log('not allowed')
  return redirect('/auth/login')
}
