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
              v-on:md-selected="homeMapSelected()"
              placeholder="Home Map"
              v-model="map.homePlayer"
              :name="map.id+'-home'"
              :id="map.id+'-home'">
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
              :name="map.id+'-winner'"
              :id="map.id+'-winner'"
              v-on:md-selected="winnerSelected(map.winner, map.id)"
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
        <md-menu class="menu-map" :md-offset-x="127" :md-offset-y="-400">
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
          <md-menu-content class="menu-content-map">
            <md-card-header>
              <div class="md-title">Default Maps</div>      
            </md-card-header>
            <div class="map-menu-items">
              <md-menu-item v-for="(defaultMap) in getDefaultMaps()" :key="defaultMap" :id="defaultMap" @click="selectMenuMap(defaultMap, map.id)">
                <div class="map-display">
                  <div class="image-container">
                    <div
                      class="map-frame"
                      :style="getMapFrame"
                    ></div>
                    <div
                      class="map-image"
                      :style="getMapImage(defaultMap)"
                    ></div>
                    <div class="map-name">{{getMapName(defaultMap)}}</div>
                  </div>
                </div>
              </md-menu-item>
            </div>
            <md-card-header>
              <div class="md-title">Custom Maps</div>      
            </md-card-header>
            <div class="map-menu-items">
              <md-menu-item v-for="(customMap) in getCustomMaps()" :key="customMap" :id="customMap" @click="selectMenuMap(customMap, map.id)">
                <div class="map-display">
                  <div class="image-container">
                    <div
                      class="map-frame"
                      :style="getMapFrame"
                    ></div>
                    <div
                      class="map-image"
                      :style="getMapImage(customMap)"
                    ></div>
                    <div class="map-name">{{getMapName(customMap)}}</div>
                  </div>
                </div>
              </md-menu-item>
            </div>
          </md-menu-content>
        </md-menu>
        <md-button
          class="md-raised md-accent md-icon-button"
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
    selectMenuMap(selectedMap, mapId) {
      this.$store.dispatch("updateMapSelected", {
        selectedMap,
        mapToReplace: mapId
      });      
    },
    winnerSelected(winner, mapId) {
      let nextMapState = "current";
      if (winner !== "") {
        nextMapState = "played";
        // set next map state to current
      }
      console.log(mapId);
      console.log(nextMapState);
    },
    getMapImage(mapId) {
      let map = this.toKabobCase(mapId);
      let mapParts = map.split('-');
      // if the last part is a number we know to remove it fopr rendering the image
      if (!isNaN(mapParts[mapParts.length - 1])) {
        mapParts = mapParts.slice(0, [mapParts.length - 1]);
        map = mapParts.join('-');
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
    getDefaultMaps() {
      return this.$store.getters.getDefaultMaps;
    },
    getCustomMaps() {
      return this.$store.getters.getCustomMaps;
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
.round-display .menu-map {
  max-width: none;
}
.menu-content-map {
  max-width: none;
  width: 50vw;
  max-height: 95vh;
  height: 75vh;
}
.menu-content-map .md-list {
  background-color: burlywood;
  padding: 0;
}
.menu-content-map .md-title {
  margin: 0;
  text-align: center;
  background-color: sandybrown;
}
.menu-content-map .md-list-item-default {
  width: 8rem;
}
.menu-content-map .md-list-item-default:hover {
  background-color: rgba(0, 125, 0, 125);
}
.map-display {
  width: 6rem;
  height: 6rem;
}
.map-menu-items {
  display: inline-flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
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
