<template lang="jade">
  div.step-seq
    span( v-for="sequence in 4" )
      sequencer-row( :sequence = "sequence", :steps = 16 )
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
