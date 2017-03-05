<template />

<script>
  import EventBus from '../libs/EventBus';

  export default {
    data() {
      return {
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
        this.bpm = newBpm;
        this.initInterval();
      },
      initInterval() {
        const self = this;
        if (self.tickInterval) { clearInterval(self.tickInterval); }
        self.tickInterval = setInterval(self.ticker, self.tickMilliSeconds);
      },
      ticker() {
        const self = this;

        self.tickCounter += 1;
        if (self.tickCounter > 96) { self.tickCounter = 1; }

        EventBus.$emit('tick', self.tickCounter);
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
