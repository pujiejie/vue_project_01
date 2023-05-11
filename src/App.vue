<template>
  <div id="app">
    <button @click="fn">测试VueX</button>
    <router-view />
  </div>
</template>


<script>

export default {
  methods: {
    fn() {
      this.$store.dispatch('getUserProfile')
    }
  }
}
</script>

<style>
#app,
body,
html {
  height: 100%;
}
</style>
