<template lang="jade">
  .midi
    .midi__start(v-on:click="start")
    .midi__stop(v-on:click="stop")
    .midi__record(v-on:click="toggleRecord", v-bind:class="{ 'in-record-mode': recordMode }", title="use [CTRL] to quick toggle record mode")
    .midi__send_clock
      label
        input(type="checkbox", v-model="sendMidiClock")
        | send midi clock
    select.midi__choose-output(v-on:change="selectMidiOutput($event.target.value)")
      option(value="")
        | Select Midi Output Device
      option(v-for="output in midiOutputDevices", v-bind:value="output.id")
        {{ output.name }}
</template>

<script>
  import WebMidi from 'webmidi';
  import EventBus from '../libs/EventBus';

  export default {
    data() {
      return {
        running: false,
        bpm: undefined,
        tickInterval: undefined,
        tickCounter: 0,
        midiOutputs: [],
        midiOutput: undefined,
        recordMode: false,
        sendMidiClock: true,
      };
    },
    computed: {
      tickMilliSeconds() {
        const beatMilliseconds = 1000 * (60 / this.bpm);
        const messagesPerBeat = beatMilliseconds / 24;  // midi clock definition says 96 ticks per beat = 24 per step
        return messagesPerBeat;
      },
      midiOutputDevices() {
        return this.updateMidiOutputDevices();
      },
    },
    methods: {
      setBpm(newBpm) {
        const self = this;
        self.bpm = newBpm;
        self.initInterval();
      },
      initInterval() {
        const self = this;
        if (!self.running) { return; }
        if (!self.midiOutput) { alert('Choose a output device first!'); return; }

        if (self.tickInterval) { clearInterval(self.tickInterval); }
        self.tickInterval = setInterval(self.ticker, self.tickMilliSeconds);
      },
      ticker() {
        const self = this;

        self.tickCounter += 1;
        if (self.tickCounter > 24) { self.tickCounter = 1; }

        if (self.sendMidiClock) { self.midiOutput.sendClock(); }
        EventBus.$emit('tick', self.tickCounter);
      },
      start() {
        const self = this;
        self.running = true;
        self.initInterval();
        if (self.sendMidiClock) { self.midiOutput.sendContinue(); }
      },
      stop() {
        const self = this;
        self.running = false;
        self.midiOutput.sendStop();
        if (self.tickInterval) { clearInterval(self.tickInterval); }
      },
      toggleRecord() {
        if (this.recordMode) {
          this.setRecordModeOff();
        } else {
          this.setRecordModeOn();
        }
      },
      setRecordModeOn(fromEventBus) {
        this.recordMode = true;
        if (!fromEventBus) { EventBus.$emit('recordModeOn', true); }
      },
      setRecordModeOff(fromEventBus) {
        this.recordMode = false;
        if (!fromEventBus) { EventBus.$emit('recordModeOff', true); }
      },
      initMidi() {
        const self = this;
        WebMidi.enable((err) => {
          if (err) { alert(err); }
          self.updateMidiOutputDevices();
        });
      },
      updateMidiOutputDevices() {
        const self = this;
        self.midiOutputs = [];
        WebMidi.outputs.forEach(output => {
          self.midiOutputs.push({
            id: output.id,
            name: `${output.name} (${output.manufacturer})`,
          });
        });

        return self.midiOutputs;
      },
      selectMidiOutput(choosenOutputId) {
        if (choosenOutputId === '') { return; }
        this.midiOutput = WebMidi.getOutputById(choosenOutputId);
      },
      startPlayingNote(note) {
        const self = this;
        if (!self.midiOutput) { return; }
        self.midiOutput.playNote(note);
      },
      stopPlayingNote(note) {
        const self = this;
        if (!self.midiOutput) { return; }
        self.midiOutput.stopNote(note);
      },
      playObject(playObject) {
        const self = this;
        if (!self.midiOutput) { return; }
        if (!playObject || !playObject.note) { return; }
        self.midiOutput.playNote(playObject.note, 'all', { duration: 100 });
      },
    },
    created() {
      const self = this;
      EventBus.$on('setTempo', self.setBpm);
      EventBus.$on('startPlayingNote', self.startPlayingNote);
      EventBus.$on('stopPlayingNote', self.stopPlayingNote);
      EventBus.$on('playObject', self.playObject);
      EventBus.$on('recordModeOn', self.setRecordModeOn);
      EventBus.$on('recordModeOff', self.setRecordModeOff);
      self.initMidi();
    },
    updated() {
      this.initInterval();
    },
  };
</script>

<style lang="scss">
  .midi {
    margin-bottom: 1em;
    &__start,
    &__stop,
    &__record {
      display: inline-block;
      width: 4em;
      height: 1.4em;
      border-radius: 0.7em;
      background-color: #555;
      cursor: pointer;

      &:hover {
        background-color: #666;
      }
    }

    &__start {
      margin-right: 1em;

      &::after {
        content: " ";
        position: relative;
        display: inline-block;
        top: 0.1em;
        width: 0;
        height: 0;
        border-top: 0.4em solid transparent;
        border-bottom: 0.4em solid transparent;
        border-left: 0.5em solid #ccc;
      }

      &:active {
        &::after {
          border-left-color: #999;
        }
      }
    }

    &__stop {
      margin-right: 1em;

      &::after {
        content: " ";
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        background-color: #ccc;
      }

      &:active {
        &::after {
          background-color: #999;
        }
      }
    }

    &__send_clock {
      color: #fff;
      font-size: 0.8em;
    }

    &__record {
      background-color: #754545;

      &::after {
        content: " ";
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        background-color: #ccc;
        border-radius: 50%;
      }

      &:hover {
        background-color: #956565;
      }

      &:active {
        &::after {
          background-color: #f99;
        }
      }

      &.in-record-mode {
        background-color: #bd3c3c;

        &:hover {
          background-color: #cd4c4c;
        }

        &::after {
          background-color: #faa;
        }
      }
    }

    &__choose-output {
      display: block;
      margin: 1em auto;
      padding: 0.5em 1em;
      border: none;
      border-radius: 1em;
      text-align: center;
      color: #ccc;
      background-color: #555;
      outline: none;
    }
  }
</style>
