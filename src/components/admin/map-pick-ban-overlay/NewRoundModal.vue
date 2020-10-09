<template>
  <div class="md-layout md-gutter">
    <div>
      <md-switch
        v-model="mapOverlayVisible"
        class="md-primary large-font"
      >Map Display</md-switch>
      <md-button
        class="md-raised"
        v-on:click="updateMapsClick"
      >Update</md-button>

      <md-dialog
        class="screen-centered"
        :md-active.sync="newRoundDialog"
      >
        <md-dialog-title>Preferences</md-dialog-title>

        <md-field>
          <label for="map-names">Map List</label>
          <md-select
            v-model="selectedMapName"
            name="map-names"
            id="map-names"
          >
            <md-option
              v-for="(value, index) in this.$store.getters.getAllMaps"
              :key="index"
              :value="value"
            >{{getPrettyMapName(value)}}
            </md-option>
          </md-select>
        </md-field>

        <md-field>
          <label for="num-picks">Num Picks</label>
          <md-input
            type="number"
            id="num-picks"
            name="num-picks"
            min="1"
            max="4"
            v-model="numPicks"
          />
        </md-field>
        <md-field>
          <label for="num-bans">Num Bans</label>
          <md-input
            type="number"
            id="num-bans"
            name="num-bans"
            min="0"
            max="10"
            v-model="numBans"
          />
        </md-field>
        <md-field>
          <label>Team 1</label>
          <md-input v-model="team1Name"></md-input>
        </md-field>
        <md-field>
          <label>Team 2</label>
          <md-input v-model="team2Name"></md-input>
        </md-field>
        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="confirmDialog(false)"
          >Close</md-button>
          <md-button
            class="md-primary"
            @click="confirmDialog(true)"
          >Save</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-button
        class="md-raised"
        @click="newRoundDialog = true"
      >New Round</md-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "NewRoundModal",
    data() {
      return {
        mapOverlayVisible: this.controlOptions?.mapOverlayVisible,
        selectedMapName: this.controlOptions?.selectedMapName,
        numPicks: this.controlOptions?.numPicks || 1,
        numBans: this.controlOptions?.numBans || 1,
        team1Name: this.controlOptions?.team1Name,
        team2Name: this.controlOptions?.team2Name,
        newRoundDialog: false,
      };
    },
    computed: {
      ...mapState({
        controlOptions: (state) => state.mapPickAndBanOverlayControlOptions,
      }),
    },
    methods: {
      getPrettyMapName(rawMapName) {
        return this.$store.getters.getFormattedMapName(rawMapName) || "";
      },
      confirmDialog(isSaved) {
        if (isSaved) {
          this.$store.dispatch("addNewPlayerRound", {
            ...this.$data,
            mapState: "open",
          });
          this.updateMapsClick();
        }
        this.newRoundDialog = false;
      },
      updateMapsClick() {
        if (this.$data.mapOverlayVisible) {
          this.$emit("mapOverlayShowBubble");
        } else {
          this.$emit("mapOverlayHideBubble");
        }
      },
    },
  };
</script>

<style language="scss">
  .screen-centered {
    top: inherit;
    transform: translate(0%, 0%) scale(1) !important;
  }
</style>
