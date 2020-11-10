import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { endpoints } from '../models/endpoints'
import { EsIndex, Screenshot } from '../models/interfaces'
import { getQuestionsFromData } from '~/utils'
import {
  AllScrapings,
  IndividualSentence,
  ScrapedSentencesObj,
  Scraping
} from '~/models/interfaces'

Vue.use(Vuex)
export interface AppState {
  scrapeSentenceResults: null

  scrapeCurrentHighlight: AllScrapings | null

  user: any

  userALT: null

  selectedSentences: any[] | string

  word: string

  url: string

  storeSuccess: null

  ESHits: any[]

  esIndexes: EsIndex[]

  scrapeAllSectionsURL: null

  allUrl: null

  resultsBlock: any[]

  // sockets
  screenshot: Screenshot[]

  atag: AllScrapings[]

  scrapeAllDone: boolean

  searchingDone: boolean

  allScrapings: AllScrapings[]

  storeHighlightSuccessMessage: number

  accessToken: string

  allQuestions: any

  dashboard: any

  allQuestionsCursorId: string

  allQuestionsCount: number

  refreshDashboard: boolean

  newQuestions: any

  subscriptions: any[]
}
// STATE
export const state = {
  scrapeSentenceResults: null,

  scrapeCurrentHighlight: null,

  user: null,

  userALT: null,

  selectedSentences: [],

  word: '',

  url: '',

  storeSuccess: null,

  ESHits: [],

  esIndexes: [],

  scrapeAllSectionsURL: null,

  allUrl: null,

  resultsBlock: [],

  // sockets
  screenshot: [] as any[],

  atag: [] as any[],

  scrapeAllDone: false,

  searchingDone: false,

  allScrapings: [] as any[],

  storeHighlightSuccessMessage: 0,

  accessToken: '',

  allQuestions: null,

  dashboard: null,

  allQuestionsCursorId: null,

  allQuestionsCount: 0,

  refreshDashboard: false,

  newQuestions: null,

  subscriptions: []
}

// export type RootState = ReturnType<typeof state>

export const getters = {
  isAuthenticated (state: AppState) {
    return !!state.user
  },
  loggedUser (state: AppState) {
    return state.user
  },
  storeSuccess (state: AppState) {
    return state.storeSuccess
  },
  ESHits (state: AppState) {
    return state.ESHits
  },
  esIndexes (state: AppState) {
    if (state.esIndexes && state.esIndexes.length) {
      console.log('store cat indicies')
      return state.esIndexes.filter((i: any) => {
        if (i.index) {
          return i
        }
      })
    } else {
      return []
    }
  },
  scrapeSentenceResults (state: AppState) {
    return state.scrapeSentenceResults
  },
  scrapeCurrentHighlight (state: AppState) {
    return state.scrapeCurrentHighlight
  },
  scrapeAllSectionsURL (state: AppState) {
    return state.scrapeAllSectionsURL
  },
  allUrl (state: AppState) {
    if (state.allUrl) {
      return state.allUrl
    }
  },
  scrapeAllDone (state: AppState) {
    return state.scrapeAllDone
  },
  allScrapings (state: AppState): AllScrapings[] | undefined {
    return state.allScrapings
  },
  searchingDone (state: AppState) {
    return state.searchingDone
  },
  storeHighlightSuccessMessage (state: AppState) {
    return state.storeHighlightSuccessMessage
  },
  getAccessToken (state: AppState) {
    return state.accessToken
  },
  getUser (state: AppState) {
    return state.user
  },
  route (state: AppState) {
    return axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: state.accessToken
      }
    })
  },
  getAllQuestions (state: AppState) {
    return state.allQuestions
  },

  getDashboard (state: AppState) {
    return state.dashboard
  },
  getAllQuestionsCursorId (state: AppState) {
    return state.allQuestionsCursorId
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
  }
}

