<template lang="jade">
  .led( v-bind:class="{ 'led--on': isOn }" )
</template>

<script>
  import EventBus from '../libs/EventBus';


  export default {
    props: {
      on: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      flash() {
        const self = this;
        self.isOn = true;
        const switchOff = function () { self.isOn = false; };
        setTimeout(switchOff, 200);
      },
    },
    created() {
      const self = this;

      // initial flash on load
      self.flash();

      const tickFlash = function () { self.flash(); };
      EventBus.$on('tick', tickFlash);
    },
    data() {
      return {
        isOn: this.on,
      };
    },
  };
</script>

<style lang="scss">
  .led {
    width: 0.4em;
    height: 0.4em;
    border: 1px solid #100;
    border-radius: 50%;
    background-color: #100;

    &--on {
      background-color: #f33;
    }
  }
</style>
