<template>
  <div id="app">
    <img src="./assets/logo.png">
    <vuencer />
  </div>
</template>

<script>
  import Vuencer from './components/Vuencer.vue';

  export default {
    components: { Vuencer },
    name: 'app',
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');
  @import url('https://fonts.googleapis.com/css?family=VT323');

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #222226;
  }

  #app {
    margin-top: 60px;
    text-align: center;
    font-family: 'Source Code Pro', monospace;
  }

  .font-terminal {
    font-family: 'VT323', monospace;
  }
</style>
