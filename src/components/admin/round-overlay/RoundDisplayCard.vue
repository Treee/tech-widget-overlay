<template>
  <md-card md-with-hover class="card-style">
    <md-card-header>
      <div class="md-title">Rounds</div>      
    </md-card-header>
    <div v-for="(map,index) in rounds"
      :key="map.id"
      :id="map.id">
      <div class="md-card-header md-subhead">Round {{index+1}}</div>
      <md-card-content class="round-display-content">
        <md-field v-if="showPlayerDropdown()">
          <label :for="name+'-home'">Player Home Map</label>
          <md-select
            v-model="map.homePlayer"
            :name="name+'-home'"
            :id="name+'-home'">
            <md-option value></md-option>
            <md-option
              v-for="(value, index) in getPlayers()"
              :key="index"
              :value="value"
            >{{value}}</md-option>
          </md-select>
        </md-field>
        <md-field v-if="showPlayerDropdown()">
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
        <md-field>
          <label for="state">Map State</label>
          <md-select
            v-model="state"
            name="state"
            id="state"
          >
            <md-option value="current">Current</md-option>
            <md-option value="played">Played</md-option>
            <md-option value="banned">Banned</md-option>
            <md-option value="open">Open</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="teamOneCiv">Team One Civ</label>
          <md-select
            v-model="teamOneCiv"
            name="teamOneCiv"
            id="teamOneCiv"
          >
            <md-option value></md-option>
            <md-option
              v-for="(value, index) in getCivs()"
              :key="index"
              :value="value"
            >{{value}}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="teamTwoCiv">Team Two Civ</label>
          <md-select
            v-model="teamTwoCiv"
            name="teamTwoCiv"
            id="teamTwoCiv"
          >
            <md-option value></md-option>
            <md-option
              v-for="(value, index) in getCivs()"
              :key="index"
              :value="value"
            >{{value}}</md-option>
          </md-select>
        </md-field>
        <md-button
          class="md-raised md-accent"
          @click="deleteMap">
          <md-icon>delete</md-icon>
        </md-button>
        <md-menu md-direction="bottom-start">
          <div class="map-display" md-menu-trigger>
            <div class="image-container">
              <div
                class="map-frame"
                :style="getMapFrame"
              ></div>
              <div
                class="map-image"
                :style="getMapImage(map.id)"
              ></div>
              <div class="map-name">{{getMapName(map.id)}}</div>
            </div>
          </div>
        </md-menu>
      </md-card-content>
    </div>    
  </md-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RoundDisplayCard",
  data() {
    return {
      localRounds: [],
      name: "",
      homePlayer: "",
      winnerSelected: "",
      winner: "",
      state: {},
      teamOneCiv: "",
      teamTwoCiv: ""
    };
  },
  computed: {
    ...mapState({
      rounds: (state) => state.mapPickAndBanOverlayControlOptions.adminOptions,
      teamOneName: (state) => state.roundOverlay.team1Name,
      teamTwoName: (state) => state.roundOverlay.team2Name,
    }),    
    getMapFrame() {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/${this.getMapFrameImagePath()}")`,
      };
    }
  },
  components: {},
  methods: {
    deleteMap() {
      this.$store.dispatch("deleteRound", {
        mapIdToDelete: this.id,
      });
    },
    getMapImage(mapId) {
      let map = this.toKabobCase(mapId);
      if (map.split('-')[0] === '') {
        map = "unknown";
      }
      const mapFolder = this.$store.getters.isCustomMap(map)
        ? "custom"
        : "default";
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`,
      };
    },
    showPlayerDropdown() {
      return (
        this.teamOneName &&
        this.teamOneName !== "" &&
        this.teamTwoName &&
        this.teamTwoName !== ""
      );
    },
    getPlayers() {
      return [this.teamOneName || 'Team One', this.teamTwoName || 'Team Two'];
    },
    getCivs() {
      return this.$store.getters.getCivNames;
    },
    getMapName(mapId) {
      return this.$store.getters.getFormattedMapName(mapId);
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
  }
};
</script>

<style language="scss">
.round-display-content {
  display: inline-flex;  
}
/* .round-display-content .md-field {
  width: 20%;
} */
.map-display {
  width: 6rem;
  height: 6rem;
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
