import { ContentPost } from '~/models/interfaces'
import { getQuestionsFromData } from '~/utils'
import Vue from 'vue'
import Vuex from 'vuex'

import { endpoints } from '../models/endpoints'

Vue.use(Vuex)
export interface AppState {
  user: any

  accessToken: string

  allQuestions: any

  allComments: any[]

  dashboard: any

  allQuestionsLastDate: string

  allCommentsSkipCount: number

  allQuestionsCount: number

  allCommentsCount: number

  refreshDashboard: boolean

  newQuestions: any

  subscriptions: any[]

  posts: any

  askedQuestions: any

  notifications: any[]

  users: any[]

  usersCount: number
}
// STATE
export const state: AppState = {
  user: null,

  accessToken: '',

  allQuestions: null,

  allComments: [],

  dashboard: null,

  allQuestionsLastDate: '',

  allCommentsSkipCount: 0,

  allQuestionsCount: 0,

  allCommentsCount: 0,

  refreshDashboard: false,

  newQuestions: null,

  subscriptions: [],

  posts: null,

  askedQuestions: null,

  notifications: [],

  users: [],

  usersCount: 0
}

export const getters = {
  getAccessToken (state: AppState) {
    return state.accessToken
  },
  getUser (state: AppState) {
    return state.user
  },
  getAllQuestions (state: AppState) {
    return state.allQuestions
  },

  getAllComments (state: AppState) {
    return state.allComments
  },

  getDashboard (state: AppState) {
    return state.dashboard
  },
  getAllQuestionsLastDate (state: AppState) {
    return state.allQuestionsLastDate
  },

  getAllCommentsSkipCount (state: AppState) {
    return state.allCommentsSkipCount
  },
  getAllQuestionsCount (state: AppState) {
    return state.allQuestionsCount
  },

  getAllCommentsCount (state: AppState) {
    return state.allCommentsCount
  },
  getRefreshDashboard (state: AppState) {
    return state.refreshDashboard
  },
  getNewQuestions (state: AppState) {
    if (state.newQuestions && state.newQuestions.hits) {
      return getQuestionsFromData(state.newQuestions.hits.hits)
    } else {
      return []
    }
  },
  getSubscriptions (state: AppState) {
    return state.subscriptions
  },
  getPosts (state: AppState) {
    return state.posts
  },
  getAskedQuestions (state: AppState) {
    if (state.askedQuestions && state.askedQuestions.hits) {
      return getQuestionsFromData(state.askedQuestions.hits.hits)
    } else {
      return []
    }
  },
  getNotifications (state: AppState) {
    return state.notifications
  },
  getRole (state: AppState) {
    if (state.user) {
      return state.user.role
    } else {
      return null
    }
  },
  getAllUsers (state: AppState) {
    return state.users
  },
  getAllUsersCount (state: AppState) {
    return state.usersCount
  }
}

// MUTATIONS
export const mutations = {
  setUser (state: AppState, user: any) {
    state.user = user
  },
  setAccessToken (state: AppState, token: string) {
    state.accessToken = token
  },
  addAllQuestions (state: AppState, questions: any[]) {
    if (!state.allQuestions) {
      state.allQuestions = {}
    }
    const moreQuestions: any = {}
    questions.forEach((q: any) => {
      moreQuestions[q.id] = Object.assign({}, q)
    })
    const lastDate = questions[questions.length - 1].dateCreated
    state.allQuestionsLastDate = lastDate
    state.allQuestions = Object.assign({}, state.allQuestions, moreQuestions)
  },
  addAllComments (state: AppState, comments: any[]) {
    if (!state.allComments) {
      state.allComments = []
    }
    state.allCommentsSkipCount += 10
    state.allComments = [...state.allComments, ...comments]
  },
  replaceAllComments (state: AppState, comments: any[]) {
    if (!state.allComments) {
      state.allComments = []
    }
    state.allComments = [...comments]
  },
  setDashboard (state: AppState, subscriptions: any[]) {
    state.dashboard = subscriptions
  },
  setAllQuestionsCount (state: AppState, count: number) {
    state.allQuestionsCount = count
  },

  setAllCommentsCount (state: AppState, count: number) {
    state.allCommentsCount = count
  },
  setRefreshDashboard (state: AppState, tF: boolean) {
    state.refreshDashboard = tF
  },
  setNewQuestions (state: AppState, newQuestions: any) {
    state.newQuestions = newQuestions
  },
  setSubscriptions (state: AppState, subscriptions: any[]) {
    state.subscriptions = subscriptions
  },
  setPosts (state: AppState, postContent: { type: ContentPost }) {
    if (!state.posts) {
      state.posts = {}
    }
    state.posts = Object.assign({}, state.posts, postContent)
  },
  setAskedQuestions (state: AppState, askedQuestions: any) {
    state.askedQuestions = askedQuestions
  },
  SOCKET_notifications (state: AppState, notifications: any[]) {
    state.notifications = notifications
  },
  addAllUsers (state: AppState, users: any[]) {
    state.users = [...state.users, ...users]
  },
  setAllUsersCount (state: AppState, count: number) {
    state.usersCount = count
  }
}

