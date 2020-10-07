<template>
  <div
    v-if="isCivDisplayVisible">
    <div class="team-container" v-if="civ1 !== ''" :style="customPositionAndWidth(civ1X, civ1Y, civ1Width)">
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ1)" />
      <div class="civ-name">{{ civ1 }}</div>
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ1)" />
    </div>
    <div class="team-container" v-if="civ2 !== ''" :style="customPositionAndWidth(civ2X, civ2Y, civ2Width)">
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ2)" />
      <div class="civ-name">{{ civ2 }}</div>
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ2)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayersCivDisplay",
  props: {
    isCivDisplayVisible: Boolean,
    civ1: String,
    civ2: String,
    civ1X: String,
    civ1Y: String,
    civ1Width: String,
    civ2X: String,
    civ2Y: String,
    civ2Width: String,
  },
  methods: {
    customPositionAndWidth(x, y, width) {
      if (!x && !y && !width) {
        return;
      }
      return {
        width: `${width}%`,
        left: `${x}%`,
        top: `${y}%`,
        position: "absolute"
      };
    },
    civIconStyle(civName) {
      if (!civName) {
        return;
      }
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-icons/${civName.toLowerCase()}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat",
      };
    },
  },
};
</script> 

<style language="scss">
.client-player-display {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.team-container {
  display: inline-flex;
  align-items: center;
}

.player-civ-icon {
  width: 2rem;
  height: 2rem;
}
</style>
