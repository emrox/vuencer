<template lang="jade">
  .tempo
    .tempo__display
      input.tempo__input( type="number", v-model="tempo", number, lazy, min="30", max="250", step="1" )
    led
</template>

<script>
  import Led from './Led.vue';

  export default {
    components: { Led },
    props: {
      tempo: {
        type: Number,
        default: 120,
      },
    },
  };
</script>

<style lang="scss">
  .tempo {
    display: inline-block;
    padding: 0.5em 1em;
    border: 1px solid #333;

    &__display {
      display: inline-block;
      font-family: 'VT323', monospace;
      font-size: 2em;
      color: #fff;
    }

    &__input {
      width: 2em;
      border: 0;
      font-family: 'VT323', monospace;
      font-size: 2em;
      text-align: right;
      color: #fff;
      background-color: transparent;
      outline: none;

      // turn off spin box / arrows, http://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }

    .led {
      display: inline-block;
      vertical-align: super;
      margin: 0 0 0 0.5em;
    }
  }
</style>
