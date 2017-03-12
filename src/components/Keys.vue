<template lang="jade">
  ul.keys
    li.keys__white
    li.keys__black
    li.keys__white
    li.keys__black
    li.keys__white
    li.keys__white
    li.keys__black
    li.keys__white
    li.keys__black
    li.keys__white
    li.keys__black
    li.keys__white
</template>

<script>
  export default {
  };
</script>

<style lang="scss">
  .keys {
    li {
      display: inline-block;
      list-style: none;
    }

    &__white,
    &__black {
      cursor: pointer;
    }

    &__white {
      width: 3em;
      height: 6em;
      border: 1px solid #333;

      &:not(:last-child) {
        border-right-width: 0;
      }

      &:hover {
        background-color: #26262a;
      }

      &:active {
        background-color: #28282e;
      }
    }

    &__black {
      position: absolute;
      width: 2em;
      height: 4em;
      margin-left: -1em;
      border: 1px solid #333;
      background-color: #333;

      &:hover {
        background-color: #363638;
      }

      &:active {
        background-color: #38383a;
      }
    }
  }
</style>
