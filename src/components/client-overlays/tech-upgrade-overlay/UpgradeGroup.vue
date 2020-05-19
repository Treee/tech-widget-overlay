<template>
  <div
    v-if="'true'"
    class="div-upgrade-background-wrapper mask-img-horizontal upgrade-group-container"
    :class="{'upgrade-group-animation-enter-active': civName !== '', 'upgrade-group-animation-leave-active': (civName !== '' && this.$store.state.clearAllCivsClicked) }"
  >
    <div class="upgrade-group">
      <div class="age-icon feudal" v-if="doUpgradesExistFor('feudal')" />
      <UpgradeIcon
        class="md-layout-item"
        v-for="(upgrade) in this.getUpgradeList('feudal')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="true"
      />
    </div>
    <div class="upgrade-group">
      <div class="age-icon castle" v-if="doUpgradesExistFor('castle')" />
      <UpgradeIcon
        class="md-layout-item"
        v-for="(upgrade) in this.getUpgradeList('castle')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="true"
      />
    </div>
    <div class="upgrade-group">
      <div class="age-icon imperial" v-if="doUpgradesExistFor('imperial')" />
      <UpgradeIcon
        class="md-layout-item"
        v-for="(upgrade) in this.getUpgradeList('imperial')"
        :key="upgrade"
        :upgrade-name="upgrade"
        :is-enabled="true"
      />
    </div>
  </div>
</template>


<script>
import UpgradeIcon from "./UpgradeIcon.vue";
import { upgrades } from "./upgrade-enums";

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
}

.upgrade-group {
  height: 100%;
}

.div-upgrade-background-wrapper {
  height: 15vh;
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
