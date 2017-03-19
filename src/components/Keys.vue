<template lang="jade">
  .keys
    .settings
      .shift-octave
        .left( v-on:click="octave -= 1" )
        .current
          {{ octave }}
        .right( v-on:click="octave += 1" )
    ul.board
      li(
        v-for="key in keys",
        :data-note="key",
        :class="key.endsWith('#') ? 'black' : 'white'",
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
    },
    data() {
      return {
        currentNotePlaying: undefined,
        octave: 3,
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
    margin: 1em 0;

    .board {
      margin: 0;
      li {
        display: inline-block;
        list-style: none;
      }

      .white,
      .black {
        cursor: pointer;
      }

      .white {
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

      .black {
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

    .settings {
      display: inline-block;
      margin: 0 auto;
      overflow: hidden;

      .shift-octave {
        .left,
        .current,
        .right {
          display: inline-block;
          height: 1.4em;
          float: left;
          background-color: #555;
          color: #ccc;
        }

        .left,
        .right {
          width: 3em;
          border-radius: 0.7em;
          background-color: #555;
          cursor: pointer;

          &:hover {
            background-color: #666;
          }

          &:active {
            color: #999;
          }
        }

        .current {
          width: 3em;
          cursor: default;
        }

        .left {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;

          &::before {
            content: "<";
          }
        }

        .right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;

          &::before {
            content: ">";
          }
       }
      }
    }
  }
</style>
