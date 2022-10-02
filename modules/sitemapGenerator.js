import axios from 'axios'
export default function () {
  const assignPriority = (routes) => {
    // return routes
    const date = new Date()
    const pages = []

    routes.forEach((page) => {
      if (page.includes('/')) {
        pages.push({
          changefreq: 'weekly',
          lastmod: date,
          priority: 1.0,
          url: page
        })
        return
      }
      if (page.includes('questions')) {
        pages.push({
          changefreq: 'weekly',
          lastmod: date,
          priority: 1.0,
          url: page
        })
        return
      }
      if (page.includes('blog')) {
        pages.push({
          changefreq: 'weekly',
          lastmod: date,
          priority: 0.51,
          url: page
        })
      } else {
        pages.push(page)
      }
    })

    return pages
  }

  this.nuxt.hook('generate:done', async (context) => {
    const allQuestions = await axios.get(`${process.env.BE_URL}/api/question/all`)
    const routes = allQuestions.data.map((e) => {
      return `/questions/${e.url}`
    })
    const routesToExclude = [
      '/admin',
      '/auth',
      '/auth/ForgotPassword',
      '/Meetup',
      '/personality',
      '/personality/1',
      '/personality/2',
      '/personality/3',
      '/personality/4',
      '/personality/5',
      '/personality/6',
      '/personality/7',
      '/personality/8',
      '/personality/9',
      '/Profile',
      '/relationships',
      '/questions/DeepSearch'
    ] // Add any route you don't want in your sitemap. Potentially get this from an .env file.
    const allRoutes = Array.from(context.generatedRoutes)
    const filteredRoutes = allRoutes.filter(route => !routesToExclude.includes(route))
    const prioritizedRoutes = assignPriority(routes.concat(filteredRoutes))
    console.log('generate routes')

    this.nuxt.options.sitemap.routes = [...prioritizedRoutes]
  })
}
