<template lang="jade">
  div.sequencer-row
    span( v-for="n in 16" )
      sequencer-trigger
</template>

<script>
  import SequencerTrigger from './SequencerTrigger.vue'

  export default {
    components: { SequencerTrigger },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
</style>
