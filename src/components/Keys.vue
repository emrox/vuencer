<template lang="jade">
  ul.keys
    li(
        v-for="key in keys",
        :data-note="key",
        :class="key.endsWith('#') ? 'keys__black' : 'keys__white'",
        v-on:mousedown="startPlay",
        v-on:mouseup="stopPlay",
        v-on:mouseleave="stopPlay",
     )
</template>

<script>
  import EventBus from '../libs/EventBus';

  export default {
    props: {
      keys: {
        type: Array,
        default: () => ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
      octave: {
        type: Number,
        default: 3,
      },
    },
    data() {
      return {
        currentNotePlaying: undefined,
      };
    },
    methods: {
      startPlay(event) {
        const self = this;
        const key = event.target;
        const note = key.dataset.note;
        self.currentNotePlaying = `${note}${self.octave}`;
        EventBus.$emit('startPlayingNote', self.currentNotePlaying);
      },
      stopPlay() {
        const self = this;
        if (!self.currentNotePlaying) { return; }
        EventBus.$emit('stopPlayingNote', this.currentNotePlaying);
        self.currentNotePlaying = undefined;
      },
    },
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
