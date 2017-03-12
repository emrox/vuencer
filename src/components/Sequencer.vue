<template lang="jade">
  .sequencer
    span( v-for="sequenceRowNumber in rows" )
      sequencer-row( :sequence = "sequenceRowNumber", :steps = "steps" )
</template>

<script>
  import EventBus from '../libs/EventBus';
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
    data() {
      return {
        stepCount: 0,
        currentRow: 1,
      };
    },
    methods: {
      processTick(tickCount) {
        if (tickCount % 6 === 1) {
          this.$emit('step');
        }
      },
      processStep() {
        const self = this;

        self.stepCount += 1;
        if (self.stepCount > (self.rows * self.steps)) {
          self.stepCount = 1;
        }

        const currentRowStep = (self.stepCount % self.steps) + 1;
        if (currentRowStep === 1) {
          self.currentRow += 1;
          if (self.currentRow > 4) {
            self.currentRow = 1;
          }
        }

        self.$children[self.currentRow - 1].$emit('step', currentRowStep);
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
