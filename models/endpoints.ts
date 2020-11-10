// tslint:disable prettier

export const endpoints = {
  // es
  searchESRoute: '/api/es/search',
  searchForTextUrl: '/api/es/searchIndex',
  streamImagesUrl: '/api/es/streamImages',
  catIndicies: '/api/es/catIndicies',
  pythonDoc: '/getTripples/doc',
  paginatedSearch: '/api/es/paginatedSearch',

  // scrape
  scrapeSentencesRoute: '/api/Scrape/Site',
  scrapeAllRoute: '/api/Scrape/All',
  storeSingleScrapingRoute: '/api/Scrape/Store',
  storeArrayOfScrapingsRoute: '/api/Scrape/StoreArr',
  storeALLScrapingsRoute: '/api/Scrape/storeAll',
  storeMultiplePages: '/api/Scrape/StoreMultiplePages',

  // questions
  questionTypeAheadRoute: '/api/question/typeAhead',
  questionAdd: '/api/question/add',
  getAllQuestions: '/api/question/all',
  likeQuestion: '/api/question/like',
  getQuestion: '/api/question',
  subQuestion: '/api/question/subscribe',

  addComment: '/api/comment/add',
  getComment: '/api/comment',
  likeComment: '/api/comment/like',

  // dashboard
  getDashboard: '/api/dashboard',

  // user
  loginRoute: '/api/user/login',
  registerRoute: '/api/user/register',
  forgotPasswordRoute: '/api/user/forgotPassword',
  logoutRoute: '/api/user/logout',
  refreshTokenRoute: '/api/user/refresh_token/',
  updateUserRoute: '/api/user/updateOne',
  getUserRoute: '/api/user/getOne'

}
