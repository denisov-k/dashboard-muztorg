<template>
  <div id="app">
    <router-view name="header" :title="title"></router-view>
    <transition name="app-router-fade" mode="out-in">
      <router-view :key="defaultViewKey"></router-view>
    </transition>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        navigationIsHide: false,

      }
    },
    computed: {
      defaultViewKey: function() {
        return this.$route.name;
      },
      title: function() {
        return this.$route.meta.title
      }
    },
    created: function () {

    },
    mounted() {

    }
  }
</script>

<style src="flexboxgrid/dist/flexboxgrid.min.css"></style>
<style>
  html, body {
    height: 100%;
  }
  body {
    margin: auto;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .page-content {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    padding-top: 5px;
  }

  .row {
    margin: 0;
    width: 100%;
  }
</style>