// ACTIONS
export const actions: any = {
  async login ({ commit, dispatch }: any, user: { email: any; password: any }) {
    try {
      const data: any = await this.$axios.post(endpoints.login, user)
      if (data.data) {
        commit('setUser', data.data.user)
        commit('setAccessToken', data.data.accessToken)

        this.$9tcookie.set('9tcookie', data.data.refreshToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })

        return true
      } else {
        if (data.response && data.response.data) {
          dispatch('toastError', 'Login Fail')
        } else {
          dispatch('toastError', 'Login Fail')
        }
        commit('setUser', null)
        commit('setAccessToken', null)
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },

  getAccessToken ({ commit }: any, refreshToken: string): any {
    if (!refreshToken) {
      commit('setUser', null)
      commit('setAccessToken', null)
      return false
    } else {
      return this.$axios
        .$get(endpoints.refreshTokenRoute + refreshToken)
        .then((data: any) => {
          if (!data.accessToken) {
            commit('setUser', null)
            commit('setAccessToken', null)
            return false
          } else {
            this.$9tcookie.set('9tcookie', data.refreshToken, {
              path: '/',
              maxAge: 60 * 60 * 24 * 7
            })
            commit('setUser', data.user)
            commit('setAccessToken', data.accessToken)

            return data.accessToken
          }
        })
        .catch((error: Error) => {
          console.log(error)
          console.log('getAccessToken false 2')
          commit('setUser', null)
          commit('setAccessToken', null)
          return false
        })
    }
  },

  toastSuccess ({ commit }: any, text: string) {
    if (commit) {
      this.$toast.success(text, {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 3000
      })
    }
  },
  toastError ({ commit }: any, text: string, duration: number = 3000) {
    if (commit) {
      this.$toast.error(text, {
        theme: 'toasted-primary',
        position: 'top-right',
        duration
      })
    }
  },

  getUser ({ commit }: any) {
    return this.$axios.$get(endpoints.refreshTokenRoute).then((data: any) => {
      if (data && data.user) {
        commit('setUser', data.user)
      } else {
        commit('setUser', null)
      }
    })
  },
  getPaginatedQuestions ({ commit, getters }: any, pageSize: number) {
    const lastDate = getters.getAllQuestionsLastDate
    return this.$axios
      .get(`${endpoints.getAllQuestions}/${pageSize}/${lastDate || ''}`)
      .then((resp: any) => {
        if (resp && resp.data) {
          commit('addAllQuestions', resp.data.questions)
          commit('setAllQuestionsCount', resp.data.count)
        }
      })
  },

  getSortedPaginatedComments ({ commit, getters }: any, sortParams: any) {
    const commentSkipCount = getters.getAllCommentsSkipCount
    sortParams.skip = commentSkipCount || 0
    return this.$axios
      .post(`${endpoints.getSortedComments}/`, sortParams)
      .then((resp: any) => {
        if (resp && resp.data) {
          commit('addAllComments', resp.data.comments)
          commit('setAllCommentsCount', resp.data.count)
        }
      })
  },

  getPaginatedUsers ({ commit }: any, lastDate: any) {
    return this.$axios
      .get(`${endpoints.users}/${lastDate || ''}`)
      .then((resp: any) => {
        commit('addAllUsers', resp.data.users)
        commit('setAllUsersCount', resp.data.count)
      })
  },
  async nuxtServerInit ({ dispatch }: any, { $9tcookie }: any) {
    const refreshToken = $9tcookie.get('9tcookie')
    await dispatch('getAccessToken', refreshToken)
  },
  getDashboard ({ commit }: any): any {
    return this.$axios.get(endpoints.getDashboard).then((resp: any) => {
      if (resp && resp.data) {
        commit('setNewQuestions', resp.data.newQuestions)
        commit('setAskedQuestions', resp.data.askedQuestions)
        commit('setSubscriptions', resp.data.subscriptions)
      }
    })
  },
  getPosts ({ commit, dispatch }: any, type: string): any {
    return this.$axios
      .get(`${endpoints.getPosts}/${type}`)
      .then((resp: any) => {
        if (resp && resp.data) {
          commit('setPosts', {
            [type]: resp.data
          })
          return true
        } else {
          dispatch('toastError', 'Must Login')
          return false
        }
      })
      .catch(() => {
        dispatch('toastError', 'Failed To Get Posts')
        return false
      })
  }
}

const createStore = () =>
  new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  })

export default createStore
