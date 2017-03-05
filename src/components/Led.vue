<template lang="jade">
  .led
</template>

<script>
</script>

<style lang="scss">
  .led {
    width: 0.4em;
    height: 0.4em;
    border: 1px solid #100;
    border-radius: 50%;
    background-color: #100;
    animation: led__blink 1s steps(2, start) infinite;
  }

  @keyframes led__blink {
    to {
      background-color: #f33;
      opacity: 1;
    }
  }

</style>
