<template>
  <div
    :class="{
      'fade-in-map': this.name !== '',
      'fade-out-map': this.$store.state.clearAllMapsClicked,
    }"
  >
    <div :class="pointer" :style="this.getLabelGrowShrink()">
      {{ this.$store.getters.getFormattedMapName(name) }}
    </div>
    <div
      v-if="this.state === 'banned'"
      class="client-map-frame"
      :style="getMapFrame"
    ></div>
    <md-icon v-if="this.homeMapPlayer !== ''" :class="getHomeIconPosition()"
      >home</md-icon
    >
    <div v-if="this.winner !== ''" class="civ-picks">
      {{ this.toCommaSeparatedString(this.teamOneCiv) }}
    </div>
    <div
      v-if="this.winner !== ''"
      :class="
        teamOne === winner ? getWinnerIconPosition() : getDefeatedIconPosition()
      "
    ></div>
    <div class="client-image-container" :style="this.getMapGrowShrink()">
      <div class="client-map-image" :style="getMapImage"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientMapDisplay",
  props: {
    name: String,
    state: String,
    homeMapPlayer: String,
    winner: String,
    teamOneCiv: Array,
    teamTwoCiv: Array,
    teamOne: String,
    teamTwo: String,
    pointer: String,
    showMap: Boolean,
    mapCount: Number,
    mapIndex: Number,
  },
  computed: {
    getMapImage() {
      let map = this.toKabobCase(this.name);
      const mapFolder = this.$store.getters.isCustomMap(map)
        ? "custom"
        : "default";
      const mapParts = map.split("-");
      if (!isNaN(parseInt(mapParts[mapParts.length - 1]))) {
        // we have a duplicate map, trim the last part
        map = mapParts.slice(0, mapParts.length - 1).join("-");
      }
      let url = "";
      if (this.state !== "banned"){
        url = `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`;
      }
      return {
        background: url,
      };
    },
    getMapFrame() {
      console.log("state: " + this.state);
      if (this.state === "banned") {
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/frame-veto1.png") no-repeat`,
          "background-size": "contain",
          "width": "5rem",
          "height": "5rem",
          "padding-right": "14rem",
          "margin-left": "-14rem",
        };
      }
      return "";
    },
  },
  methods: {
    toCommaSeparatedString(arrayText) {
      if (arrayText) {
        if (arrayText.length > 2) {
          return arrayText
            .map((civName) => {
              return this.toShortString(civName);
            })
            .join(", ");
        } else {
          return arrayText
            .map((civName) => {
              return civName.charAt(0).toUpperCase() + civName.slice(1);
            })
            .join(", ");
        }
      } else {
        return "";
      }
    },
    toShortString(civName) {
      if (civName) {
        return civName.slice(0, 3).toUpperCase();
      }
      return "";
    },
    toKabobCase(text) {
      return text
        .toLowerCase()
        .split(" ")
        .join("-");
    },
    useWhiteText() {
      return this.state !== "played";
    },
    getHomeIconPosition() {
      if (this.pointer === "pointer-left") {
        return "home-icon left-icon";
      } else {
        return "home-icon right-icon";
      }
    },
    getWinnerIconPosition() {
      return "winner-icon";
    },
    getDefeatedIconPosition() {
      return "defeated-icon";
    },
    getMapGrowShrink() {
      let transformExpression = "scale(1)";
      let translateX = 0;
      const numEachSide = Math.floor(this.mapCount / 2);
      
      let translationUnit = 18.7;
      let numUnitsToTranslate = numEachSide - this.mapIndex;
      translateX = numUnitsToTranslate * translationUnit;
      if (this.showMap) {
        const scaleMap = 20;
        transformExpression = `scale(${scaleMap}) translate(${translateX}%, -50%)`;
      }      
      return {
        transition: "all 2s ease-in-out",
        transform: transformExpression,
      };
    },
    getLabelGrowShrink() {
      let transformExpression = "scale(1)";
      
      if (this.showMap) {
        transformExpression = `translate(0, -150%)`;
      }      
      return {
        transition: "all 2s ease-in-out",
        transform: transformExpression,
      };    
    }
  },
};
</script>

<style language="scss">
.pointer-both {
  width: 13rem;
  height: 5rem;
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/frame-middle.png");
  background-size: cover;
  background-repeat: round;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  color: orange;
  text-shadow: -1px 0 purple, 0 1px purple, 1px 0 purple, 0 -1px purple;
  z-index: 1;
}

.pointer-left {
  width: 13rem;
  height: 5rem;
  position: relative;
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/frame-left.png");
  background-size: cover;
  background-repeat: round;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  color: orange;
  text-shadow: -1px 0 purple, 0 1px purple, 1px 0 purple, 0 -1px purple;
  z-index: 1;
}

.pointer-right {
  width: 13rem;
  height: 5rem;
  position: relative;
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/frame-right.png");
  background-size: cover;
  background-repeat: round;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  color: orange;
  text-shadow: -1px 0 purple, 0 1px purple, 1px 0 purple, 0 -1px purple;
  z-index: 1;
}

.winner-icon {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/winner.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 3rem;
  height: 3rem;
  z-index: 2;
  position: relative;
  left: -30%;
}

.defeated-icon {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/defeated.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 3rem;
  height: 3rem;
  z-index: 2;
  display: inline-flex;
  position: relative;
  top: -8.5rem;
}

.civ-picks {
  font-size: large;
  color: black;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
  z-index: 2;
  font-size: x-large;
  height: fit-content;
  position: relative;
}

.home-icon {
  position: relative;
  z-index: 2;
  left: -37%;
  top: -30%;
}

.column-list {
  display: inline-flex;
  flex-direction: column;
  width: inherit;
}
.client-map-display {
  width: 15rem;
  height: 15rem;
  margin-top: 4rem;
}

.client-image-container {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  justify-content: center;
  position: relative;
  left: -50%;
}

.client-map-frame {
  width: 8rem;
  height: 8rem;
  z-index: 1;
  top: -6rem;
  left: 4.5rem;
}

.client-map-image {
  width: inherit;
  height: inherit;
  background-size: cover !important;
  background-repeat: round !important;
}

.client-map-name {
  z-index: 2;
  font-size: x-large;
  display: inline-flex;
  height: fit-content;
  position: relative;
  top: 5%;
  left: -12%;
}

.white-text {
  color: whitesmoke;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.fade-in-map {
  animation: key-fade-in 2s ease-out forwards;
  display: inline-flex;
}

.fade-out-map {
  animation: key-fade-out 2s ease-out forwards;
}

@keyframes key-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes key-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
