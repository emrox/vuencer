<template lang="jade">
  .tempo
    .tempo__display
      {{ tempo }}
    led
</template>

<script>
  import Led from './Led.vue'

  export default {
    components: { Led },
    props: {
      tempo: {
        type: Number,
        default: 120
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  .tempo {
    display: inline-block;
    padding: 0.5em 1em;
    border: 1px solid #333;

    &__display {
      display: inline-block;
      font-family: 'VT323', monospace;
      font-size: 2em;
      color: #fff;
    }

    .led {
      display: inline-block;
      vertical-align: super;
      margin: 0 0 0 0.5em;
    }
  }
</style>
