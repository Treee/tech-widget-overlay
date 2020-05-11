<template>
  <div class="player-civ-overlay">
    <md-switch v-model="civDisplay" class="md-primary large-font">Civ Display</md-switch>
    <md-field>
      <label for="civ-names">Civilizations</label>
      <md-select v-model="selectedCivs" multiple name="civ-names" id="civ-names">
        <md-option value></md-option>
        <md-option
          v-for="(value, index) in this.$store.getters.getCivNames"
          :key="index"
          :value="value"
        >{{value}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "PlayerCivOverlayControls",
  props: {},
  data: () => ({
    selectedCivs: [],
    civDisplay: false
  })
};
</script>

<style language="scss">
.player-civ-overlay {
  border: 1px solid black;
}
</style>
