<template lang="jade">
  div.step-seq
    span( v-for="n in 3" )
      sequencer-row
</template>

<script>
  import SequencerRow from './SequencerRow.vue'

  export default {
    components: { SequencerRow },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
</style>
