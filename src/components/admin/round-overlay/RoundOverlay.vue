<template>
  <div>
    <div>
      <label>Match Mode</label>
      <br />
      <md-button
        class="md-raised vs1"
        :class="this.isRoundModeSelected(0) ? 'active-round' : ''"
        :disabled="this.isRoundModeSelected(0)"
        @click="selectRoundMode(0);"
      >1v1</md-button>
      <md-button
        class="md-raised vs2"
        :class="this.isRoundModeSelected(1) ? 'active-round' : ''"
        :disabled="this.isRoundModeSelected(1)"
        @click="selectRoundMode(1);"
      >2v2</md-button>
      <md-button
        class="md-raised vs3"
        :class="this.isRoundModeSelected(2) ? 'active-round' : ''"
        :disabled="this.isRoundModeSelected(2)"
        @click="selectRoundMode(2);"
      >3v3</md-button>
      <md-button
        class="md-raised vs4"
        :class="this.isRoundModeSelected(3) ? 'active-round' : ''"
        :disabled="this.isRoundModeSelected(3)"
        @click="selectRoundMode(3);"
      >4v4</md-button>
    </div>
    <div class="round-controls">
      <md-button class="md-raised md-accent" @click="clearRounds();">Clear Rounds</md-button>
      <md-button class="md-raised" @click="addRound();">Add Round</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoundOverlay",
  data() {
    return {
      roundMode: 0
    };
  },
  components: {},
  methods: {
    selectRoundMode(roundType) {
      this.roundMode = roundType;
      this.$store.dispatch("deleteRound", {
        mapIdToDelete: this.id
      });
    },
    isRoundModeSelected(roundType) {
      return this.roundMode === roundType;
    },
    addRound() {},
    clearRounds() {}
  }
};
</script>

<style language="scss">
.md-raised.active-round {
  background-color: grey !important;
}
.vs1 {
  background-color: cornflowerblue !important;
  border: 1px solid black;
}
.vs2 {
  background-color: hotpink !important;
  border: 1px solid black;
}
.vs3 {
  background-color: greenyellow !important;
  border: 1px solid black;
}
.vs4 {
  background-color: gold !important;
  border: 1px solid black;
}
</style>
