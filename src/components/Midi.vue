<template lang="jade">
  .midi
    .midi__start(v-on:click="start")
    .midi__stop(v-on:click="stop")
</template>

<script>
  import EventBus from '../libs/EventBus';

  export default {
    data() {
      return {
        running: false,
        bpm: undefined,
        tickInterval: undefined,
        tickCounter: 0,
      };
    },
    computed: {
      tickMilliSeconds() {
        const beatMilliseconds = 1000 * (60 / this.bpm);
        const messagesPerBeat = beatMilliseconds / 96;  // midi clock definition says 96 ticks per beat
        return messagesPerBeat;
      },
    },
    methods: {
      setBpm(newBpm) {
        const self = this;
        self.bpm = newBpm;
        self.initInterval();
      },
      initInterval() {
        const self = this;
        if (!self.running) { return; }
        if (self.tickInterval) { clearInterval(self.tickInterval); }
        self.tickInterval = setInterval(self.ticker, self.tickMilliSeconds);
      },
      ticker() {
        const self = this;

        self.tickCounter += 1;
        if (self.tickCounter > 96) { self.tickCounter = 1; }

        EventBus.$emit('tick', self.tickCounter);
      },
      start() {
        const self = this;
        self.running = true;
        self.initInterval();
      },
      stop() {
        const self = this;
        self.running = false;
        if (self.tickInterval) { clearInterval(self.tickInterval); }
      },
    },
    created() {
      const self = this;
      EventBus.$on('setTempo', self.setBpm);
    },
    updated() {
      this.initInterval();
    },
  };
</script>

<style lang="scss">
  .midi {
    margin-bottom: 1em;
    &__start,
    &__stop {
      display: inline-block;
      width: 4em;
      height: 1.4em;
      border-radius: 0.7em;
      background-color: #555;
      cursor: pointer;

      &:hover {
        background-color: #666;
      }
    }

    &__start {
      margin-right: 1em;

      &::after {
        content: " ";
        position: relative;
        display: inline-block;
        top: 0.1em;
        width: 0;
        height: 0;
        border-top: 0.4em solid transparent;
        border-bottom: 0.4em solid transparent;
        border-left: 0.5em solid #ccc;
      }

      &:active {
        &::after {
          border-left-color: #999;
        }
      }
    }

    &__stop {
      &::after {
        content: " ";
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        background-color: #ccc;
      }

      &:active {
        &::after {
          background-color: #999;
        }
      }
    }
  }
</style>
