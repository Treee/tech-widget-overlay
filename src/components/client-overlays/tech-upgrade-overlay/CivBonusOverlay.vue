<template>
  <div class="tech-overlay-wrapper">
    <civ-bonus
      :civ-name="civ1"
      :civ-description="civ1Description"
      :play-sound="playSound"
      :play-sound-order="0"
    />
    <UpgradeGroupWrapper :civ-name="civ1" />
    <UpgradeGroupWrapper :civ-name="civ2" />
    <civ-bonus
      :civ-name="civ2"
      :civ-description="civ2Description"
      :play-sound="playSound"
      :play-sound-order="1"
    />
  </div>
</template>

<script>
import CivBonus from "./CivBonus.vue";
import UpgradeGroupWrapper from "./UpgradeGroupWrapper.vue";

export default {
  name: "CivBonusOverlay",
  components: {
    CivBonus,
    UpgradeGroupWrapper,
  },
  props: {
    civ1: String,
    civ1Description: String,
    civ2: String,
    civ2Description: String,
    playSound: Boolean,
  },
};
</script>

<style lang="scss">
.tech-overlay-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  position: absolute;
  width: 100vw;
}
</style>
