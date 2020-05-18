<template>
  <div class="upgrade-groups-wrapper" v-if="civName !== ''">
    <UpgradeGroup :is-visible="blacksmith" :group-name="'blacksmith'" :civ-name="civName" />
    <UpgradeGroup :is-visible="university" :group-name="'university'" :civ-name="civName" />
    <UpgradeGroup :is-visible="monastary" :group-name="'monastary'" :civ-name="civName" />
    <UpgradeGroup :is-visible="dock" :group-name="'dock'" :civ-name="civName" />
    <UpgradeGroup :is-visible="barracks" :group-name="'barracks'" :civ-name="civName" />
    <UpgradeGroup :is-visible="archeryRange" :group-name="'archeryRange'" :civ-name="civName" />
    <UpgradeGroup :is-visible="stable" :group-name="'stable'" :civ-name="civName" />
    <UpgradeGroup :is-visible="siegeWorkshop" :group-name="'siegeWorkshop'" :civ-name="civName" />
  </div>
</template>


<script>
import { mapState } from "vuex";

import UpgradeGroup from "./UpgradeGroup.vue";

export default {
  name: "UpgradeGroupWrapper",
  props: {
    civName: String
  },
  components: {
    UpgradeGroup
  },
  computed: {
    ...mapState({
      blacksmith: state => state.techUpgradeOverlayControlOptions.blacksmith,
      university: state => state.techUpgradeOverlayControlOptions.university,
      monastary: state => state.techUpgradeOverlayControlOptions.monastary,
      dock: state => state.techUpgradeOverlayControlOptions.dock,
      barracks: state => state.techUpgradeOverlayControlOptions.barracks,
      archeryRange: state =>
        state.techUpgradeOverlayControlOptions.archeryRange,
      stable: state => state.techUpgradeOverlayControlOptions.stable,
      siegeWorkshop: state =>
        state.techUpgradeOverlayControlOptions.siegeWorkshop
    })
  }
};
</script>

<style language="scss">
</style>
