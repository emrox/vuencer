<template lang="jade">
  div.sequencer-trigger( v-bind:class="{ 'has-note': hasNote }" )
    div.sequencer-trigger__button( @click.ctrl="record" )
    led
    div.sequencer-trigger__label( v-bind:class="isFourth" )
      {{ step }}
</template>

<script>
  import EventBus from '../libs/EventBus';
  import Led from './Led.vue';

  export default {
    components: { Led },
    props: {
      step: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        play: {
          note: undefined,
          length: undefined,
          velocity: undefined,
        },
      };
    },
    computed: {
      isFourth() {
        return {
          'sequencer-trigger__label--fourth': this.step % 4 === 1,
        };
      },
      hasNote() {
        if (this.play.note) { return true; }
        return false;
      },
    },
    methods: {
      trigger() {
        const self = this;
        self.$children[0].$emit('tick');

        if (self.play.note) {
          EventBus.$emit('playObject', self.play);
        }
      },
      record() {
        const self = this;
        if (!self.$parent.$data.recordMode) { return; }

        self.play.note = self.$parent.$data.recordNote;
      },
    },
    created() {
      this.$on('trigger', this.trigger);
    },
  };
</script>

<style lang="scss">
  .sequencer-trigger {
    display: inline-block;
    margin: 0.5em;

    &__button {
      width: 2em;
      height: 2em;
      border: 1px solid #3d3d3d;
      border-radius: 50%;
      background-color: #111;
      cursor: pointer;

      &:hover {
        background-color: #222;
      }

      &:active {
        background-color: #333;
        border-color: transparent;
      }
    }

    &__label {
      margin: 0.7em auto 0;
      padding: 0.2em 0em;
      width: 1.8em;
      height: 1.8em;
      line-height: 1.3em;
      font-size: 0.6em;
      border-radius: 50%;
      color: #ccc;
      text-align: center;
      cursor: default;
      user-select: none;

      &--fourth {
        color: #000;
        background-color: #ccc;
      }
    }

    .led {
      margin: 0.4em auto 0;
    }

    &.has-note {
      .sequencer-trigger__button {
        border-color: #66f;
      }
    }
  }

  .in-record-mode {
    .sequencer-trigger {
      &__button {
        border-color: #911;
      }
      &.has-note {
        .sequencer-trigger__button {
          border-color: #f6f;
        }
      }


    }
  }
</style>
