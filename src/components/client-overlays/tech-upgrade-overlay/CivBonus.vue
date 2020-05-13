<template>
  <transition name="civ-tech-animation">
    <div class="tech-overlay-placeholder" v-if="this.civName !==''">
      <div class="div-background">
        <audio v-if="playSound" autoplay :src="getAudioPath" type="audio/mp3" />
        <div class="div-wrapper" :style="backgroundStyle()">
          <div class="civ-icon-and-name">
            <div class="civ-icon" :style="civIconStyle()" />
            <div class="civ-name">{{ civName }}</div>
            <div class="civ-icon" :style="civIconStyle()" />
          </div>
          <div class="civ-desc" v-html="civDescription" />
          <div class="civ-unique-unit-wrapper">
            <div class="civ-unique-unit unique-unit-container" :style="uniqueUnitStyle(false)"></div>
            <div class="civ-unique-unit unique-unit-container" :style="uniqueUnitStyle(true)">
              <div class="civ-elite-unique-unit-upgrade" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CivBonus",
  props: {
    civName: String,
    civDescription: String,
    playSound: Boolean
  },
  computed: {
    getAudioPath() {
      return `/assets/sounds/${this.civName}.mp3`;
    }
  },
  methods: {
    backgroundStyle() {
      return {
        background: `url("/assets/images/civ-emblems/${this.civName.toLowerCase()}.png")`,
        "background-size": "contain"
      };
    },
    civIconStyle() {
      return {
        background: `url("/assets/images/civ-icons/${this.civName.toLowerCase()}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat"
      };
    },
    uniqueUnitStyle(flipped) {
      return {
        background: `url("/assets/images/civ-unique-units/${this.civName.toLowerCase()}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat",
        transform: flipped ? "scaleX(1)" : "scaleX(-1)"
      };
    }
  }
};
</script>

<!-- https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tech-overlay-placeholder {
  width: 25vw;
  height: 55vh;
  display: flex;
  justify-content: space-between;
}
.div-background {
  width: inherit;
  height: inherit;
  background: url("/assets/images/backgrounds/popup_menu_bg_portrait.png");
  background-repeat: round;
}

.unique-unit-container {
  width: 4rem;
  height: 4rem;
  box-shadow: 3px 4px 9px #614d3d;
  border-radius: 0.2rem;
  background-size: contain !important;
}

.div-wrapper {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  background-size: contain !important;
}

.civ-icon-and-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.civ-icon {
  width: 4rem;
  height: 4rem;
  display: inline-block;
  background-size: contain !important;
}

.civ-name {
  display: inline-block;
  font-weight: bold;
  font-size: xx-large;
  font-family: "Memb-Font";
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.civ-desc {
  font-family: "Memb-Font";
  text-shadow: none;
  font-size: 1.3rem;
}

.civ-unique-unit-wrapper {
  display: flex;
  justify-content: space-around;
}

.civ-elite-unique-unit-upgrade {
  background: url("/assets/images/upgrade-icons/elite unique unit.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 2rem;
  height: 2rem;
}

.civ-tech-animation-enter-active {
  -webkit-mask-image: linear-gradient(
    to top,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  -webkit-mask-size: 100% 300%;
  -webkit-mask-position: 0 200%;
  -webkit-mask-repeat: no-repeat;

  mask-image: linear-gradient(
    to top,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  mask-size: 100% 300%;
  mask-position: 0 200%;
  mask-repeat: no-repeat;
  animation: mask-move-in 2s ease-in forwards;
}
.civ-tech-animation-leave-active {
  -webkit-mask-image: linear-gradient(
    to top,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  -webkit-mask-size: 100% 300%;
  -webkit-mask-position: 0 200%;
  -webkit-mask-repeat: no-repeat;

  mask-image: linear-gradient(
    to top,
    transparent 33.3%,
    hsla(0, 0%, 100%, 0) 33.4%,
    hsla(0, 0%, 100%, 0.9) 66.6%,
    hsla(0, 0%, 100%, 0.9) 100%
  );
  mask-size: 100% 300%;
  mask-position: 0 200%;
  mask-repeat: no-repeat;
  animation: mask-move-out 2s ease-out forwards;
}

@keyframes mask-move-in {
  from {
    -webkit-mask-position: 0 100%;
    mask-position: 0 100%;
  }
  to {
    -webkit-mask-position: 0 0%;
    mask-position: 0 0%;
  }
}

@keyframes mask-move-out {
  from {
    -webkit-mask-position: 0 0%;
    mask-position: 0 0%;
  }
  to {
    -webkit-mask-position: 0 100%;
    mask-position: 0 100%;
  }
}
</style>