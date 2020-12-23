<template>
  <div
    class="team-color-display"
    v-if="playerPositionControls.showTeamColors"
  >
    <div class="team-color-container">
      <div
        v-for="p1Position in p1FilteredItems()"
        :key="p1Position"
        class="team-color"
        :class="p1Position"
      ></div>
    </div>
    <div class="team-color-container">
      <div
        v-for="p2Position in p2FilteredItems()"
        :key="p2Position"
        class="team-color"
        :class="p2Position"
      ></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "ScoreboardOverlay",
    data() {
      return {
        team1Positions: ["blue", "green", "teal", "grey"],
        team2Positions: ["red", "yellow", "purple", "orange"],
        positionLegend: ["PKT", "FLNK"],
      };
    },
    computed: {
      ...mapState({
        playerPositionControls: (state) => state.miscOverlayControlOptions,
      }),
    },
    methods: {
      p1FilteredItems: function () {
        return this.team1Positions.slice(
          0,
          this.playerPositionControls.roundMode + 1
        );
      },
      p2FilteredItems: function () {
        return this.team2Positions.slice(
          0,
          this.playerPositionControls.roundMode + 1
        );
      },
    },
  };
</script> 

<style language="scss">
  .team-color-display {
    display: inline-flex;
    width: 36%;
    margin-top: 5.75rem;
    position: absolute;
    left: 31.9%;
    justify-content: space-around;
  }

  .team-color-container {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 10%;
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
