<template>
  <section class="container">
    <div class="nav-wrapper">
      <Navigation />
    </div>
    <div class="content">
      <logo/>
      <h1 class="title">
        awfranks-nuxt
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="video_list">
        <ul>
          <li v-for="video in videos">
            <nuxt-link :to="video.uri">
              <img :src="video.pictures.sizes[2].link" :alt="video.name ? video.name : 'No Name'" />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navigation from '~/components/Navigation.vue'
import axios from 'axios'

export default {
  components: {
    Logo,
    Navigation
  },
  transition (to, from) {
    if ((from && from.name === 'videos-video') || (to && to.name === 'videos-video')) return 'video'
  },
  async asyncData () {
    // let test = axios.get('http://localhost:3000/yola.json')
    //   .then((res) => {
    //     return res.data.data.map((video) => {
    //       return video.clip.uri
    //     })
    //   })
    // console.log(test)

    let { data } = await axios.get(`http://localhost:3000/yola.json`)
    let videos = data.data.map((video) => video.clip)
    let tags = data.data.map((video) => video.clip.tags).reduce((a, b) => a.concat(b)).reduce((x, y) => x.findIndex(e => e.canonical === y.canonical) < 0 ? [...x, y] : x, []).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
    return { videos: videos, menu: tags }
  }
}
</script>

<style>
.video_list li {
  list-style: none;
  display: inline-block;
}
</style>
