<template lang="jade">
  div.sequencer-trigger
    div.sequencer-trigger__button
    div.sequencer-trigger__state
</template>

<script>
</script>

<style scoped lang="scss">
  .sequencer-trigger {
    display: inline-block;
    margin: 0.5em;

    &__button {
      width: 2em;
      height: 2em;
      border: 1px solid #3d3d3d;
      border-radius: 50%;
      background-color: #000;
      cursor: pointer;

      &:hover {
        background-color: #333;
      }

      &:active {
        border-color: #333;
      }
    }

    &__state {
      margin: 0.4em auto 0;
      width: 0.4em;
      height: 0.4em;
      border: 1px solid #f99;
      border-radius: 50%;
      background-color: #fee;
      animation: sequencer-trigger__state__blink 1s steps(2, start) infinite;
    }
  }

  @keyframes sequencer-trigger__state__blink {
    to {
      background-color: #f00;
    }
  }
</style>
