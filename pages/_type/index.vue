<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        awfranks-nuxt
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a v-for="menu_item in menu">
          <nuxt-link :to="menu_item.canonical" class="button">{{menu_item.name}}</nuxt-link>
        </a>
      </div>

      <div class="video_list">
        <ul>
          <li v-for="video in videos">
            <nuxt-link :to="video.uri">
              <img :src="video.pictures.sizes[2].link" :alt="video.name" />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'

export default {
  components: {
    Logo
  },

  async asyncData ({ params }) {
    // let { menu } = await axios.get(`http://localhost:3000/types.json`)
    // let { videos } = await axios.get(`http://localhost:3000/video_list.json`)
    // return { menu: menu, videos: videos }
    // let { data } = await axios.get(`http://localhost:3000/cage.json`)
    let { data } = await axios.get(`http://localhost:3000/yola.json`)
    let tags = data.data.map((video) => video.clip.tags).reduce((a, b) => a.concat(b)).reduce((x, y) => x.findIndex(e => e.canonical === y.canonical) < 0 ? [...x, y] : x, []).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
    let videos = data.data.map((video) => video.clip).filter((video) => video.tags.filter(tag => (tag.canonical === params.type)).length ? 1 : 0)

    // let tags = 'test'
    // console.log(tags)

    // let category = data.map((movie) => movie.category).filter((elem, pos, arr) => arr.indexOf(elem) === pos)
    // console.log(category)
    // console.log(data)
    return { videos: videos, menu: tags }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.video_list li {
  list-style: none;
  display: inline-block;
}
</style>
