import Vue from 'vue'
import Vuex from 'vuex'

import { endpoints } from '../models/endpoints'
import { getQuestionsFromData } from '~/utils'
import { ContentPost } from '~/models/interfaces'

Vue.use(Vuex)
export interface AppState {
  user: any

  userALT: null

  accessToken: string

  allQuestions: any

  dashboard: any

  allQuestionsLastDate: string

  allQuestionsCount: number

  refreshDashboard: boolean

  newQuestions: any

  subscriptions: any[]

  posts: any

  askedQuestions: any

  notifications: any[]
}
// STATE
export const state: AppState = {
  user: null,

  userALT: null,

  accessToken: '',

  allQuestions: null,

  dashboard: null,

  allQuestionsLastDate: '',

  allQuestionsCount: 0,

  refreshDashboard: false,

  newQuestions: null,

  subscriptions: [],

  posts: null,

  askedQuestions: null,

  notifications: []
}

export const getters = {
  isAuthenticated (state: AppState) {
    return !!state.user
  },
  loggedUser (state: AppState) {
    return state.user
  },
  getAccessToken (state: AppState) {
    return state.accessToken
  },
  getUser (state: AppState) {
    return state.user
  },
  getAllQuestions (state: AppState) {
    return state.allQuestions
  },

  getDashboard (state: AppState) {
    return state.dashboard
  },
  getAllQuestionsLastDate (state: AppState) {
    return state.allQuestionsLastDate
  },
  getAllQuestionsCount (state: AppState) {
    return state.allQuestionsCount
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
  }
}

// MUTATIONS
export const mutations = {
  user (state: AppState, user: null) {
    state.user = user
  },
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
    state.allQuestions = Object.assign({}, moreQuestions, state.allQuestions)
  },
  setDashboard (state: AppState, subscriptions: any[]) {
    state.dashboard = subscriptions
  },
  setAllQuestionsLastDate (state: AppState, lastDate: string) {
    state.allQuestionsLastDate = lastDate
  },
  setAllQuestionsCount (state: AppState, count: number) {
    state.allQuestionsCount = count
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
  setPosts (state: AppState, postContent: { type: ContentPost}) {
    if (!state.posts) {
      state.posts = {}
    }
    state.posts = Object.assign({}, state.posts, postContent)
  },
  setAskedQuestions (state: AppState, askedQuestions: any) {
    state.askedQuestions = askedQuestions
  },
  SOCKET_notifications (state: AppState, notifications: any[]) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(notifications)
    state.notifications = notifications
  }
}

// ACTIONS
export const actions: any = {
  async login ({ commit, dispatch }: any, user: { email: any; password: any }) {
    try {
      const data: any = await this.$auth.loginWith('local', { data: user })
      if (data.data) {
        this.$auth.setUserToken(data.data.refreshToken)
        this.$auth.setUser(data.data.user)
        commit('setUser', data.data.user)
        commit('setAccessToken', data.data.accessToken)

        return true
      } else {
        // console.log(data.response.data)
        dispatch('toastError', data.response.data)
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },

  getAccessToken ({ commit }: any, refreshToken: string): any {
    console.log('$store call to get access token')
    if (!refreshToken) {
      console.log('failed to pass refreshToken in $store')
      return false
    } else {
      return this.$axios
        .$get(endpoints.refreshTokenRoute + refreshToken)
        .then((data: any) => {
          if (!data.accessToken) {
            console.log('getaccessToken false 1')
            return false
          } else {
            console.log('gotAccessToken')
            this.$auth.setUserToken(data.refreshToken)
            this.$auth.setUser(data.user)
            commit('setUser', data.user)
            commit('setAccessToken', data.accessToken)

            return data.accessToken
          }
        })
        .catch((error: Error) => {
          console.log(error)
          console.log('getaccessToken false 2')
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
  toastError ({ commit }: any, text: string) {
    if (commit) {
      this.$toast.error(text, {
        theme: 'toasted-primary',
        position: 'top-right',
        duration: 3000
      })
    }
  },

  getUser ({ commit }: any) {
    return this.$axios.$get(endpoints.refreshTokenRoute).then((data: any) => {
      if (data) {
        commit('setUser', data.user)
      }
    })
  },
  getPaginatedQuestions ({ commit, getters }: any, pageSize: number) {
    let lastDate = getters.getAllQuestionsLastDate
    console.log('getPaginatedQuestions')
    return this.$axios
      .get(`${endpoints.getAllQuestions}/${pageSize}/${lastDate || ''}`)
      .then((response: any) => {
        if (response && response.data) {
          lastDate =
            response.data.questions[response.data.questions.length - 1].dateCreated
          commit('setAllQuestionsLastDate', lastDate)
          commit('addAllQuestions', response.data.questions)
          commit('setAllQuestionsCount', response.data.count)
        }
      })
  },
  async nuxtServerInit ({ dispatch }: any, { $auth }: any) {
    const refreshToken = $auth.getToken('local')
    if (!refreshToken) {
      // console.log('nuxt server init')
      // return redirect('/auth')
    } else {
      await dispatch('getAccessToken', refreshToken)
    }
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
          dispatch('toastError', 'Failed To Get Posts')
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
