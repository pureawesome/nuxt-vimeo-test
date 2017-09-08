<template>
  <nav>
    <div class="links">
      <span v-for="menu_item in menu">
        <nuxt-link :to="menu_item.canonical">{{menu_item.name}}</nuxt-link>
      </span>
    </div>
  </nav>
</template>


<script>
import axios from 'axios'

export default {
  data: () => ({
    menu: [],
    active: undefined,
    errors: []
  }),
  async created () {
    try {
      const response = await axios.get(`http://localhost:3000/yola.json`)
      this.menu = response.data.data.map((video) => video.clip.tags).reduce((a, b) => a.concat(b)).reduce((x, y) => x.findIndex(e => e.canonical === y.canonical) < 0 ? [...x, y] : x, []).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>

<style>
  .links a {
    display: inline-block;
    width: 100%;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
    border-bottom: 1px solid #3b8070;
  }

  .links a.nuxt-link-active {
    background: #3b8070;
    color: #fff;
  }

  nav {
    width: 200px;
    overflow: scroll;
    max-height: 100vh;
  }

</style>
