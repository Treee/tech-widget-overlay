<template>
  <div
    v-if="isVisible"
    class="div-upgrade-background-wrapper mask-img-horizontal upgrade-group-container"
    :class="{'upgrade-group-animation-enter-active': civName !== '', 'upgrade-group-animation-leave-active': (civName !== '' && this.$store.state.clearAllCivsClicked) }"
  >
    <div class="upgrade-group" v-if="doUpgradesExistFor('feudal')">
      <div class="age-icon feudal" />
      <UpgradeIcon
        v-for="(upgrade) in this.getUpgradeList('feudal')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="isUpgradeEnabledForCiv(upgrade)"
      />
    </div>
    <div
      class="upgrade-group"
      :class="{'upgrade-group-large' : this.isLargeContainer('castle')}"
      v-if="doUpgradesExistFor('castle')"
    >
      <div class="age-icon castle" />
      <UpgradeIcon
        v-for="(upgrade) in this.getUpgradeList('castle')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="isUpgradeEnabledForCiv(upgrade)"
      />
    </div>
    <div class="upgrade-group" :class="{'upgrade-group-large' : this.isLargeContainer('imp')}">
      <div class="age-icon imperial" v-if="doUpgradesExistFor('imperial')" />
      <UpgradeIcon
        v-for="(upgrade) in this.getUpgradeList('imperial')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="isUpgradeEnabledForCiv(upgrade)"
      />
    </div>
  </div>
</template>


<script>
import UpgradeIcon from "./UpgradeIcon.vue";
import { upgrades } from "./upgrade-enums";
import { civUpgrades } from "./upgrades";

export default {
  name: "UpgradeGroup",
  props: {
    groupName: String,
    civName: String,
    isVisible: Boolean
  },
  components: {
    UpgradeIcon
  },
  methods: {
    getUpgradeList(age) {
      const upgradeList = [];
      if (upgrades[this.groupName][age]) {
        Object.keys(upgrades[this.groupName][age]).forEach(key => {
          if (upgrades[this.groupName][age]) {
            upgradeList.push(upgrades[this.groupName][age][key].toLowerCase());
          }
        });
      }
      return upgradeList;
    },
    doUpgradesExistFor(age) {
      return this.getUpgradeList(age, this.groupName).length > 0;
    },
    isLargeContainer() {
      return [
        "university",
        "monastary",
        "dock",
        "stable",
        "siegeWorkshop"
      ].includes(this.groupName);
    },
    isUpgradeEnabledForCiv(upgrade) {
      return (
        this.isUnitDisabled(upgrade) ||
        this.isTechDisabled(upgrade) ||
        this.areHorsesCompletelyDisabled(upgrade) ||
        this.areElephantsDisabled(upgrade) ||
        this.areEaglesDisabled(upgrade) ||
        this.isGenitourEnabled(upgrade) ||
        this.areLancersDisabled(upgrade) ||
        this.areImperialCamelsDisabled(upgrade)
      );
    },
    isUnitDisabled(upgrade) {
      const disabledUpgrade = civUpgrades[this.civName].disabled.units.find(
        disabledUpgrade => {
          return disabledUpgrade.toLowerCase() === upgrade;
        }
      );
      return disabledUpgrade !== undefined;
    },
    isTechDisabled(upgrade) {
      const disabledUpgrade = civUpgrades[this.civName].disabled.techs.find(
        disabledUpgrade => {
          return disabledUpgrade.toLowerCase() === upgrade;
        }
      );
      return disabledUpgrade !== undefined;
    },
    areHorsesCompletelyDisabled(upgrade) {
      return (
        civUpgrades[this.civName].disableHorses !== undefined &&
        this.isHorseUpgrade(upgrade)
      );
    },
    areElephantsDisabled(upgrade) {
      return (
        !["burmese", "malay", "vietnamese", "khmer"].includes(
          this.civName.toLowerCase()
        ) && upgrade === "elite battle elephant"
      );
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
          "imperial camel rider",
          "heavy cavalry archer"
        ].includes(upgrade.toLowerCase()) ||
        upgrade.toLowerCase().includes("barding")
      );
    },
    areEaglesDisabled(upgrade) {
      return (
        !["aztecs", "incas", "mayans"].includes(this.civName.toLowerCase()) &&
        this.isEagleWarriorUpgrade(upgrade)
      );
    },
    isEagleWarriorUpgrade(upgrade) {
      return ["eagle warrior", "elite eagle warrior"].includes(
        upgrade.toLowerCase()
      );
    },
    isGenitourEnabled(upgrade) {
      return (
        this.civName.toLowerCase() !== "berbers" && upgrade.includes("genitour")
      );
    },
    areLancersDisabled(upgrade) {
      return (
        !["cumans", "tatars", "mongols"].includes(this.civName) &&
        upgrade === "elite steppe lancer"
      );
    },
    areImperialCamelsDisabled(upgrade) {
      return (
        !["indians"].includes(this.civName.toLowerCase()) &&
        upgrade === "imperial camel rider"
      );
    }
  }
};
</script>

