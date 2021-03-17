<template>
  <div
    :class="{
      'fade-in-map': this.name !== '',
      'fade-out-map': this.$store.state.clearAllMapsClicked,
    }"
  >
    <div :class="pointer">
      {{ this.$store.getters.getFormattedMapName(name) }}
    </div>
    <div
      v-if="this.state === 'banned'"
      class="client-map-frame"
      :style="getMapFrame"
    ></div>
    <md-icon v-if="this.homeMapPlayer !== ''" :class="getHomeIconPosition()"
      >home</md-icon
    >
    <!-- <div class="client-image-container"> -->
    <!-- <div class="client-map-image" :style="getMapImage"></div> -->
    <div v-if="this.winner !== ''" class="civ-picks">
      {{ this.toCommaSeparatedString(this.teamOneCiv) }}
    </div>
    <div
      v-if="this.winner !== ''"
      :class="
        teamOne === winner ? getWinnerIconPosition() : getDefeatedIconPosition()
      "
    ></div>
    <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: "ClientMapDisplay",
    props: {
      name: String,
      state: String,
      homeMapPlayer: String,
      winner: String,
      teamOneCiv: Array,
      teamTwoCiv: Array,
      teamOne: String,
      teamTwo: String,
      pointer: String,
    },
    computed: {
      getMapImage() {
        let map = this.toKabobCase(this.name);
        const mapFolder = this.$store.getters.isCustomMap(map)
          ? "custom"
          : "default";
        const mapParts = map.split("-");
        if (!isNaN(parseInt(mapParts[mapParts.length - 1]))) {
          // we have a duplicate map, trim the last part
          map = mapParts.slice(0, mapParts.length - 1).join("-");
        }
        return {
          background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/${mapFolder}/${map}.png")`,
        };
      },
      getMapFrame() {
        if (this.state === "banned") {
          return {
            background: `url("https://treee.github.io/tech-widget-overlay/assets/images/maps/frames/veto.png") no-repeat`,
            "background-size": "contain",
          };
        }
        return "";
      },
    },
    methods: {
      toCommaSeparatedString(arrayText) {
        if (arrayText) {
          if (arrayText.length > 2) {
            return arrayText
              .map((civName) => {
                return this.toShortString(civName);
              })
              .join(", ");
          } else {
            return arrayText
              .map((civName) => {
                return civName.charAt(0).toUpperCase() + civName.slice(1);
              })
              .join(", ");
          }
        } else {
          return "";
        }
      },
      toShortString(civName) {
        if (civName) {
          return civName.slice(0, 3).toUpperCase();
        }
        return "";
      },
      toKabobCase(text) {
        return text.toLowerCase().split(" ").join("-");
      },
      useWhiteText() {
        return this.state !== "played";
      },
      getHomeIconPosition() {
        if (this.pointer === "pointer-left") {
          return "home-icon left-icon";
        } else {
          return "home-icon right-icon";
        }
      },
      getWinnerIconPosition() {
        if (this.pointer === "pointer-left") {
          return "winner-icon winner-left";
        } else if (this.pointer === "pointer-both") {
          if (this.winner === this.teamOneCiv) {
            return "winner-icon winner-both-left";
          } else {
            return "winner-icon winner-both-right";
          }
        } else {
          return "winner-icon winner-right";
        }
      },
      getDefeatedIconPosition() {
        if (this.pointer === "pointer-left") {
          return "defeated-icon defeated-left";
        } else if (this.pointer === "pointer-both") {
          if (this.winner === this.teamOneCiv) {
            return "defeated-icon defeated-both-right";
          } else {
            return "defeated-icon defeated-both-left";
          }
        } else {
          return "defeated-icon defeated-right";
        }
      },
    },
  };
</script> 

<style language="scss">
  .pointer-both {
    width: 11rem;
    height: 4rem;
    position: relative;
    background: red;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
  }
  .pointer-both:after {
    content: "";
    position: absolute;
    transform: rotate(180deg);
    left: -2rem;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid red;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .pointer-both:before {
    content: "";
    position: absolute;
    right: -2rem;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid red;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .pointer-left {
    width: 13rem;
    height: 4rem;
    position: relative;
    background: red;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    padding-right: 2rem;
    z-index: 2;
  }
  .pointer-left:after {
    content: "";
    position: absolute;
    transform: rotate(180deg);
    left: -2rem;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid red;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .pointer-left:before {
    content: "";
    position: absolute;
    transform: rotate(180deg);
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid white;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .pointer-right {
    width: 13rem;
    height: 4rem;
    position: relative;
    background: red;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    padding-left: 2rem;
    z-index: 2;
  }
  .pointer-right:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid white;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .pointer-right:before {
    content: "";
    position: absolute;
    right: -2rem;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 2rem solid red;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
  }
  .winner-icon {
    background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/winner.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 5rem;
    height: 3rem;
    display: inline-flex;
    position: relative;
    z-index: 2;
  }
  .winner-icon.winner-left {
    top: -7.5rem;
    left: -1rem;
  }
  .winner-icon.winner-right {
    top: -6rem;
    left: 1rem;
  }
  .winner-icon.winner-both-left {
    top: -6rem;
    left: 1rem;
  }
  .winner-icon.winner-both-right {
    top: -6rem;
    left: 1rem;
  }

  .defeated-icon {
    background: url("https://treee.github.io/tech-widget-overlay/assets/images/decals/defeated.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 3rem;
    height: 3rem;
    position: relative;
    z-index: 2;
  }
  .defeated-icon.defeated-right {
    top: -7.5rem;
    left: 7rem;
  }
  .defeated-icon.defeated-left {
    top: -6rem;
    left: 7rem;
  }
  .defeated-icon.defeated-both-right {
    top: -6rem;
    left: 11rem;
  }
  .defeated-icon.defeated-both-left {
    top: -3.5rem;
    left: 3rem;
  }

  .civ-picks {
    display: inline-flex;
    font-size: large;
    color: black;
    text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    z-index: 2;
    font-size: x-large;
    display: inline-flex;
    height: fit-content;
    position: relative;
  }

  .home-icon {
    position: relative;
    z-index: 2;
    transform: scale(2);
  }
  .home-icon.left-icon {
    left: -2rem;
    top: -0.4rem;
  }
  .home-icon.right-icon {
    left: -12rem;
    top: -0.4rem;
  }

  .column-list {
    display: inline-flex;
    flex-direction: column;
    width: inherit;
  }
  .client-map-display {
    width: 15rem;
    height: 15rem;
    margin-top: 4rem;
  }

  .client-image-container {
    width: inherit;
    height: inherit;
    display: inline-flex;
    justify-content: center;
  }

  .client-map-frame {
    width: 8rem;
    height: 8rem;
    position: relative;
    z-index: 1;
    top: -6rem;
    left: 4.5rem;
  }

  .client-map-image {
    width: inherit;
    height: inherit;
    background-size: cover !important;
    background-repeat: round !important;
    position: absolute;
    transform: scale(0.9) translateY(-3px) translateX(2px);
    z-index: 1;
  }

  .client-map-name {
    z-index: 2;
    font-size: x-large;
    display: inline-flex;
    height: fit-content;
    position: relative;
    top: 5%;
    left: -12%;
  }

  .white-text {
    color: whitesmoke;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

  .fade-in-map {
    animation: key-fade-in 2s ease-out forwards;
  }

  .fade-out-map {
    animation: key-fade-out 2s ease-out forwards;
  }

  @keyframes key-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes key-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
