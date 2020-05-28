<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50">
      <md-switch
        v-model="mapOverlayVisible"
        class="md-primary large-font"
        v-on:change="valueChanged"
      >Map Display</md-switch>
      <md-button class="md-raised" v-on:click="updateMapsClick">Update</md-button>
      <MapListSelect />
    </div>
    <div class="md-layout-item md-size-25" v-if="false">
      <md-switch
        v-model="showMapBrandingImage"
        class="md-primary large-font"
        v-on:change="valueChanged"
      >Show Branding Image</md-switch>
      <md-field>
        <label>Branding (https://www.myspecialImage.com)</label>
        <md-input v-model="brandingImageUrl" v-on:change="valueChanged"></md-input>
      </md-field>
    </div>
    <div class="md-layout-item" v-if="false">
      <md-field>
        <label for="num-picks">Num Picks</label>
        <md-input
          type="number"
          id="num-picks"
          name="num-picks"
          min="1"
          max="4"
          v-model="numPicks"
          v-on:change="valueChanged"
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
          v-on:change="valueChanged"
        />
      </md-field>
    </div>
    <div class="md-layout-item md-size-50">
      <md-field>
        <label>Team 1</label>
        <md-input v-model="team1Name" v-on:change="valueChanged"></md-input>
      </md-field>
      <md-field>
        <label>Team 2</label>
        <md-input v-model="team2Name" v-on:change="valueChanged"></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MapListSelect from "./MapListSelect.vue";

export default {
  name: "MapPickBanOverlayControls",
  data() {
    return {
      mapOverlayVisible: this.controlOptions?.mapOverlayVisible,
      showMapBrandingImage: this.controlOptions?.showMapBrandingImage,
      brandingImageUrl: this.controlOptions?.brandingImageUrl,
      numPicks: this.controlOptions?.numPicks || 1,
      numBans: this.controlOptions?.numBans || 1,
      team1Name: this.controlOptions?.team1Name,
      team2Name: this.controlOptions?.team2Name
    };
  },
  computed: {
    ...mapState({
      controlOptions: state => state.mapPickAndBanOverlayControlOptions
    })
  },
  components: {
    MapListSelect
  },
  methods: {
    valueChanged() {
      this.$store.commit("updateMapPickAndBanOverlayControls", {
        ...this.$data
      });
      if (this.$data.mapOverlayVisible) {
        this.$emit("mapOverlayShowBubble");
      } else {
        this.$emit("mapOverlayHideBubble");
      }
    },
    updateMapsClick() {
      if (this.$data.mapOverlayVisible) {
        this.$emit("mapOverlayShowBubble");
      }
    }
  }
};
</script>

<style language="scss">
</style>
