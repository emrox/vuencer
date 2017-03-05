<template lang="jade">
  div.step-seq
    tempo
    sequencer
</template>

<script>
  import Sequencer from './Sequencer.vue';
  import Tempo from './Tempo.vue';

  export default {
    components: { Sequencer, Tempo },
  };
</script>

<style scoped>
</style>
