// tslint:disable prettier

export const endpoints = {
  // questions
  questionTypeAheadRoute: '/api/question/typeAhead',
  questionAdd: '/api/question/add',
  getAllQuestions: '/api/question/all',
  likeQuestion: '/api/question/like',
  getQuestion: '/api/question/one',
  getJustQuestion: 'api/question/single',
  subQuestion: '/api/question/subscribe',
  clearNotifications: '/api/question/notifications',
  updateQuestion: '/api/question/update',
  getUrl: '/api/question/getUrl',
  reIndex: '/api/question/reIndex',
  updateGraphQL: '/api/question/updateGraphQL',

  addComment: '/api/comment/add',
  getComment: '/api/comment',
  likeComment: '/api/comment/like',
  updateComment: '/api/comment/update',
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
  confirmRoute: '/api/user/confirm',

  forgotPasswordRoute: '/api/user/forgotPassword',
  logoutRoute: '/api/user/logout',
  refreshTokenRoute: '/api/user/refresh_token/',
  updateUserRoute: '/api/user/updateOne',
  getUserRoute: '/api/user/getUser',

  userLeave: '/api/user/leave',
  userEnter: '/api/user/enter',
  login: '/api/user/login',
  change: '/api/user/change',
  users: '/api/user/all',

  // Relationships
  relationship: '/api/relationship',
  likeThread: '/api/relationship/like',
  updateThread: '/api/relationship/update',

  // Blog
  createBlog: '/api/blog/create',
  updateBlog: '/api/blog/update',
  deleteBlog: '/api/blog/delete',
  likeBlog: '/api/blog/like',
  getBlogs: '/api/blog/get',
  getBlog: '/api/blog/getOne',

  getRando: '/api/rando'

}
