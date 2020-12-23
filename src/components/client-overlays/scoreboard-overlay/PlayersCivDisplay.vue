<template>
  <div v-if="isCivDisplayVisible">
    <div
      class="team-container"
      :style="customPositionAndWidth(civ1X, civ1Y, civ1Width)"
    >
      <div
        class="icon-container"
        v-for="(p1Civ, index) in civ1"
        :key="p1Civ+index"
      >
        <div
          class="player-civ-icon civ-icon"
          :style="civIconStyle(p1Civ)"
        />
        <div class="icon-civ-name">{{ formatShortCivName(p1Civ) }}</div>
        <div
          class="player-civ-icon civ-icon"
          :style="uniqueUnitStyle(false, p1Civ)"
        />
      </div>
    </div>
    <div
      class="team-container"
      :style="customPositionAndWidth(civ2X, civ2Y, civ2Width)"
    >
      <div
        class="icon-container"
        v-for="(p2Civ, index) in civ2"
        :key="p2Civ+index"
      >
        <div
          class="player-civ-icon civ-icon"
          :style="civIconStyle(p2Civ)"
        />
        <div class="icon-civ-name">{{ formatShortCivName(p2Civ) }}</div>
        <div
          class="player-civ-icon civ-icon"
          :style="uniqueUnitStyle(true, p2Civ)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayersCivDisplay",
    props: {
      isCivDisplayVisible: Boolean,
      civ1: Array,
      civ2: Array,
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
          position: "absolute",
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
      uniqueUnitStyle(flipped, civName) {
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${civName.toLowerCase()}.tp.png")`,
          "background-size": "contain",
          "background-repeat": "no-repeat",
          transform: flipped ? "scaleX(1)" : "scaleX(-1)",
        };
      },
      formatShortCivName(civName) {
        return civName.substring(0, 3).toUpperCase();
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
  .icon-container {
    display: inline-flex;
    align-items: center;
  }
  .icon-civ-name {
    display: inline-block;
    font-weight: bold;
    font-size: medium;
    font-family: "Memb-Font";
    margin-right: 0.25rem;
  }

  .player-civ-icon {
    width: 2rem;
    height: 2rem;
  }
</style>
