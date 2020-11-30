<template>
  <md-card md-with-hover class="card-style row-contents">
    <div class="scoreboard-card-content">
      <md-card-header>
        <div class="md-title">Scoreboard Controls</div>
        <div class="md-subhead">Toggle Visibility</div>
      </md-card-header>
      <md-card-content class="column-contents">
        <md-switch
          class="md-primary large-font"
          v-model="isCivDisplayVisible"
          v-on:change="valueChanged"
        >Civ Display</md-switch>
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
      </md-card-content>
    </div>
    <div class="scoreboard-card-content width-50p">
      <md-card-header>
        <div class="md-title">Overlay</div>
        <div class="md-subhead">Position</div>
      </md-card-header>
      <md-card-content class="column-contents width-100p">
        <div class="row-contents width-100p">
          <md-field class="input-percent">
            <label>Civ 1 X%</label>
            <md-input
              type="number"
              id="civ1x"
              v-model="civ1X"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
          <md-field class="input-percent">
            <label>Civ 1 Y%</label>
            <md-input
              type="number"
              id="civ1y"
              v-model="civ1Y"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
          <md-field class="input-percent">
            <label>Civ 1 Width%</label>
            <md-input
              type="number"
              id="civ1width"
              v-model="civ1Width"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
        </div>
        <div class="row-contents width-100p">
          <md-field class="input-percent">
            <label>Civ 2 X%</label>
            <md-input
              type="number"
              id="civ2x"
              v-model="civ2X"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
          <md-field class="input-percent">
            <label>Civ 2 Y%</label>
            <md-input
              type="number"
              id="civ2y"
              v-model="civ2Y"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
          <md-field class="input-percent">
            <label>Civ 2 Width%</label>
            <md-input
              type="number"
              id="civ2width"
              v-model="civ2Width"
              v-on:change="valueChanged"
              step="0.5"
              max="100"
              min="0"
            ></md-input>
          </md-field>
        </div>
      </md-card-content>
    </div>
  </md-card>
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
      showCurrentMapName: this.controlOptions?.showCurrentMapName || false
    };
  },
  computed: {
    ...mapState({
      controlOptions: state => state.miscOverlayControlOptions
    })
  },
  methods: {
    valueChanged() {
      this.$store.commit("updateMiscOverlayControlOptions", {
        ...this.$data
      });
      this.$emit("miscOverlayEmit", { ...this.$data });
    }
  }
};
</script> 

<style language="scss">
.input-percent.md-field {
  display: inline-flex;
  margin: 0.25rem;
}
.card-switch {
  margin: 0.25rem;
}
.scoreboard-card-content {
  display: inline-flex;
  align-items: baseline;
}
</style>
