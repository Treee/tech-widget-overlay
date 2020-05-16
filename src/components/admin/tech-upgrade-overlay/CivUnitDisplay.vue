<template>
  <div
    v-on:click="civClicked"
    class="civ-tech-icon faded"
    :style="getIconStyle"
    :class="{'player-one': this.$store.getters.isPlayerOne(this.civName), 'player-two': this.$store.getters.isPlayerTwo(this.civName)}"
  >
    <div class="civ-text">{{civName}}</div>
  </div>
</template>

<script>
export default {
  name: "CivUnitDisplay",
  props: {
    civName: String,
    clickCounter: Number
  },
  computed: {
    getIconStyle() {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${this.civName.toLowerCase()}.tp.png`,
        "background-size": "cover",
        "background-repeat": "no-repeat"
      };
    }
  },
  methods: {
    civClicked() {
      this.$emit("civselected", this.civName);
    }
  }
};
</script>

<style language="scss">
.civ-tech-icon {
  width: 6rem;
  height: 6rem;
  display: inline-block;

  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;

  font-size: larger;
  font-weight: bold;

  color: black;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}

.civ-tech-icon:hover {
  opacity: 1;
}

.civ-text {
  display: inline-block;
  margin-top: 75%;
  user-select: none;
}

.faded {
  opacity: 0.5;
}

.player-one {
  background-color: blue !important;
}

.player-two {
  background-color: red !important;
}
</style>
