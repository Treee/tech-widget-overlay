<template>
  <md-menu
    md-direction="bottom-start"
    v-on:md-closed="saveRoundState"
  >
    <md-menu-content>
      <md-menu-item v-if="showPlayerDropdown()">
        <md-field>
          <label :for="name+'-home'">Player Home Map</label>
          <md-select
            v-model="homePlayer"
            :name="name+'-home'"
            :id="name+'-home'"
          >
            <md-option value></md-option>
            <md-option
              v-for="(value, index) in getPlayers()"
              :key="index"
              :value="value"
            >{{value}}</md-option>
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
            <md-option
              v-for="(value, index) in getPlayers()"
              :key="index"
              :value="value"
            >{{value}}</md-option>
          </md-select>
        </md-field>
      </md-menu-item>
      <md-menu-item>
        <md-field>
          <label for="state">Map State</label>
          <md-select
            v-model="state"
            name="state"
            id="state"
          >
            <md-option value></md-option>
            <md-option value="current">Current</md-option>
            <md-option value="played">Played</md-option>
            <md-option value="banned">Banned</md-option>
            <md-option value="open">Open</md-option>
          </md-select>
        </md-field>
      </md-menu-item>
      <md-menu-item>
        <md-button
          class="md-raised md-accent"
          @click="deleteMap"
        >
          <md-icon>delete</md-icon>
        </md-button>
      </md-menu-item>
    </md-menu-content>
    <div
      class="map-display"
      md-menu-trigger
    >
      <div class="image-container">
        <div
          class="map-frame"
          :style="getMapFrame"
        ></div>
        <div
          class="map-image"
          :style="getMapImage"
        ></div>
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
        state: this.mapState,
        homePlayer: this.homeMapPlayer,
        winner: this.mapWwinner,
      };
    },
    props: {
      id: String,
      mapName: String,
      mapState: String,
      team1Name: String,
      team2Name: String,
      mapWinner: String,
      homeMapPlayer: String,
    },
    computed: {
      getMapImage() {
        const map = this.toKabobCase(this.name);
        const mapFolder = this.$store.getters.isCustomMap(map)
          ? "custom"
          : "default";
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`,
        };
      },
      getMapFrame() {
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/${this.getMapFrameImagePath()}")`,
        };
      },
    },
    methods: {
      saveRoundState() {
        // things that change, home player map, winner, map state
        this.$store.dispatch("saveRoundState", {
          mapIdToUpdate: this.id,
          homeMap: this.$data.homeMapPlayer,
          winner: this.$data.winner,
          mapState: this.$data.state,
        });
      },
      deleteMap() {
        this.$store.dispatch("deleteRound", {
          mapIdToDelete: this.id,
        });
      },
      showPlayerDropdown() {
        return (
          this.team1Name &&
          this.team1Name !== "" &&
          this.team2Name &&
          this.team2Name !== ""
        );
      },
      getPlayers() {
        return [this.team1Name, this.team2Name];
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
        if (this.mapState === "current") {
          mapFrame = "frame-current.png";
        } else if (this.mapState === "banned") {
          mapFrame = "frame-veto.png";
        } else if (this.mapState === "played") {
          mapFrame = "frame-previously-played.png";
        }
        // this is here because for some reason the data state is not updating with the props state
        return mapFrame;
      },
      toKabobCase(text) {
        return text.toLowerCase().split(" ").join("-");
      },
    },
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
