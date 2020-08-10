<template>
  <div class="my-row">
    <div class="my-column md-layout-item md-size-50">
      <md-switch
        v-model="isCivDisplayVisible"
        v-on:change="valueChanged"
        class="md-primary large-font"
      >Civ Display</md-switch>
      <input type="range" v-model="xPosition" v-on:change="valueChanged" step="0.5" />
      X: {{ xPosition }}%
      <input
        type="range"
        v-model="yPosition"
        v-on:change="valueChanged"
        step="0.5"
      />
      Y: {{ yPosition }}%
      <input
        type="range"
        v-model="width"
        v-on:change="valueChanged"
        step="0.5"
      />
      Width: {{ width }}%
    </div>
    <div class="my-column md-layout-item md-size-50">
      <md-switch
        v-model="showTeamColors"
        v-on:change="valueChanged"
        class="md-primary large-font"
      >Show Team Colors</md-switch>
      <md-switch
        v-model="showCurrentMapName"
        v-on:change="valueChanged"
        class="md-primary large-font"
      >Show Current Map</md-switch>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlayerCivDisplayControls",
  data() {
    return {
      xPosition: "37",
      yPosition: "9.5",
      width: "30",
      isCivDisplayVisible: this.controlOptions?.isCivDisplayVisible || false,
      showTeamColors: this.controlOptions?.showTeamColors || false,
      showCurrentMapName: this.controlOptions?.showCurrentMapName || false,
    };
  },
  computed: {
    ...mapState({
      controlOptions: (state) => state.miscOverlayControlOptions,
    }),
  },
  methods: {
    valueChanged() {
      this.$store.commit("updateMiscOverlayControlOptions", {
        ...this.$data,
      });
      this.$emit("miscOverlayEmit", { ...this.$data });
    },
  },
};
</script> 

<style language="scss">
.my-row {
  display: inline-flex;
  flex-direction: row;
}

.my-column {
  display: inline-flex;
  flex-direction: column;
}
</style>
