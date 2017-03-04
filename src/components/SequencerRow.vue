<template lang="jade">
  div.sequencer-row
    span( v-for="n in steps" )
      sequencer-trigger
</template>

<script>
  import SequencerTrigger from './SequencerTrigger.vue'

  export default {
    props: {
      steps: {
        type: Number,
        default: 16
      }
    },
    components: { SequencerTrigger },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
</style>
