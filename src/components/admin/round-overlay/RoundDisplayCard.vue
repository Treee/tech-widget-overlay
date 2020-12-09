<template>
  <md-card
    md-with-hover
    class="card-style round-display"
  >
    <md-card-header>
      <div class="md-title">Rounds</div>
    </md-card-header>
    <div
      v-for="(map,index) in rounds"
      :key="map.id"
      :id="map.id"
    >
      <div class="md-card-header md-subhead">Round {{index+1}}</div>
      <md-card-content class="row-contents">
        <div class="column-contents">
          <div class="md-card-header md-subhead">Home Map</div>
          <div v-if="showPlayerDropdown()">
            <md-checkbox
              v-model="map.homePlayer"
              :value="teamOneName"
              :disabled="isRoundControlDisabled(map.state)"
            >{{teamOneName}}</md-checkbox>
            <md-checkbox
              v-model="map.homePlayer"
              :value="teamTwoName"
              :disabled="isRoundControlDisabled(map.state)"
            >{{teamTwoName}}</md-checkbox>
          </div>
          <div v-if="showPlayerDropdown()">
            <div class="md-card-header md-subhead">Winner</div>
            <md-checkbox
              v-model="map.winner"
              :value="teamOneName"
              :disabled="isRoundControlDisabled(map.state)"
              @change="winnerSelected(map.winner, map.id)"
            >{{teamOneName}}</md-checkbox>
            <md-checkbox
              v-model="map.winner"
              :value="teamTwoName"
              :disabled="isRoundControlDisabled(map.state)"
              @change="winnerSelected(map.winner, map.id)"
            >{{teamTwoName}}</md-checkbox>
          </div>
        </div>
        <div class="column-contents">
          <md-menu
            class="custom-menu"
            :md-offset-x="1"
            :mdCloseOnClick="false"
            :mdCloseOnSelect="false"
          >
            <md-button
              md-menu-trigger
              :disabled="isRoundControlDisabled(map.state)"
              class="md-raised md-primary md-icon-button show-tech-button"
            >
              <md-icon>groups</md-icon>
            </md-button>
            <md-menu-content class="custom-menu-content">
              <md-card-header>
                <div class="md-title">Team One</div>
              </md-card-header>
              <div class="civ-selection-list">
                <md-menu-item
                  v-for="(draftCiv) in teamOneCivDraft"
                  :key="draftCiv.civ"
                  :id="draftCiv.civ"
                  @click="selectTeamCivs(draftCiv.civ, map.id, 'team1')"
                >
                  <div
                    class="civ-icon-group"
                    :class="{'active' : isCivSelected(map.teamOneCiv, draftCiv.civ), 'faded' : isCivDisabled(map.teamOneCiv)}"
                  >
                    <div
                      class="civ-icon"
                      :style="civIconStyle(draftCiv.civ)"
                    />
                    <div
                      class="civ-unique-unit unique-unit-container"
                      :style="uniqueUnitStyle(draftCiv.civ)"
                    />
                    <div class="civ-name">
                      {{getMapName(draftCiv.civ)}}
                    </div>
                  </div>
                </md-menu-item>
              </div>
              <md-card-header>
                <div class="md-title">Team Two</div>
              </md-card-header>
              <div class="civ-selection-list">
                <md-menu-item
                  v-for="(draftCiv) in teamTwoCivDraft"
                  :key="draftCiv.civ+'1'"
                  :id="draftCiv.civ"
                  @click="selectTeamCivs(draftCiv.civ, map.id, 'team2')"
                >
                  <div
                    class="civ-icon-group"
                    :class="{'active' : isCivSelected(map.teamTwoCiv, draftCiv.civ), 'faded' : isCivDisabled(map.teamTwoCiv)}"
                  >
                    <div
                      class="civ-icon"
                      :style="civIconStyle(draftCiv.civ)"
                    />
                    <div
                      class="civ-unique-unit unique-unit-container"
                      :style="uniqueUnitStyle(draftCiv.civ)"
                    />
                    <div class="civ-name">
                      {{getMapName(draftCiv.civ)}}
                    </div>
                  </div>
                </md-menu-item>
              </div>
            </md-menu-content>
          </md-menu>
          <md-button
            :disabled="isRoundControlDisabled(map.state)"
            class="md-raised md-icon-button show-tech-button"
            @click="showOverlayClick(map)"
          >
            <md-icon>science</md-icon>
          </md-button>
        </div>
        <md-checkbox
          v-model="map.state"
          value="banned"
        >Banned</md-checkbox>
        <md-menu
          class="custom-menu"
          :md-offset-x="127"
          :md-offset-y="-400"
        >
          <div
            class="map-display"
            md-menu-trigger
          >
            <div class="image-container">
              <div
                class="map-frame"
                :style="getMapFrame(map.state)"
              ></div>
              <div
                class="map-image"
                :style="getMapImage(map.id)"
              ></div>
              <div class="map-name">{{getMapName(map.id)}}</div>
            </div>
          </div>
          <md-menu-content class="custom-menu-content">
            <md-card-header>
              <div class="md-title">Default Maps</div>
            </md-card-header>
            <div class="map-menu-items">
              <md-menu-item
                v-for="(defaultMap) in getDefaultMaps()"
                :key="defaultMap"
                :id="defaultMap"
                @click="selectMenuMap(defaultMap, map.id)"
              >
                <div class="map-display">
                  <div class="image-container">
                    <div
                      class="map-frame"
                      :style="getMapFrame('open')"
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
              <md-menu-item
                v-for="(customMap) in getCustomMaps()"
                :key="customMap"
                :id="customMap"
                @click="selectMenuMap(customMap, map.id)"
              >
                <div class="map-display">
                  <div class="image-container">
                    <div
                      class="map-frame"
                      :style="getMapFrame('open')"
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
          @click="deleteMap(map.id)"
        >
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
        roundMode: (state) => state.roundOverlay.roundMode,
        rounds: (state) => state.mapPickAndBanOverlayControlOptions.adminOptions,
        teamOneName: (state) => state.roundOverlay.team1Name,
        teamOneCivDraft: (state) =>
          state.roundOverlay.teamOneCivDraft || this.getCivs(),
        teamTwoCivDraft: (state) => state.roundOverlay.teamTwoCivDraft,
        teamTwoName: (state) => state.roundOverlay.team2Name,
      }),
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
          mapToReplace: mapId,
        });
      },
      winnerSelected(winner, mapId) {
        let nextMapState = "current";
        if (winner && winner !== "") {
          nextMapState = "played";
          // set next map state to current
        }
        this.$store.dispatch("setWinnerModifyMapState", {
          mapIdToModify: mapId,
          newMapState: nextMapState,
        });
      },
      selectTeamCivs(selectedCiv, mapId, teamCivs) {
        const teamCivDraft = this.$store.getters.getTeamSelectedCivDraft(
          mapId,
          teamCivs
        );
        if (!this.checkMaxCivsSelected(teamCivDraft, selectedCiv)) {
          this.$store.dispatch("setSelectedCivsForTeam", {
            mapIdToModify: mapId,
            selectedCiv: selectedCiv,
            team: teamCivs,
          });
        }
      },
      showOverlayClick(mapInfo) {        
        this.$emit("roundTech", mapInfo);
      },
      isCivSelected(chosenCivilizations, civToCheck) {
        return (
          chosenCivilizations?.filter((chosenCiv) => {
            return chosenCiv === civToCheck;
          }).length > 0
        );
      },
      isCivDisabled(chosenCivilizations) {
        return chosenCivilizations?.length > this.roundMode;
      },
      isRoundControlDisabled(mapState) {
        return mapState === "banned";
      },
      checkMaxCivsSelected(selectedCivs, currentCiv) {
        // is this civ in the list of selected civs
        const currentCivSelected =
          selectedCivs?.filter((civ) => {
            return civ === currentCiv;
          }).length > 0;
        // are we at max civs selected?
        const maxCivsSelected = selectedCivs?.length > this.roundMode;
        // we want to disable any civ that is not already selected when hitting the max
        return maxCivsSelected && !currentCivSelected;
      },
      getMapImage(mapId) {
        let map = this.toKabobCase(mapId);
        let mapParts = map.split("-");
        // if the last part is a number we know to remove it fopr rendering the image
        if (!isNaN(mapParts[mapParts.length - 1])) {
          mapParts = mapParts.slice(0, [mapParts.length - 1]);
          map = mapParts.join("-");
        }
        const mapFolder = this.$store.getters.isCustomMap(map)
          ? "custom"
          : "default";
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`,
        };
      },
      civIconStyle(civName) {
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-icons/${civName?.toLowerCase()}.png")`,
          "background-size": "contain",
          "background-repeat": "no-repeat",
        };
      },
      uniqueUnitStyle(civName) {
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${civName?.toLowerCase()}.tp.png`,
          "background-size": "cover",
          "background-repeat": "no-repeat",
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
        return [this.teamOneName || "Team One", this.teamTwoName || "Team Two"];
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
      getMapFrame(mapState) {
        let mapFrame = "frame.png";
        if (mapState === "current") {
          mapFrame = "frame-current.png";
        } else if (mapState === "banned") {
          mapFrame = "frame-veto.png";
        } else if (mapState === "played") {
          mapFrame = "frame-previously-played.png";
        }
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/${mapFrame}")`,
        };
      },
      toKabobCase(text) {
        return text.toLowerCase().split(" ").join("-");
      },
    },
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
  .round-display .custom-menu {
    max-width: none;
  }
  .round-display .md-checkbox {
    margin: 0.25rem;
  }
  .round-display .md-checkbox-label {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  .civ-selection-list {
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
  }
  .civ-selection-list .civ-name {
    font-size: medium;
  }
  .custom-menu-content .unique-unit-container {
    box-shadow: none;
  }
  .custom-menu-content .md-list-item {
    display: inline-flex;
    width: 5rem;
  }
  .custom-menu-content .md-list-item .active {
    background-color: rgba(0, 125, 0, 125);
  }
  .custom-menu-content .map-menu-items .md-list-item {
    display: inline-flex;
    width: 8rem;
  }
  .custom-menu-content .md-list-item-content {
    display: inline-flex;
    flex-flow: column;
  }
  .custom-menu-content .md-list-item-content > .md-checkbox:first-child {
    margin: 0;
  }
  .custom-menu-content .civ-icon {
    position: relative;
  }
  .custom-menu-content .civ-unique-unit {
    position: absolute;
  }
  .custom-menu-content {
    max-width: none;
    width: 50vw;
    max-height: 80vh;
  }
  .custom-menu-content .md-list {
    background-color: burlywood;
    padding: 0;
  }
  .custom-menu-content .md-title {
    margin: 0;
    text-align: center;
    background-color: sandybrown;
  }
  .custom-menu-content .md-list-item-default {
    width: 8rem;
  }
  .custom-menu-content .md-list-item-default:hover {
    background-color: rgba(0, 125, 0, 125);
  }
  .show-tech-button {
    margin: 0.25rem;
  }
  .civ-icon-group {
    display: inline-flex;
    flex-flow: column;
    align-items: center;
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
