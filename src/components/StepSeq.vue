<template lang="jade">
  div.step-seq
    midi
    tempo
    sequencer
</template>

<script>
  import Midi from './Midi.vue';
  import Tempo from './Tempo.vue';
  import Sequencer from './Sequencer.vue';

  export default {
    components: { Midi, Tempo, Sequencer },
  };
</script>

<style scoped>
</style>
