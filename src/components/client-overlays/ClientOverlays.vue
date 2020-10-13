<template>
  <div>
    <ScoreboardOverlay />
    <CivBonusOverlay
      :civ1="techOverlayOptions.civ1"
      :civ1-description="this.$store.getters.getCivDescription(techOverlayOptions.civ1)"
      :civ2="techOverlayOptions.civ2"
      :civ2-description="this.$store.getters.getCivDescription(techOverlayOptions.civ2)"
      :playSound="techOverlayOptions.sound"
    />
    <MapOverlay
      :selected-maps-and-state="selectedMaps"
      :players="players"
    />
    <AnimatedGroupOverlay v-if="false" />

    <!-- <object
      data="https://bobstuff.org/cmoverlay/index.html#/overlay/5bc51522b1368b6070a3d033"
      class="custom-embed"
    >
      <embed
        src="https://bobstuff.org/cmoverlay/index.html#/overlay/5bc51522b1368b6070a3d033"
        class="custom-embed"
      />
      Error: Embedded data could not be displayed.
    </object> -->
  </div>
</template>

<script>
  import { mapState } from "vuex";

  import CivBonusOverlay from "./tech-upgrade-overlay/CivBonusOverlay.vue";
  import MapOverlay from "./maps-overlay/MapOverlay.vue";
  import ScoreboardOverlay from "./scoreboard-overlay/ScoreboardOverlay.vue";
  import AnimatedGroupOverlay from "./animated-media-overlay/AnimatedGroupOverlay.vue";

  export default {
    name: "ClientOverlay",
    components: {
      CivBonusOverlay,
      MapOverlay,
      ScoreboardOverlay,
      AnimatedGroupOverlay,
    },
    created: () => {
      console.log("client overlay created");
    },
    computed: {
      ...mapState({
        techOverlayOptions: (state) => state.techUpgradeOverlayControlOptions,
        selectedMaps: (state) => state.clientControlOptions.selectedMapsAndState,
        players: (state) => state.clientControlOptions.players,
      }),
    },
  };
</script>

<style>
</style>
