<template>
  <div class="civ-tech-icon faded" :style="getIconStyle">
    <div class="civ-text">{{civName}}</div>
  </div>
</template>

<script>
export default {
  name: "CivUnitDisplay",
  props: {
    civName: String
  },
  computed: {
    getIconStyle() {
      return {
        background: `url("/assets/images/civ-unique-units/${this.civName.toLowerCase()}.tp.png`,
        "background-size": "cover",
        "background-repeat": "no-repeat"
      };
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

.civ-text {
  display: inline-block;
  margin-top: 75%;
  user-select: none;
}

.faded {
  opacity: 0.5;
}

.not-faded {
  opacity: 1;
}
</style>
