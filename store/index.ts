import { getQuestionsFromData } from '~/utils'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { endpoints } from '../models/endpoints'

Vue.use(Vuex)
export interface AppState {
  user: any

  userALT: null

  accessToken: string

  allQuestions: any

  dashboard: any

  allQuestionsCursorId: string

  allQuestionsCount: number

  refreshDashboard: boolean

  newQuestions: any

  subscriptions: any[]

  posts: any
}
// STATE
export const state = {
  user: null,

  userALT: null,

  accessToken: '',

  allQuestions: null,

  dashboard: null,

  allQuestionsCursorId: null,

  allQuestionsCount: 0,

  refreshDashboard: false,

  newQuestions: null,

  subscriptions: [],

  posts: null,
}

// export type RootState = ReturnType<typeof state>

export const getters = {
  isAuthenticated(state: AppState) {
    return !!state.user
  },
  loggedUser(state: AppState) {
    return state.user
  },
  getAccessToken(state: AppState) {
    return state.accessToken
  },
  getUser(state: AppState) {
    return state.user
  },
  route(state: AppState) {
    return axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: state.accessToken,
      },
    })
  },
  getAllQuestions(state: AppState) {
    return state.allQuestions
  },

  getDashboard(state: AppState) {
    return state.dashboard
  },
  getAllQuestionsCursorId(state: AppState) {
    return state.allQuestionsCursorId
  },
  getAllQuestionsCount(state: AppState) {
    return state.allQuestionsCount
  },
  getRefreshDashboard(state: AppState) {
    return state.refreshDashboard
  },
  getNewQuestions(state: AppState) {
    if (state.newQuestions && state.newQuestions.hits) {
      return getQuestionsFromData(state.newQuestions.hits.hits)
    } else {
      return []
    }
  },
  getSubscriptions(state: AppState) {
    return state.subscriptions
  },
  getPosts(state: AppState) {
    return state.posts
  },
}

// MUTATIONS
export const mutations = {
  user(state: AppState, user: null) {
    state.user = user
  },
  setUser(state: AppState, user: any) {
    state.user = user
  },
  setAccessToken(state: AppState, token: string) {
    state.accessToken = token
  },
  addAllQuestions(state: AppState, questions: any[]) {
    if (!state.allQuestions) {
      state.allQuestions = {}
    }
    // state.allQuestions = Object.assign({}, state.allQuestions, questions)
    const moreQuestions: any = {}
    questions.forEach((q: any) => {
      moreQuestions[q.id] = Object.assign({}, q)
    })
    state.allQuestions = Object.assign({}, moreQuestions, state.allQuestions)
    if (state.allQuestionsCount) {
      state.allQuestionsCount = state.allQuestionsCount + questions.length
    }
  },
  setDashboard(state: AppState, subscriptions: any[]) {
    state.dashboard = subscriptions
  },
  setAllQuestionsCursorId(state: AppState, cursorId: string) {
    state.allQuestionsCursorId = cursorId
  },
  setAllQuestionsCount(state: AppState, count: number) {
    state.allQuestionsCount = count
  },
  setRefreshDashboard(state: AppState, tF: boolean) {
    state.refreshDashboard = tF
  },
  setNewQuestions(state: AppState, newQuestions: any) {
    state.newQuestions = newQuestions
  },
  setSubscriptions(state: AppState, subscriptions: any[]) {
    state.subscriptions = subscriptions
  },
  setPosts(state: AppState, posts: any) {
    if (!state.posts) {
      state.posts = {}
    }
    // state.allQuestions = Object.assign({}, state.allQuestions, questions)
    const morePosts: any = {
      [posts.type]: posts.data,
    }
    // posts.data.forEach((q: any) => {
    //   morePosts[posts.type] = Object.assign({}, q)
    // })
    state.posts = Object.assign({}, morePosts, state.posts)
  },
}

// ACTIONS
export const actions = {
  async login({ commit }: any, user: { email: any; password: any }) {
    const data = await this.$auth.loginWith('local', { data: user })
    console.log('login refresh: ' + data.data.refreshToken)
    console.log('login access: ' + data.data.accessToken)

    this.$auth.setUserToken(data.data.refreshToken)
    this.$auth.setUser(data.data.user)
    commit('setAccessToken', data.data.accessToken)

    return true
  },

  getAccessToken({ commit }: any, refreshToken: string): any {
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
            console.log('getAccessToken refresh: ' + data.refreshToken)
            console.log('getAccessToken access: ' + data.accessToken)

            this.$auth.setUserToken(data.refreshToken)
            this.$auth.setUser(data.user)
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

  toastSuccess({ commit }: any, text: string) {
    this.$toast.success(text, {
      theme: 'toasted-primary',
      position: 'top-right',
      duration: 3000,
    })
  },
  toastError({ commit }: any, text: string) {
    this.$toast.error(text, {
      theme: 'toasted-primary',
      position: 'top-right',
      duration: 3000,
    })
  },

  getUser({ commit }: any) {
    return this.$axios.$get(endpoints.refreshTokenRoute).then((data: any) => {
      if (data) {
        commit('setUser', data.user)
      }
    })
  },
  getPaginatedQuestions({ commit, getters }: any, pageSize: number) {
    // :pageSize/:cursorId
    let cursorId = getters.getAllQuestionsCursorId
    console.log('getPaginatedQuestions')
    return this.$axios
      .get(`${endpoints.getAllQuestions}/${pageSize}/${cursorId || ''}`)
      .then((response: any) => {
        if (response && response.data) {
          cursorId =
            response.data.questions[response.data.questions.length - 1].id
          commit('setAllQuestionsCursorId', cursorId)
          commit('addAllQuestions', response.data.questions)
          commit('setAllQuestionsCount', response.data.count)
        }
      })
  },
  async nuxtServerInit({ dispatch }: any, { $auth, redirect }: any) {
    const refreshToken = $auth.getToken('local')
    if (!refreshToken) {
      console.log('nuxt server init')
      return redirect('/auth')
    } else {
      await dispatch('getAccessToken', refreshToken)
    }
  },
  getDashboard({ commit }: any): any {
    return this.$axios.get(endpoints.getDashboard).then((resp: any) => {
      if (resp && resp.data) {
        console.log('got dashboard')
        commit('setNewQuestions', resp.data.newQuestions)
        commit('setSubscriptions', resp.data.subscriptions)
      }
    })
  },
  getPosts({ commit }: any, type: string): any {
    return this.$axios
      .get(`${endpoints.getPosts}/${type}`)
      .then((resp: any) => {
        if (resp && resp.data) {
          commit('setPosts', { type, data: resp.data })
          // commit('setSubscriptions', resp.data.subscriptions)
        }
      })
  },
}

const createStore = () =>
  new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
  })
export const localInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000/',
  },
  withCredentials: true,
})

export default createStore
