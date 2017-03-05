<template lang="jade">
  .tempo
    .tempo__display
      input.tempo__input( v-model="tempo", number, lazy, type="number", min="30", max="250", step="1" )
    led
</template>

<script>
  import EventBus from '../libs/EventBus';
  import Led from './Led.vue';

  export default {
    components: { Led },
    props: {
      initialTempo: {
        type: Number,
        default: 120,
      },
    },
    data() {
      return {
        runningInterval: undefined,
        tempo: this.initialTempo,
      };
    },
    computed: {
      tickMilliSeconds() {
        return 1000 * (60 / this.tempo);
      },
    },
    methods: {
      startInterval() {
        const self = this;
        const flasher = function () { EventBus.$emit('tick', {}); };

        if (self.runningInterval) { clearInterval(self.runningInterval); }
        self.runningInterval = setInterval(flasher, self.tickMilliSeconds);
      },
    },
    created() {
      this.startInterval();
    },
    updated() {
      this.startInterval();
    },
  };
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

    &__input {
      width: 2em;
      border: 0;
      font-family: 'VT323', monospace;
      font-size: 2em;
      text-align: right;
      color: #fff;
      background-color: transparent;
      outline: none;

      // turn off spin box / arrows, http://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }

    .led {
      display: inline-block;
      vertical-align: super;
      margin: 0 0 0 0.5em;
    }
  }
</style>
