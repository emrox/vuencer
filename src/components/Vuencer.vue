<template lang="jade">
  .vuencer
    midi
    tempo
    keys
    sequencer
</template>

<script>
  import Midi from './Midi.vue';
  import Tempo from './Tempo.vue';
  import Keys from './Keys.vue';
  import Sequencer from './Sequencer.vue';

  export default {
    components: { Midi, Tempo, Keys, Sequencer },
  };
</script>

<style scoped>
</style>
