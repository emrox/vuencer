<template lang="jade">
  .sequencer
    span( v-for="sequenceRowNumber in rows" )
      sequencer-row( :sequence = "sequenceRowNumber", :steps = "steps" )
</template>

<script>
  import SequencerRow from './SequencerRow.vue';

  export default {
    components: { SequencerRow },
    props: {
      rows: {
        type: Number,
        default: 4,
      },
      steps: {
        type: Number,
        default: 16,
      },
    },
  };
</script>

<style scoped>
</style>
