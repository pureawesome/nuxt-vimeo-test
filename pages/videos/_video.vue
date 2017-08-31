<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        awfranks-nuxt
      </h1>
      <h2 class="subtitle">
        {{video[0].name}}
      </h2>
      <div class="video" v-html="video[0].embed.html"></div>
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
    let video = data.data.map((video) => video.clip).filter(video => (video.uri.indexOf(params.video) !== -1))

    // let tags = 'test'
    // console.log(tags)

    // let category = data.map((movie) => movie.category).filter((elem, pos, arr) => arr.indexOf(elem) === pos)
    // console.log(category)
    // console.log(data)
    return { video: video, test: params }
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

.video {
  max-width: 100%;
}
</style>
