<template>
  <div class="team-color-display" v-show="showTeamColors">
    <div class="team-color-container">
      <div class="team-color blue"></div>
      <div class="team-color green"></div>
      <!-- <div class="team-color teal">FLNK</div> -->
    </div>
    <div class="team-color-container">
      <div class="team-color red"></div>
      <div class="team-color yellow"></div>
      <!-- <div class="team-color purple">FLNK</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreboardOverlay",
  props: {
    showTeamColors: Boolean
  }
};
</script> 

<style language="scss">
.team-color-display {
  display: inline-flex;
  width: 36%;
  margin-top: 3.75rem;
  position: absolute;
  left: 33.9%;
  justify-content: space-around;
}

.team-color-container {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 15%;
}

.team-color {
  height: 1rem;
  width: 3rem;
  border: 1px solid black;
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.blue {
  background-color: rgb(64, 91, 255);
}
.green {
  background-color: rgb(0, 255, 0);
}
.teal {
  background-color: rgb(0, 255, 255);
}
.red {
  background-color: rgb(255, 0, 0);
}
.yellow {
  background-color: rgb(255, 255, 0);
}
.purple {
  background-color: rgb(255, 87, 179);
}
.grey {
  background-color: rgb(121, 121, 121);
}
.orange {
  background-color: rgb(255, 150, 121);
}
</style>
