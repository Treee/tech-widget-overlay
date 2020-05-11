<template>
  <div class="map-display">
    <div class="map-frame" :style="getMapFrame"></div>
    <div class="map-image" :style="getMapImage"></div>
    <div>{{mapName}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MapDisplay",
  props: {
    mapName: String,
    mapState: String
  },
  computed: {
    ...mapState({
      allMaps: state => state.customMaps.concat(state.defaultMaps)
    }),
    getMapImage() {
      const map = this.toKabobCase(this.mapName);
      const mapFolder = this.isCustomMap(map) ? "custom" : "default";
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
    isCustomMap(map) {
      return this.allMaps.some(customMap => {
        return map === customMap;
      });
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
  width: 6rem;
  height: 6rem;
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
</style>
