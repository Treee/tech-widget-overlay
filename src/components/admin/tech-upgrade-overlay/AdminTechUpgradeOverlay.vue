<template>
  <div class="admin-tech-upgrade-overlay">
    <TechUpgradeOverlayControls v-on:bubble-up-child="bubbleUp" />
    <CivListDisplay class="admin-civ-list-display" :civ-list="this.$store.getters.getCivNames" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TechUpgradeOverlayControls from "./TechUpgradeOverlayControls.vue";
import CivListDisplay from "./CivListDisplay.vue";

export default {
  name: "AdminTechUpgradeOverlay",
  props: {},
  computed: {
    ...mapState({
      controlOptions: state => state.techUpgradeOverlayControlOptions
    })
  },
  components: {
    CivListDisplay,
    TechUpgradeOverlayControls
  },
  methods: {
    bubbleUp(data) {
      this.$emit("techOverlayShow", data);
    }
  }
};
</script>

<style language="scss">
.admin-tech-upgrade-overlay {
  margin-top: 1rem;
  border: 1px black solid;
  width: 90vw;
  display: inline-block;
}

.admin-civ-list-display {
  width: 90vw;
  display: inline-block;
}
</style>
