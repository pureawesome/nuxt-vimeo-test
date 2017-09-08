import Vuex from 'vuex'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      data: [],
      videos: [],
      tags: []
    },
    actions: {
      LOAD_DATA: function ({ commit }) {
        axios.get(`http://localhost:3000/yola.json`).then((res) => {
          commit('SET_DATA', { videos: res.data.data })
        }, (err) => {
          console.log(err)
        })
      }
    },
    mutations: {
      SET_DATA: (state, { videos }) => {
        console.log(videos)
        state.data = videos
        state.videos = videos.map((video) => video.clip)
        state.tags = videos.map((video) => video.clip.tags)
          .reduce((a, b) => a.concat(b))
          .reduce((x, y) => x.findIndex(e => e.canonical === y.canonical) < 0 ? [...x, y] : x, [])
          .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
      }
    },
    getters: {
      getTags: state => {
        return state.data
          .map((video) => video.clip.tags)
          .reduce((a, b) => a.concat(b))
          .reduce((x, y) => x.findIndex(e => e.canonical === y.canonical) < 0 ? [...x, y] : x, [])
          .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
      },
      getVideosByTag: (state) => (tagParam) => {
        return state.data
          .map((video) => video.clip)
          .filter((video) => video.tags.filter(tag => (tag.canonical === tagParam)).length ? 1 : 0)
      },
      getVideoByID: (state) => (idParam) => {
        // data.data.map((video) => video.clip)
        return state.data
          .map((video) => video.clip)
          .filter(video => (video.uri.indexOf(idParam) !== -1))
      }
    },
    modules: {

    }
  })
}

export default store
