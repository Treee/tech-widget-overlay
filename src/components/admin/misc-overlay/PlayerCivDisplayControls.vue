<template>
  <div>
    <div class="force-columns md-layout-item">
      <md-switch
        class="md-size-10 md-primary large-font"
        v-model="isCivDisplayVisible"
        v-on:change="valueChanged"
        >Civ Display</md-switch>
      <div class="md-layout-item md-size-45">
        <div>Civ 1</div>
        <label class="my-label" for="civ1x">X:</label>
        <input
          class="my-input"
          type="number"
          id="civ1x"          
          v-model="civ1X"
          v-on:change="valueChanged"   
          step="0.5"
          max="100"
          min="0"
        />%
        <br>
        <label class="my-label" for="civ1y">Y:</label>
        <input
          class="my-input"
          type="number"
          id="civ1y"          
          v-model="civ1Y"
          v-on:change="valueChanged"
          step="0.5"
          max="100"
          min="0"        
        />%
        <br>
        <label class="my-label" for="civ1width">Width:</label>
        <input
          class="my-input"
          type="number"
          id="civ1width"
          v-model="civ1Width"
          v-on:change="valueChanged"    
          step="0.5"
          max="100"
          min="0"     
        />%
        <br>
      </div>
      <div class="md-layout-item md-size-45">
        <div>Civ 2</div>
        <label class="my-label" for="civ2x">X:</label>
        <input
          class="my-input"
          type="number"
          id="civ2x"
          v-model="civ2X"
          v-on:change="valueChanged"
          step="0.5"
          max="100"
          min="0"
        />%
        <br>
        <label class="my-label" for="civ2y">Y:</label>
        <input
          class="my-input"
          type="number"
          id="civ2y"
          v-model="civ2Y"
          v-on:change="valueChanged"
          step="0.5"
          max="100"
          min="0"
        />%
        <br>
        <label class="my-label" for="civ2width">Width:</label>
        <input
          class="my-input"
          type="number"
          id="civ2width"
          v-model="civ2Width"
          v-on:change="valueChanged"
          step="0.5"
          max="100"
          min="0"
        />%
        <br>
      </div>
    </div>
    <div class="md-layout-item">
      <md-switch
        v-model="showTeamColors"
        v-on:change="valueChanged"
        class="md-primary large-font"
        >Show Team Colors</md-switch
      >
      <md-switch
        v-model="showCurrentMapName"
        v-on:change="valueChanged"
        class="md-primary large-font"
        >Show Current Map</md-switch
      >
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "PlayerCivDisplayControls",
    data() {
      return {
        civ1X: "37",
        civ1Y: "6.5",
        civ1Width: "25.5",
        civ2X: "57",
        civ2Y: "6.5",
        civ2Width: "25.5",
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
  .my-input {
    min-width: 25%;
    max-width: 25%;
  }

  .my-label {
    min-width: 10%;
    max-width: 25%;
  }

  .force-columns {
    display: inline-flex;
    flex-direction: row;
  }
</style>
