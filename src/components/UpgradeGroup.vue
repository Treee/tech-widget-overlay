<template>
  <transition name="upgrade-group-animation">
    <div class="div-upgrade-background-wrapper" v-if="this.groupName !=='' && this.civName !== ''">
      <UpgradeIcon :upgrade-name="'test'" :is-enabled="true" />
    </div>
  </transition>
</template>


<script>
import UpgradeIcon from "./UpgradeIcon.vue";

export default {
  name: "UpgradeGroup",
  props: {
    groupName: String,
    civName: String
  },
  components: {
    UpgradeIcon
  }
};
</script>

<style language="scss">
.div-upgrade-background-wrapper {
  height: 15vh;
  width: 25vw;
  background: url("/assets/images/backgrounds/chatbar_bg.png");
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
