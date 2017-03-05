<template lang="jade">
  .led( v-bind:class="{ 'led--on': isOn }" )
</template>

<script>
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
      this.flash();
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
