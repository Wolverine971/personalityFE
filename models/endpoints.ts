// tslint:disable prettier

export const endpoints = {
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

  getSortedComments: '/api/question/sort',

  postContent: '/api/content',
  getPosts: '/api/content/all',
  likeContent: '/api/content/like',

  // dashboard
  getDashboard: '/api/dashboard',

  // user
  loginRoute: '/api/user/login',
  registerRoute: '/api/user/register',
  forgotPasswordRoute: '/api/user/forgotPassword',
  logoutRoute: '/api/user/logout',
  refreshTokenRoute: '/api/user/refresh_token/',
  updateUserRoute: '/api/user/updateOne',
  getUserRoute: '/api/user/getUser',
}
