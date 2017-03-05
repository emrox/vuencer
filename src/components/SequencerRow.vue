<template lang="jade">
  div.sequencer-row
    span( v-for="step in steps" )
      sequencer-trigger( :step="step + stepBase" )
</template>

<script>
  import SequencerTrigger from './SequencerTrigger.vue';

  export default {
    props: {
      sequence: {
        type: Number,
        default: '1',
      },
      steps: {
        type: Number,
        default: 16,
      },
    },
    computed: {
      stepBase() {
        return (this.sequence * this.steps) - this.steps;
      },
    },
    components: { SequencerTrigger },
  };
</script>

<style scoped>
</style>
