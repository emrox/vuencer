<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #222226;
  }

  #app {
    margin-top: 60px;
    text-align: center;
  }
</style>