// MUTATIONS
export const mutations = {
  setScrapeSentenceResults (state: AppState, obj: null) {
    state.scrapeSentenceResults = obj
  },
  setCurrentHighlight (state: AppState, obj: AllScrapings) {
    state.scrapeCurrentHighlight = obj
  },
  SET_USER (state: AppState, user: null) {
    state.userALT = user || null
  },
  user (state: AppState, user: null) {
    state.user = user
  },
  setUrl (state: AppState, url: string) {
    state.url = url
  },
  setWord (state: AppState, word: string) {
    state.word = word
  },
  selectedSentencesChange (state: AppState, selectedSentences: string | any[]) {
    console.log('store selected sentences change')
    state.selectedSentences = selectedSentences
  },
  setStoreSuccessMessage (state: AppState, storeSuccess: null) {
    console.log('store success')
    state.storeSuccess = storeSuccess
  },
  ESHits (state: AppState, hits: any[]) {
    state.ESHits = hits
  },

  SOCKET_screenshot (state: AppState, screenshot: Screenshot) {
    console.log('client got screenshot')
    if (state.screenshot) {
      state.screenshot = [...state.screenshot, screenshot]
    } else {
      state.screenshot = [screenshot]
    }
  },
  SOCKET_atag (state: AppState, atag: AllScrapings) {
    console.log('client got aTag')
    if (state.atag) {
      state.atag = [...state.atag, atag]
    } else {
      state.atag = [atag]
    }
  },
  SOCKET_scrapeAllDone (state: AppState, tof: boolean) {
    console.log('done streaming')
    state.scrapeAllDone = tof
  },
  SOCKET_searchingDone (state: AppState, tof: boolean) {
    console.log('done streaming')
    state.searchingDone = tof
  },
  setEsIndexes (state: AppState, indexes: EsIndex[]) {
    state.esIndexes = indexes
  },
  setScrapeAllSectionsURL (state: AppState, url: null) {
    state.scrapeAllSectionsURL = url
  },
  setAllUrl (state: AppState, url: null) {
    state.allUrl = url
  },
  scrapeAllDone (state: AppState, status: boolean) {
    state.scrapeAllDone = status
  },
  setAllScrapings (state: AppState, scrapings: any) {
    state.allScrapings = [...scrapings]
  },
  pushAllScrapings (state: AppState, scrap: AllScrapings) {
    if (state.allScrapings) {
      state.allScrapings = [...state.allScrapings, scrap]
    } else {
      state.allScrapings = [scrap]
    }
  },
  setStoreHighlightSuccessMessage (state: AppState) {
    state.storeHighlightSuccessMessage = Math.random()
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
  setDashboard (state: AppState, subscriptions: any[]) {
    state.dashboard = subscriptions
  },
  setAllQuestionsCursorId (state: AppState, cursorId: string) {
    state.allQuestionsCursorId = cursorId
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
  }
}

// ACTIONS
export const actions = {
  scrapeSentences (
    { commit }: any,
    scrapeRequest: {
      website: any
      word: any
    }
  ) {
    this.$axios
      .$post(endpoints.scrapeSentencesRoute, scrapeRequest)
      // .scrapeSentences(scrapeRequest)
      .then((data: any) => {
        if (data && data.result) {
          commit('setScrapeSentenceResults', data.result.body)
          console.log('scrape Sentences ' + data.result.body)
        } else {
          console.log('error scraping sentences')
        }
      })
      .catch((error: any) => console.log(error))
  },
  scrapeAll ({ commit }: any, scrapeRequest: { website: any }) {
    commit('setAllUrl', scrapeRequest.website)
    commit('setScrapeAllSectionsURL', scrapeRequest.website)
    this.$axios
      .$post(endpoints.scrapeAllRoute, scrapeRequest)

      .then((data: AllScrapings) => {
        if (data) {
          commit('setCurrentHighlight', data)
          commit('pushAllScrapings', data)
          commit('scrapeAllDone', data)
        }
      })
      .catch((error: any) => console.log(error))
  },
  storeHighlight ({ getters, commit }) {
    const allHighlights: Scraping[] = getters.scrapeCurrentHighlight.data
    const url = getters.allUrl // getters.scrapeCurrentHighlight.url

    console.log('store store all')
    allHighlights.forEach((element) => {
      element.url = url
      element.index = element.index ? element.index.toLowerCase() : 'error'
      this.$axios.$post(endpoints.storeALLScrapingsRoute, element)
    })
    commit('setStoreHighlightSuccessMessage', true)
    const scrappings: AllScrapings[] = getters.allScrapings
    const filteredScrappings = scrappings.filter(
      (scrap: AllScrapings) => url !== scrap.url
    )
    commit('setAllScrapings', filteredScrappings)
  },
  storeEverything ({ getters, commit }) {
    const realAll = getters.allScrapings
    console.log('store store all')
    let count = 0
    realAll.forEach((elem: AllScrapings) => {
      if (elem.data) {
        elem.data.forEach((element: Scraping) => {
          element.url = elem.url
          element.index = element.index ? element.index.toLowerCase() : 'error'
          this.$axios
            .$post(endpoints.storeALLScrapingsRoute, element)
            .then((data: any) => {
              console.log('dun' + count++ + 'data: ' + data.message)
            })
            .catch((error: any) => console.log(error))
        })
      }
    })
    commit('setStoreSuccessMessage', Math.random())
    commit('setAllScrapings', [])
    commit('setCurrentHighlight', [])
    commit('setUrl', '')
  },
  storeScrapings ({ state, commit }) {
    const storeRequest: ScrapedSentencesObj = {
      word: state.word?.toLowerCase(),
      body: {
        date: new Date(),
        url: state.url,
        sentences: state.selectedSentences
      }
    }
    console.log('storeing in elastic: ' + storeRequest)
    // api
    this.$axios
      .$post(endpoints.storeSingleScrapingRoute, storeRequest)
      .then((data: any) => {
        commit('setStoreSuccessMessage', data)
      })
      .catch((error: any) => console.log(error))
  },
  searchAllES ({ commit }: any, searchWord: string) {
    console.log('storeeeeeeeeeeeeeee')
    const searchRequest = {
      index: '_all',
      text: searchWord
    }
    // )
    console.log('searching in elastic: ' + searchWord)
    // api
    //   .searchAllES(searchRequest)
    this.$axios
      .$post(endpoints.searchESRoute, searchRequest)
      .then((data: any) => {
        commit('setStoreSuccessMessage', data.response)
      })
      .catch((error: any) => console.log(error))
  },

  getIndexes ({ commit }) {
    console.log('getting indexes')
    this.$axios
      .$get(endpoints.catIndicies)
      .then((data: EsIndex[]) => {
        commit('setEsIndexes', data)
      })
      .catch((error: any) => console.log(error))
  },
  storeTextArea ({ commit }, request: IndividualSentence) {
    console.log('storeing in elastic: ' + request)

    this.$axios
      .$post(endpoints.storeSingleScrapingRoute, request)
      .then((data: any) => {
        commit('setStoreSuccessMessage', data)
      })
      .catch((error: any) => console.log(error))
  },
  async login ({ commit }: any, user: { email: any; password: any }) {
    const data = await this.$auth.loginWith('local', { data: user })
    console.log('login refresh: ' + data.data.refreshToken)
    console.log('login access: ' + data.data.accessToken)

    this.$auth.setUserToken(data.data.refreshToken)
    this.$auth.setUser(data.data.user)
    commit('setAccessToken', data.data.accessToken)

    return true
  },

  getAccessToken ({ commit }: any, refreshToken: string) {
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
          console.log(error.stack)
          console.log('getaccessToken false 2')
          return false
        })
    }
  },

  toastSuccess ({ commit }: any, text: string) {
    this.$toast.success(text, {
      theme: 'toasted-primary',
      position: 'top-right',
      duration: 3000
    })
  },
  toastError ({ commit }: any, text: string) {
    this.$toast.error(text, {
      theme: 'toasted-primary',
      position: 'top-right',
      duration: 3000
    })
  },

  getUser ({ commit }: any) {
    return this.$axios.$get(endpoints.refreshTokenRoute).then((data: any) => {
      if (data) {
        commit('setUser', data.user)
      }
    })
  },
  getPaginatedQuestions ({ commit, getters }: any, pageSize: number) {
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
  async nuxtServerInit ({ dispatch }, { $auth, redirect }) {
    const refreshToken = $auth.getToken('local')
    if (!refreshToken) {
      console.log('nuxt server init')
      return redirect('/auth')
    } else {
      await dispatch('getAccessToken', refreshToken)
    }
  },
  getDashboard ({ commit }: any) {
    return this.$axios.get(`${endpoints.getDashboard}`).then((resp: any) => {
      if (resp && resp.data) {
        console.log('got dashboard')
        commit('setNewQuestions', resp.data.newQuestions)
        commit('setSubscriptions', resp.data.subscriptions)
      }
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
export const localInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000/'
  },
  withCredentials: true
})

export default createStore
