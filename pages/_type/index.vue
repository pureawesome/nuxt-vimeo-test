<template>
  <section class="container">
    <div class="nav-wrapper">
      <Navigation />
    </div>
    <div class="content">
      <logo/>
      <h1 class="title">
        <nuxt-link :to="'/'">awfranks-nuxt</nuxt-link>
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
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
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Logo,
    Navigation
  },
  computed: {
    videos: (context) => {
      return context.$store.getters.getVideosByTag(context.$route.params.type)
    }
  },
  methods: {

  },
  transition (to, from) {
    if (from && from.name === 'videos-video') return 'video'
  }
  // async asyncData ({ params }) {
  //   // let { data } = await axios.get(`http://localhost:3000/yola.json`)
  //   let subVideos = videos.map((video) => video.clip).filter((video) => video.tags.filter(tag => (tag.canonical === params.type)).length ? 1 : 0)
  //   return { videos: subVideos, menu: 'test' }
  // }
}
</script>

<style>.video_list li {
  list-style: none;
  display: inline-block;
}
</style>
