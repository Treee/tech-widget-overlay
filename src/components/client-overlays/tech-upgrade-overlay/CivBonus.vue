<template>
  <div class="tech-overlay-placeholder" v-if="this.civName !== ''">
    <div class="div-background mask-img-vertical" :class="getOverlayStyle">
      <div class="div-wrapper" :style="this.backgroundStyle()">
        <div class="civ-icon-and-name">
          <div class="civ-icon" :style="this.civIconStyle()" />
          <div class="civ-name">{{ civName }}</div>
          <div class="civ-icon" :style="this.civIconStyle()" />
        </div>
        <div class="civ-desc" v-html="this.getDescription()" />
        <div class="civ-unique-unit-wrapper">
          <div
            class="civ-unique-unit unique-unit-container"
            :style="this.uniqueUnitStyle(false)"
          ></div>
          <div
            class="civ-unique-unit unique-unit-container"
            :style="this.uniqueUnitStyle(true)"
          >
            <div class="civ-elite-unique-unit-upgrade" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CivBonus",
    props: {
      civName: String,
      civDescription: String,
      playSound: Boolean,
      playSoundOrder: Number,
    },
    computed: {
      getAudioPath() {
        return `https://treee.github.io/tech-widget-overlay/assets/sounds/${this.civName}.mp3`;
      },
      getOverlayStyle() {
        console.log(
          `getOverlayStyle ${this.civName} : ${this.$store.state.clearAllCivsClicked}`
        );
        return this.civName === "" || this.$store.state.clearAllCivsClicked
          ? "civ-tech-animation-leave-active"
          : "civ-tech-animation-enter-active";
      },
    },
    updated() {
      if (
        this.playSound &&
        this.civName !== "" &&
        !this.$store.state.clearAllCivsClicked
      ) {
        setTimeout(() => {
          var civAudio = new Audio(this.getAudioPath);
          civAudio.volume = 0.25;
          civAudio.play();
        }, this.playSoundOrder * 2000);
      }
    },
    methods: {
      backgroundStyle() {
        if (this.civName) {
          return {
            background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-emblems/${this.civName.toLowerCase()}.png")`,
            "background-size": "contain",
          };
        }
      },
      civIconStyle() {
        if (this.civName) {
          return {
            background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-icons/${this.civName.toLowerCase()}.png")`,
            "background-size": "contain",
            "background-repeat": "no-repeat",
          };
        }
      },
      uniqueUnitStyle(flipped) {
        if (this.civName) {
          return {
            background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${this.civName.toLowerCase()}.png")`,
            "background-size": "contain",
            "background-repeat": "no-repeat",
            transform: flipped ? "scaleX(1)" : "scaleX(-1)",
          };
        }
      },
      getDescription() {
        return this.$store.getters.getCivDescription(this.civName);
      },
    },
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
    background: url("https://treee.github.io/tech-widget-overlay/assets/images/backgrounds/popup_menu_bg_portrait.png");
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
    background: url("https://treee.github.io/tech-widget-overlay/assets/images/upgrade-icons/elite unique unit.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 2rem;
    height: 2rem;
  }

  .mask-img-vertical {
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
