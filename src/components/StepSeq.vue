<template lang="jade">
  div.step-seq
    tempo
    span( v-for="sequence in 4" )
      sequencer-row( :sequence = "sequence", :steps = 16 )
</template>

<script>
  import SequencerRow from './SequencerRow.vue';
  import Tempo from './Tempo.vue';

  export default {
    components: { SequencerRow, Tempo },
  };
</script>

<style scoped>
</style>
