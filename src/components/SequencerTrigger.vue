<template lang="jade">
  div.sequencer-trigger
    div.sequencer-trigger__button
    led
    div.sequencer-trigger__label( v-bind:class="isFourth" )
      {{ step }}
</template>

<script>
  import Led from './Led.vue'

  export default {
    components: { Led },
    props: {
      step: {
        type: Number,
        default: 1
      }
    },
    computed: {
      isFourth: function () {
        return {
          'sequencer-trigger__label--fourth': this.step % 4 === 1
        }
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .sequencer-trigger {
    display: inline-block;
    margin: 0.5em;

    &__button {
      width: 2em;
      height: 2em;
      border: 1px solid #3d3d3d;
      border-radius: 50%;
      background-color: #111;
      cursor: pointer;

      &:hover {
        background-color: #222;
      }

      &:active {
        background-color: #333;
        border-color: transparent;
      }
    }

    &__label {
      margin: 0.7em auto 0;
      padding: 0.2em 0em;
      width: 1.8em;
      height: 1.8em;
      line-height: 1.3em;
      font-size: 0.6em;
      border-radius: 50%;
      color: #ccc;
      text-align: center;
      cursor: default;
      user-select: none;

      &--fourth {
        color: #000;
        background-color: #ccc;
      }
    }

    .led {
      margin: 0.4em auto 0;
    }
  }
</style>
