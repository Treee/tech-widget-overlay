<template>
  <div class="div-upgrade" :class="{'disabled-upgrade': isEnabled}" :style="upgradeIconStyle()"></div>
</template>

<script>
export default {
  name: "UpgradeIcon",
  props: {
    upgradeName: String,
    isEnabled: Boolean
  },
  computed: {
    upgradeIconStyle() {
      const formattedUpgradeName = this.getFormattedUpgradeName();
      let iconFolder = "upgrade-icons";
      if (this.isDefaultBuildingUnit(formattedUpgradeName)) {
        iconFolder = "unit-icons";
      }

      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/${iconFolder}/${formattedUpgradeName}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat"
      };
    },
    getFormattedUpgradeName() {
      let upgrade = this.upgradeName;
      if (upgrade.toLowerCase().includes("war galley")) {
        upgrade = "war galley";
      } else if (
        upgrade === "feudal" ||
        upgrade === "castle" ||
        upgrade === "imperial"
      ) {
        upgrade = upgrade.concat(".tp");
      } else if (upgrade === "heavy demolition ship") {
        upgrade = "heavy demo ship";
        // template.addClass('no-border');
      } else if (upgrade === "camel rider") {
        upgrade = "camel";
      } else if (upgrade === "heavy camel rider") {
        upgrade = "heavy camel";
      } else if (upgrade === "imperial camel rider") {
        upgrade = "imperial camel";
      } else if (upgrade === "heavy cavalry archer") {
        upgrade = "heavy cav archer";
      }
      return upgrade;
    }
  },
  methods: {
    isDefaultBuildingUnit(upgrade) {
      return [
        "knight",
        "camel",
        "bombard cannon",
        "steppe lancer",
        "battle elephant",
        "eagle scout",
        "condottiero",
        "missionary",
        "longboat",
        "caravel",
        "turtle ship",
        "hand cannoneer",
        "slinger",
        "genitour",
        "elite genitour"
      ].includes(upgrade.toLowerCase());
    },
    hasSpecialShips(civ) {
      return ["vikings", "portuguese", "koreans"].includes(civ.toLowerCase());
    },
    isHorseUpgrade(upgrade) {
      return (
        [
          "bloodlines",
          "husbandry",
          "light cavalry",
          "hussar",
          "knight",
          "camel",
          "cavalier",
          "paladin",
          "heavy camel rider",
          "imperial camel rider"
        ].includes(upgrade.toLowerCase()) ||
        upgrade.toLowerCase().includes("barding")
      );
    },
    hasElephants(civName) {
      return ["burmese", "malay", "vietnamese", "khmer"].includes(
        civName.toLowerCase()
      );
    },
    hasLancers(civName) {
      // return this.data[civName]
      return ["cumans", "tatars", "mongols"].includes(civName);
    },
    isMesoCiv(civName) {
      return ["aztecs", "incas", "mayans"].includes(civName.toLowerCase());
    }
  }
};
</script>

<style>
</style>
