<template>
  <div class="map-list-controls">
    <md-switch v-model="controlOptions.mapOverlayVisible">Map Display</md-switch>
    <md-button class="md-raised">Update</md-button>
    <MapListDisplay />
    <md-button class="md-raised">Add Selected Maps</md-button>
    <md-switch v-model="controlOptions.showMapBrandingImage">Show Branding Image</md-switch>
    <md-field>
      <label>Branding Image Url (ex: https://www.myspecialImage.com)</label>
      <md-input v-model="controlOptions.brandingImageUrl"></md-input>
    </md-field>
    <md-field>
      <label for="num-picks">Num Picks</label>
      <md-input
        type="number"
        id="num-picks"
        name="num-picks"
        min="1"
        max="4"
        v-model="controlOptions.numPicks"
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
        v-model="controlOptions.numBans"
      />
    </md-field>
    <md-field>
      <label>Team 1</label>
      <md-input v-model="controlOptions.team1Name"></md-input>
    </md-field>
    <md-field>
      <label>Team 2</label>
      <md-input v-model="controlOptions.team2Name"></md-input>
    </md-field>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapListDisplay from "./MapListDisplay.vue";

export default {
  name: "MapPickBanOverlayControls",
  props: {},
  computed: {
    ...mapState({
      controlOptions: state => state.mapPickAndBanOverlayControlOptions
    })
  },
  components: {
    MapListDisplay
  }
};
</script>

<style language="scss">
.map-list-controls {
  width: 25%;
  display: inline-flex;
  flex-direction: column;
}
</style>
