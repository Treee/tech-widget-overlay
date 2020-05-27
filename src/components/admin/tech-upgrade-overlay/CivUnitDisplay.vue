<template>
  <div v-on:click="civClicked" class="civ-tech-icon faded" :style="getIconStyle">
    <div class="player-colors">
      <div v-if="player1 === civName" class="player-one"></div>
      <div v-if="player2 === civName" class="player-two"></div>
    </div>
    <div class="civ-text">{{civName}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CivUnitDisplay",
  props: {
    civName: String,
    clickCounter: Number
  },
  computed: {
    ...mapState({
      player1: state => state.techUpgradeOverlayControlOptions.civ1,
      player2: state => state.techUpgradeOverlayControlOptions.civ2
    }),
    getIconStyle() {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${this.civName.toLowerCase()}.tp.png`,
        "background-size": "cover",
        "background-repeat": "no-repeat"
      };
    }
  },
  methods: {
    civClicked() {
      this.$emit("civselected", this.civName);
    }
  }
};
</script>

<style language="scss">
.player-colors {
  width: inherit;
  height: inherit;
  display: inline-flex;
  opacity: 0.5;
}

.civ-tech-icon {
  width: 6rem;
  height: 6rem;
  display: inline-block;

  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;

  font-size: larger;
  font-weight: bold;

  color: black;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}

.civ-tech-icon:hover {
  opacity: 1;
}

.civ-text {
  display: inline-block;
  user-select: none;
}

.faded {
  opacity: 0.5;
}

.player-one {
  background-color: blue !important;
  width: 50%;
  height: 50%;
}

.player-two {
  background-color: red !important;
  width: 50%;
  height: 50%;
}
</style>
