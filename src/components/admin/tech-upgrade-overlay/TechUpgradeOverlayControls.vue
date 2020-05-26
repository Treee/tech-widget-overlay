<template>
  <div>
    <md-button class="md-raised" v-on:click="clearAllClick">Clear All</md-button>
    <md-button class="md-raised" v-on:click="showOverlayClick">Show Overlay</md-button>
    <md-switch v-model="sound" v-on:change="valueChanged" class="md-primary large-font">Sound</md-switch>
    <md-switch v-model="tech" v-on:change="valueChanged" class="md-primary large-font">Tech</md-switch>
    <md-switch
      v-model="blacksmith"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Blacksmith</md-switch>
    <md-switch
      v-model="university"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >University</md-switch>
    <md-switch
      v-model="monastary"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Monastary</md-switch>
    <md-switch v-model="dock" v-on:change="valueChanged" class="md-primary large-font">Dock</md-switch>
    <md-switch v-model="barracks" v-on:change="valueChanged" class="md-primary large-font">Barracks</md-switch>
    <md-switch
      v-model="archeryRange"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Archery Range</md-switch>
    <md-switch v-model="stable" v-on:change="valueChanged" class="md-primary large-font">Stable</md-switch>
    <md-switch
      v-model="siegeWorkshop"
      v-on:change="valueChanged"
      class="md-primary large-font"
    >Siege Workshop</md-switch>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TechUpgradeOverlayControls",
  computed: {
    ...mapState({
      controlOptions: state => state.techUpgradeOverlayControlOptions
    })
  },
  data() {
    return {
      sound: this.controlOptions?.sound || true,
      tech: this.controlOptions?.tech || true,
      blacksmith: this.controlOptions?.blacksmith,
      university: this.controlOptions?.university,
      monastary: this.controlOptions?.monastary,
      dock: this.controlOptions?.dock,
      barracks: this.controlOptions?.barracks,
      archeryRange: this.controlOptions?.archeryRange,
      stable: this.controlOptions?.stable,
      siegeWorkshop: this.controlOptions?.siegeWorkshop
    };
  },
  methods: {
    clearAllClick() {
      this.sound = this.tech = true;
      this.blacksmith = this.university = this.monastary = this.dock = false;
      this.barracks = this.archeryRange = this.stable = this.siegeWorkshop = false;
      // this.$store.commit("clearCivs");
      this.$emit("bubble-up-clear-all-child");
    },
    showOverlayClick() {
      console.log({ ...this.$data });
      this.$emit("bubble-up-overlay-child", { ...this.$data });
    },
    toCamelCase(text) {
      let camelCase = "";
      text.split("-").forEach(word => {
        camelCase = camelCase
          .concat(word.charAt(0).toUpperCase())
          .concat(word.substring(1))
          .concat(" ");
      });
      return camelCase;
    },
    valueChanged() {
      this.$store.commit("updateTechUpgradeOverlayControlOptions", {
        ...this.$data
      });
    }
  }
};
</script>

<style language="scss">
</style>
