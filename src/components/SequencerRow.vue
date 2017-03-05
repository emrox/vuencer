<template lang="jade">
  div.sequencer-row
    span( v-for="step in steps" )
      sequencer-trigger( :step="step + stepBase" )
</template>

<script>
  import SequencerTrigger from './SequencerTrigger.vue';

  export default {
    components: { SequencerTrigger },
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
    methods: {
      processStep(stepCount) {
        this.$children[stepCount - 1].$emit('trigger');
      },
    },
    created() {
      const self = this;
      self.$on('step', self.processStep);
    },
  };
</script>

<style scoped>
</style>
