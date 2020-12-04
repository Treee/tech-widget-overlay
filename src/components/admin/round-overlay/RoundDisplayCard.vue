<template>
  <md-card md-with-hover class="card-style round-display">
    <md-card-header>
      <div class="md-title">Rounds</div>      
    </md-card-header>
    <div v-for="(map,index) in rounds"
      :key="map.id"
      :id="map.id">
      <div class="md-card-header md-subhead">Round {{index+1}}</div>
      <md-card-content class="row-contents">
        <div class="column-contents">
          <md-field v-if="showPlayerDropdown()">            
            <md-select
              placeholder="Home Map"
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
            <md-select
              placeholder="Winner!!"
              v-model="map.winner"
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
        </div>
        <div class="column-contents">             
          <md-field>
            <md-select
              placeholder="Team One Civ"
              v-model="map.teamOneCiv"
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
            <md-select
              placeholder="Team Two Civ"
              v-model="map.teamTwoCiv"
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
        </div>
        <div class="column-contents">
          <md-field>            
            <md-select
              placeholder="Map State"
              v-model="map.state"
              name="state"
              id="state"
            >
              <md-option value="current">Current</md-option>
              <md-option value="played">Played</md-option>
              <md-option value="banned">Banned</md-option>
              <md-option value="open">Open</md-option>
            </md-select>
          </md-field> 
        </div>
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
        <md-button
          class="md-raised md-accent"
          @click="deleteMap(map.id)">
          <md-icon>delete</md-icon>
        </md-button>
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
    deleteMap(mapId) {
      this.$store.dispatch("deleteRound", {
        mapIdToDelete: mapId,
      });
    },
    getMapImage(mapId) {
      let map = this.toKabobCase(mapId);
      if (map.split('-')[0] === 'unknown') {
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
.round-display .md-field {
  padding: 0.25rem;
  margin: 0.25rem;
  height: 1rem;
  min-height: 2rem;
}
.round-display .md-menu.md-select {
  overflow: hidden;
}
.round-display .md-field label {
  top: initial;
}
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
  color: whitesmoke;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  display: inline-flex;
  height: fit-content;
  position: relative;
  top: 80%;
}
</style>
