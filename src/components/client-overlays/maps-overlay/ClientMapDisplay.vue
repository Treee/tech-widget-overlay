<template>
  <div
    class="client-map-display"
    :class="{'fade-in-map': this.name !== '', 'fade-out-map': this.$store.state.clearAllMapsClicked}"
  >
    <div class="client-image-container">
      <div class="client-map-frame" :style="getMapFrame"></div>
      <div class="client-map-image" :style="getMapImage"></div>
      <div class="column-list">
        <div class="client-map-name">{{this.$store.getters.getFormattedMapName(name)}}</div>
        <div class="home-map home-map-decal player-flag-modifier" v-if="this.homeMapPlayer !== ''">
          <div class="flag-text">{{this.homeMapPlayer}}</div>
          <md-icon class="home-icon">home</md-icon>
        </div>
        <div class="winner-decal winner-flag-decal player-flag-modifier" v-if="this.winner !== ''">
          <div class="flag-text">{{this.winner}}</div>
          <div class="winner-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientMapDisplay",
  props: {
    name: String,
    mapState: String,
    homeMapPlayer: String,
    winner: String
  },
  computed: {
    getMapImage() {
      const map = this.toKabobCase(this.name);
      const mapFolder = this.$store.getters.isCustomMap(map)
        ? "custom"
        : "default";
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`
      };
    },
    getMapFrame() {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/${this.getMapFrameImagePath()}")`
      };
    }
  },
  methods: {
    getMapFrameImagePath() {
      let mapFrame = "frame.png";
      if (this.mapState === "current") {
        mapFrame = "frame-current.png";
      } else if (this.mapState === "banned") {
        mapFrame = "frame-veto.png";
      } else if (this.mapState === "played") {
        mapFrame = "frame-previously-played.png";
      }
      return mapFrame;
    },
    toKabobCase(text) {
      return text
        .toLowerCase()
        .split(" ")
        .join("-");
    }
  }
};
</script> 

<style language="scss">
.winner-icon {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/winner.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 25px;
  height: 100%;
  display: inline-flex;
  float: left;
  margin-top: 3px;
}

.flag-text {
  width: 75%;
  display: inline-flex;
}
.home-icon {
  float: left;
  color: white !important;
}
.home-map-decal {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/yellow-banner.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.winner-flag-decal {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/purple-banner.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.player-flag-modifier {
  width: 95%;
  height: 1.5rem;
  position: relative;
  top: 90%;
  left: 4%;
  color: whitesmoke;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.column-list {
  display: inline-flex;
  flex-direction: column;
  width: inherit;
}
.client-map-display {
  width: 12rem;
  height: 12rem;
}

.client-image-container {
  width: inherit;
  height: inherit;
  display: inline-flex;
  justify-content: center;
}

.client-map-frame {
  width: inherit;
  height: inherit;
  background-size: cover !important;
  position: absolute;
  z-index: 2;
}

.client-map-image {
  width: inherit;
  height: inherit;
  background-size: cover !important;
  background-repeat: round !important;
  position: absolute;
  transform: scale(0.9) translateY(-3px) translateX(2px);
  z-index: 1;
}

.client-map-name {
  z-index: 2;
  font-size: larger;
  color: whitesmoke;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  display: inline-flex;
  height: fit-content;
  position: relative;
  top: 86%;
  align-self: center;
}

.fade-in-map {
  animation: key-fade-in 2s ease-out forwards;
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
