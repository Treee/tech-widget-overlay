<template>
  <md-card md-with-hover class="card-style card-rounds column-contents">
    <div class="rounds-left">
      <md-card-header>
        <div class="md-subhead">Match Mode</div>
      </md-card-header>
      <md-card-content>
        <md-button
          class="md-raised vs1"
          :class="this.isRoundModeSelected(0) ? 'active-round' : ''"
          :disabled="this.isRoundModeSelected(0)"
          @click="selectRoundMode(0)"
          >1v1</md-button
        >
        <md-button
          class="md-raised vs2"
          :class="this.isRoundModeSelected(1) ? 'active-round' : ''"
          :disabled="this.isRoundModeSelected(1)"
          @click="selectRoundMode(1)"
          >2v2</md-button
        >
        <md-button
          class="md-raised vs3"
          :class="this.isRoundModeSelected(2) ? 'active-round' : ''"
          :disabled="this.isRoundModeSelected(2)"
          @click="selectRoundMode(2)"
          >3v3</md-button
        >
        <md-button
          class="md-raised vs4"
          :class="this.isRoundModeSelected(3) ? 'active-round' : ''"
          :disabled="this.isRoundModeSelected(3)"
          @click="selectRoundMode(3)"
          >4v4</md-button
        >
      </md-card-content>
    </div>
    <div class="rounds-right">
      <md-card-header>
        <div class="md-title">Round Controls</div>
        <div class="md-subhead">Add/Clear All/CM Info</div>
      </md-card-header>
      <md-card-content>
        <md-button class="md-raised md-accent" @click="clearRounds()"
          >Clear Rounds</md-button
        >
        <md-button class="md-raised" @click="addRound()">Add Round</md-button>
        <md-switch
          v-model="roundOverlayVisible"
          class="md-primary large-font"
          @change="toggleRoundOverlayVisibility"
          >Show Rounds</md-switch
        >
        <br />
        <md-field>
          <label>Draft Session Id</label>
          <md-input v-model="cmDraftId" type="password"></md-input>
        </md-field>
        <md-button class="md-raised" @click="loadCMData">Load CM</md-button>
      </md-card-content>
      <md-card-content style="width: 35%">
        <md-field>
          <label>Team 1</label>
          <md-input
            v-model="team1Name"
            @blur="updateTeamNames(team1Name, team2Name)"
          ></md-input>
        </md-field>
        <br />
        <md-field>
          <label>Team 2</label>
          <md-input
            v-model="team2Name"
            @blur="updateTeamNames(team1Name, team2Name)"
          ></md-input>
        </md-field>
      </md-card-content>
    </div>
  </md-card>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "RoundOverlay",
    data() {
      return {
        roundMode: 0,
        roundOverlayVisible: false,
        cmDraftId: "5bc51522b1368b6070a3d033",
        team1Name: "",
        team2Name: "",
      };
    },
    computed: {
      ...mapState({
        controlOptions: (state) => state.mapPickAndBanOverlayControlOptions,
      }),
    },
    components: {},
    methods: {
      selectRoundMode(roundType) {
        this.roundMode = roundType;
        this.$store.dispatch("setRoundType", {
          roundMode: this.roundMode,
        });
      },
      isRoundModeSelected(roundType) {
        return this.roundMode === roundType;
      },
      addRound() {
        this.$store.dispatch("addNewPlayerRound", {
          selectedMapName: "unknown",
          state: "open",
        });
        this.$emit("roundOverlay");
      },
      clearRounds() {
        this.$store.dispatch("clearRounds", {});
      },
      toggleRoundOverlayVisibility() {
        this.$store.dispatch("updateRoundVisibility", {
          roundOverlayVisible: this.roundOverlayVisible,
        });
        this.$emit("roundOverlay");
      },
      loadCMData() {
        this.$store.getters.getCMInfo(this.cmDraftId).then((draftData) => {
          // console.log("draftData", draftData);
          this.team1Name = draftData.draft.playerOne.name || "";
          this.team2Name = draftData.draft.playerTwo.name || "";
          const teamOneCivDraft = draftData.draft.playerOne.civs;
          const teamTwoCivDraft = draftData.draft.playerTwo.civs;
          this.updateTeamNames(this.team1Name, this.team2Name);
          this.updateTeamCivDrafts(teamOneCivDraft, teamTwoCivDraft);
        });
      },
      updateTeamNames(teamOne, teamTwo) {
        this.$store.dispatch("syncTeamNames", {
          team1Name: teamOne,
          team2Name: teamTwo,
        });
      },
      updateTeamCivDrafts(teamOneCivDraft, teamTwoCivDraft) {
        this.$store.dispatch("updateTeamCivDrafts", {
          teamOneCivDraft,
          teamTwoCivDraft,
        });
      },
    },
  };
</script>

<style language="scss">
  .rounds-left {
    display: inline-flex;
    align-items: center;
  }
  .rounds-right {
    display: inline-flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .card-rounds .md-field {
    display: inline-flex;
    width: 70%;
    margin: 0.25rem;
  }
  .md-raised.active-round {
    background-color: grey !important;
  }
  .vs1 {
    background-color: cornflowerblue !important;
    border: 1px solid black;
  }
  .vs2 {
    background-color: hotpink !important;
    border: 1px solid black;
  }
  .vs3 {
    background-color: greenyellow !important;
    border: 1px solid black;
  }
  .vs4 {
    background-color: gold !important;
    border: 1px solid black;
  }
</style>
