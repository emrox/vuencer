<template lang="jade">
  div.sequencer-trigger
    div.sequencer-trigger__button
    div.sequencer-trigger__state
    div.sequencer-trigger__label( v-bind:class="isFourth" )
      {{ step }}
</template>

<script>
  export default {
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

    &__state {
      margin: 0.4em auto 0;
      width: 0.4em;
      height: 0.4em;
      border: 1px solid #100;
      border-radius: 50%;
      background-color: #100;
      animation: sequencer-trigger__state__blink 1s steps(2, start) infinite;
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
  }

  @keyframes sequencer-trigger__state__blink {
    to {
      background-color: #f33;
      opacity: 1;
    }
  }
</style>