<style language="scss">
.age-icon {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: #654e3b 1px solid;
  box-shadow: 3px 4px 9px #614d3d;
  border-radius: 0.2rem;
}

.feudal {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/upgrade-icons/feudal.png");
  background-size: contain;
}

.castle {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/upgrade-icons/castle.png");
  background-size: contain;
}

.imperial {
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/upgrade-icons/imperial.png");
  background-size: contain;
}

.upgrade-group-container {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
}

.upgrade-group {
  width: 9rem;
}

.upgrade-group-large {
  width: 10rem;
}

.div-upgrade-background-wrapper {
  height: 10vh;
  width: 25vw;
  background: url("https://treee.github.io/tech-widget-overlay/assets/images/backgrounds/chatbar_bg.png");
  background-repeat: round;
  text-align: center;
}

.upgrade-group-animation-enter-active {
  -webkit-mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsl(0, 0%, 100%, 0) 33.4%,
    hsl(0, 0%, 100%, 0.9) 66.6%,
    hsl(0, 0%, 100%, 0.9) 100%
  );
  -webkit-mask-size: 300% 100%;
  -webkit-mask-position: 0;
  -webkit-mask-repeat: no-repeat;

  mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsl(0, 0%, 100%, 0) 33.4%,
    hsl(0, 0%, 100%, 0.9) 66.6%,
    hsl(0, 0%, 100%, 0.9) 100%
  );
  mask-size: 300% 100%;
  mask-position: 0;
  mask-repeat: no-repeat;
  animation: mask-move-in-left-to-right 2s ease-in forwards;
}

.upgrade-group-animation-leave-active {
  -webkit-mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsl(0, 0%, 100%, 0) 33.4%,
    hsl(0, 0%, 100%, 0.9) 66.6%,
    hsl(0, 0%, 100%, 0.9) 100%
  );
  -webkit-mask-size: 300% 100%;
  -webkit-mask-position: 0;
  -webkit-mask-repeat: no-repeat;

  mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsl(0, 0%, 100%, 0) 33.4%,
    hsl(0, 0%, 100%, 0.9) 66.6%,
    hsl(0, 0%, 100%, 0.9) 100%
  );
  mask-size: 300% 100%;
  mask-position: 0;
  mask-repeat: no-repeat;
  animation: mask-move-out-right-to-left 1.5s ease-out forwards;
}

.mask-img-horizontal {
  -webkit-mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  -webkit-mask-size: 300% 100%;
  -webkit-mask-position: 0;
  -webkit-mask-repeat: no-repeat;

  mask-image: linear-gradient(
    to left,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  mask-size: 300% 100%;
  mask-position: 0;
  mask-repeat: no-repeat;
}

@keyframes mask-move-in-left-to-right {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0;
    mask-position: 0;
  }
}

@keyframes mask-move-out-right-to-left {
  from {
    -webkit-mask-position: 0;
    mask-position: 0;
  }
  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}
</style>
