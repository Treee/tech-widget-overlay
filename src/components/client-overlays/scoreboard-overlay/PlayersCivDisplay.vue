<template>
  <div class="team-civ-display" v-if="isCivDisplayVisible">
    <div class="team-container" v-if="civ1 !== ''">
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ1)" />
      <div class="civ-name">{{ civ1 }}</div>
      <div class="player-civ-icon civ-icon" :style="civIconStyle(civ1)" />
    </div>
    <div class="team-container" v-if="civ2 !== ''">
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
    civ2: String
  },
  methods: {
    civIconStyle(civName) {
      if (!civName) {
        return;
      }
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-icons/${civName.toLowerCase()}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat"
      };
    }
  }
};
</script> 

<style language="scss">
.client-player-display {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.team-civ-display {
  display: inline-flex;
  width: 30%;
  justify-content: space-between;
  margin-top: 6.5rem;
  position: absolute;
  left: 37%;
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
