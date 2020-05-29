<template>
  <md-menu md-direction="bottom-start" v-on:md-closed="menuClosed">
    <md-menu-content>
      <md-menu-item v-if="showPlayerDropdown()">
        <md-field>
          <label :for="name+'-home'">Player Home Map</label>
          <md-select v-model="homeMapPlayer" :name="name+'-home'" :id="name+'-home'">
            <md-option value></md-option>
            <md-option v-for="(value, index) in getPlayers()" :key="index" :value="value">{{value}}</md-option>
          </md-select>
        </md-field>
      </md-menu-item>
      <md-menu-item v-if="showPlayerDropdown()">
        <md-field>
          <label :for="name+'-winner'">Winner!!</label>
          <md-select
            v-model="winner"
            :name="name+'-winner'"
            :id="name+'-winner'"
            v-on:md-selected="winnerSelected"
          >
            <md-option value></md-option>
            <md-option v-for="(value, index) in getPlayers()" :key="index" :value="value">{{value}}</md-option>
          </md-select>
        </md-field>
      </md-menu-item>
      <md-menu-item>
        <div class="md-layout" v-on:click.prevent="mapStateRadioButtonClick">
          <md-radio v-model="state" class="md-primary" value="current">Current</md-radio>
          <md-radio v-model="state" class="md-primary" value="played">Played</md-radio>
          <md-radio v-model="state" class="md-primary" value="banned">Banned</md-radio>
          <md-radio v-model="state" class="md-primary" value="open">Open</md-radio>
        </div>
      </md-menu-item>
    </md-menu-content>
    <div class="map-display" md-menu-trigger>
      <div class="image-container">
        <div class="map-frame" :style="getMapFrame"></div>
        <div class="map-image" :style="getMapImage"></div>
        <div class="map-name">{{this.$store.getters.getFormattedMapName(name)}}</div>
      </div>
    </div>
  </md-menu>
</template>

<script>
export default {
  name: "MapDisplay",
  data() {
    return {
      name: this.mapName,
      state: this.currentState.state,
      homeMapPlayer: this.currentState.homeMapPlayer,
      winner: this.currentState.winner
    };
  },
  props: {
    mapName: String,
    currentState: Object
  },
  computed: {
    getState() {
      return this.currentState.state;
    },
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
    mapStateRadioButtonClick(event) {
      if (this.state === "current") {
        this.menuClosed();
        this.$emit("scoreboardChildBubbleUp");
        // raise event to send scoreboard overlay map name
      }
      event.stopPropagation();
    },
    menuClosed() {
      this.$store.commit("updateMapState", {
        ...this.$data
      });
    },
    showPlayerDropdown() {
      return (
        this.$store.getters.getPlayerNames[0] &&
        this.$store.getters.getPlayerNames[0] !== "" &&
        this.$store.getters.getPlayerNames[1] &&
        this.$store.getters.getPlayerNames[1] !== ""
      );
    },
    getPlayers() {
      return this.$store.getters.getPlayerNames;
    },
    winnerSelected(winner) {
      if (winner !== "") {
        this.state = "played";
      } else {
        this.state = "open";
      }
    },
    getMapFrameImagePath() {
      let mapFrame = "frame.png";
      if (this.getState === "current") {
        mapFrame = "frame-current.png";
      } else if (this.getState === "banned") {
        mapFrame = "frame-veto.png";
      } else if (this.getState === "played") {
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
