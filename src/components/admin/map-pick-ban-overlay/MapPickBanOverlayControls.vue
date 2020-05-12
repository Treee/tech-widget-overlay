<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-switch
        v-model="controlOptions.mapOverlayVisible"
        class="md-primary large-font"
      >Map Display</md-switch>
      <md-button class="md-raised">Update</md-button>
      <MapListSelect />
    </div>
    <div class="md-layout-item md-size-40">
      <md-switch
        v-model="controlOptions.showMapBrandingImage"
        class="md-primary large-font"
      >Show Branding Image</md-switch>
      <md-field>
        <label>Branding Image Url (ex: https://www.myspecialImage.com)</label>
        <md-input v-model="controlOptions.brandingImageUrl"></md-input>
      </md-field>
    </div>
    <div class="md-layout-item">
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
    </div>
    <div class="md-layout-item">
      <md-field>
        <label>Team 1</label>
        <md-input v-model="controlOptions.team1Name"></md-input>
      </md-field>
      <md-field>
        <label>Team 2</label>
        <md-input v-model="controlOptions.team2Name"></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapListSelect from "./MapListSelect.vue";

export default {
  name: "MapPickBanOverlayControls",
  props: {},
  computed: {
    ...mapState({
      controlOptions: state => state.mapPickAndBanOverlayControlOptions
    })
  },
  components: {
    MapListSelect
  }
};
</script>

<style language="scss">
</style>
