<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.$store.dispatch('LOAD_DATA')
  }
}
</script>

<style>

</style>
