// tslint:disable prettier

export const endpoints = {
  // questions
  questionTypeAheadRoute: '/api/question/typeAhead',
  questionAdd: '/api/question/add',
  getAllQuestions: '/api/question/all',
  likeQuestion: '/api/question/like',
  getQuestion: '/api/question',
  getJustQuestion: 'api/question/single',
  subQuestion: '/api/question/subscribe',
  clearNotifications: '/api/question/notifications',

  addComment: '/api/comment/add',
  getComment: '/api/comment',
  likeComment: '/api/comment/like',

  getSortedComments: '/api/question/sort',

  postContent: '/api/content',
  getPosts: '/api/content/all',
  likeContent: '/api/content/like',
  // used to load more content and comments
  loadMoreContent: '/api/content/loadMore',

  // dashboard
  getDashboard: '/api/dashboard',

  // user
  loginRoute: '/api/user/login',
  registerRoute: '/api/user/register',
  resetRoute: '/api/user/reset',
  resetPassword: '/api/user/resetPassword',

  forgotPasswordRoute: '/api/user/forgotPassword',
  logoutRoute: '/api/user/logout',
  refreshTokenRoute: '/api/user/refresh_token/',
  updateUserRoute: '/api/user/updateOne',
  getUserRoute: '/api/user/getUser',

  userLeave: '/api/user/leave',
  userEnter: '/api/user/enter',
  login: '/api/user/login',
  logout: '/api/auth/logout'
}
