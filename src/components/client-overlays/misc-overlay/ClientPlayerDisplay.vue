<template>
  <div class="client-player-display">
    <div class="team-color-display" v-show="miscOverlayOptions.showTeamColors">
      <div class="team-color-container">
        <div class="team-color blue" />
        <div class="team-color green" />
        <div class="team-color teal" />
      </div>
      <div class="team-color-container">
        <div class="team-color red" />
        <div class="team-color yellow" />
        <div class="team-color purple" />
      </div>
    </div>
    <div class="team-civ-display" v-if="miscOverlayOptions.isCivDisplayVisible">
      <div class="team-container" v-if="miscOverlayOptions.civ1 !== ''">
        <div class="player-civ-icon civ-icon" :style="civIconStyle(miscOverlayOptions.civ1)" />
        <div class="civ-name">{{ miscOverlayOptions.civ1 }}</div>
        <div class="player-civ-icon civ-icon" :style="civIconStyle(miscOverlayOptions.civ1)" />
      </div>
      <div class="team-container" v-if="miscOverlayOptions.civ2 !== ''">
        <div class="player-civ-icon civ-icon" :style="civIconStyle(miscOverlayOptions.civ2)" />
        <div class="civ-name">{{ miscOverlayOptions.civ2 }}</div>
        <div class="player-civ-icon civ-icon" :style="civIconStyle(miscOverlayOptions.civ2)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ClientPlayerDisplay",
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
  },
  computed: {
    ...mapState({
      miscOverlayOptions: state => state.miscOverlayControlOptions
    })
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

.team-color-display {
  display: inline-flex;
  width: 40%;
  justify-content: space-between;
  margin-top: 4rem;
  position: absolute;
}

.team-color-container {
  display: inline-flex;
  align-items: center;
  width: 7%;
  justify-content: space-between;
}

.team-civ-display {
  display: inline-flex;
  width: 40%;
  justify-content: space-between;
  margin-top: 6rem;
  position: absolute;
}

.team-container {
  display: inline-flex;
  align-items: center;
}

.player-civ-icon {
  width: 2rem;
  height: 2rem;
}

.team-color {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid black;
}

.blue {
  background-color: blue;
}
.green {
  background-color: lightgreen;
}
.teal {
  background-color: cyan;
}
.red {
  background-color: red;
}
.yellow {
  background-color: gold;
}
.purple {
  background-color: plum;
}
</style>
