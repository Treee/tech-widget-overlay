<template>
  <div>
    <UpgradeGroup
      v-for="upgradeGroup in upgrades"
      :group-name="upgradeGroup"
      :civ-name="civName"
      :key="civName + '-'+ upgradeGroup"
    />
  </div>
</template>


<script>
import UpgradeGroup from "./UpgradeGroup.vue";

export default {
  name: "UpgradeGroupWrapper",
  props: {
    upgrades: Array,
    civName: String
  },
  components: {
    UpgradeGroup
  }
};
</script>

<style language="scss">
</style>
