<template>
  <div class="map-display" md-menu-trigger>
    <div class="image-container">
      <div class="map-frame" :style="getMapFrame"></div>
      <div class="map-image" :style="getMapImage"></div>
      <div class="map-name">{{this.$store.getters.getFormattedMapName(name)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapDisplay",
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
        background: `url("/assets/images/maps/${mapFolder}/${map}.png")`
      };
    },
    getMapFrame() {
      return {
        background: `url("/assets/images/maps/frames/${this.getMapFrameImagePath()}")`
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
.map-display {
  width: 12rem;
  height: 12rem;
}

.image-container {
  width: inherit;
  height: inherit;
  display: inline-flex;
  justify-content: center;
}

.map-frame {
  width: inherit;
  height: inherit;
  background-size: cover !important;
  position: absolute;
  z-index: 2;
}

.map-image {
  width: inherit;
  height: inherit;
  background-size: cover !important;
  background-repeat: round !important;
  position: absolute;
  transform: scale(0.9) translateY(-3px) translateX(2px);
  z-index: 1;
}

.map-name {
  z-index: 2;
  font-size: larger;
  color: whitesmoke;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  display: inline-flex;
  height: fit-content;
  position: relative;
  top: 86%;
}
</style>
