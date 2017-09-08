<template>
  <section class="container">
    <div class="content">
      <h2 class="subtitle">
        {{video[0].name}}
      </h2>
      <div class="video" v-html="video[0].embed.html"></div>
      <div class="back">
        <a v-on:click="goBack">
          Back
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  transition: 'video',
  methods: {
    goBack: () => {
      window.history.go(-1)
    }
  },

  async asyncData ({ params }) {
    let { data } = await axios.get(`http://localhost:3000/yola.json`)
    let video = data.data.map((video) => video.clip).filter(video => (video.uri.indexOf(params.video) !== -1))
    return { video: video, test: params }
  }
}
</script>

<style>
  .content {
    display: flex;
    flex-flow: column;
    max-height:100vh;
  }

  .subtitle {
    flex: 0 0;
  }

  .video {
    flex: 1 1;
    position: relative;
  }

  /*.video::before {
    padding-top: 56.25%;
    content: '';
    display: block;
  }*/

  .back {
    flex: 0 0 150px;
    justify-content: flex-end;
    align-items: center;
  }

  iframe {
    width: auto !important;
    height: auto !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .video-enter, .video-leave-to {
    transform: translate3d(0, -100%, 0);
  }

  .video-enter-active {
    animation: acrossIn 1s ease-in both;
  }

  .video-leave-active {
    animation: acrossOut 1s ease-in both;
  }

  @keyframes acrossIn {
    0% {
      transform: translate3d(0, -100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes acrossOut {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
