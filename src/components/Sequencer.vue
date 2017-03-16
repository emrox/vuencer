<template lang="jade">
  .sequencer
    .sequencer-row( v-for="rowNumber in rowCount" )
      sequencer-trigger( v-for="step in stepCountOnRow(rowNumber)", :key = "step", :step = "step" )
</template>

<script>
  import EventBus from '../libs/EventBus';
  import SequencerTrigger from './SequencerTrigger.vue';

  export default {
    components: { SequencerTrigger },
    props: {
      steps: {
        type: Number,
        default: 64,
      },
      maxStepsPerRow: {
        type: Number,
        default: 16,
      },
    },
    data() {
      return {
        currentStep: 0,
        currentRow: 1,
      };
    },
    computed: {
      rowCount() {
        return Math.ceil(this.steps / this.maxStepsPerRow);
      },
    },
    methods: {
      stepCountOnRow(rowNumber) {
        const self = this;
        if (rowNumber < self.rowCount) { return self.maxStepsPerRow; }
        return self.steps - ((self.rowCount - 1) * self.maxStepsPerRow);
      },
      processTick(tickCount) {
        if (tickCount % 6 === 1) {
          this.$emit('step');
        }
      },
      processStep() {
        const self = this;

        self.currentStep += 1;
        if (self.currentStep > self.steps) {
          self.currentStep = 1;
        }

        self.$children[self.currentStep - 1].$emit('trigger');
      },
    },
    created() {
      const self = this;
      EventBus.$on('tick', self.processTick);
      self.$on('step', self.processStep);
    },
  };
</script>

<style scoped>
</style>
