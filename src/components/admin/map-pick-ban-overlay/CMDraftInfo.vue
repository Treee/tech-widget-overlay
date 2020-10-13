<template>
  <div class="cm-draft-info-row">
    <div class="cm-draft-info-row">
      <md-field>
        <label>Draft Session Id</label>
        <md-input v-model="cmDraftId"></md-input>
      </md-field>
      <md-button
        class="md-raised"
        @click="loadCMData"
      >Load CM</md-button>
    </div>
    <div class="cm-draft-info-row">
      <md-field>
        <label>Team 1</label>
        <md-input
          v-model="team1Name"
          @blur="updateTeamNames(team1Name, team2Name)"
        ></md-input>
      </md-field>
      <md-field>
        <label>Team 2</label>
        <md-input
          v-model="team2Name"
          @blur="updateTeamNames(team1Name, team2Name)"
        ></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "TeamSelect",
    data() {
      return {
        cmDraftId: "5bc51522b1368b6070a3d033",
        team1Name: this.controlOptions?.team1Name,
        team2Name: this.controlOptions?.team2Name,
      };
    },
    computed: {
      ...mapState({
        controlOptions: (state) => state.mapPickAndBanOverlayControlOptions,
      }),
    },
    methods: {
      loadCMData() {
        this.$store.getters.getCMInfo(this.cmDraftId).then((draftData) => {
          // console.log("draftData", draftData);
          this.team1Name = draftData.draft.playerOne.name || "";
          this.team2Name = draftData.draft.playerTwo.name || "";
          this.updateTeamNames(this.team1Name, this.team2Name);
        });
      },
      updateTeamNames(teamOne, teamTwo) {
        this.$store.dispatch("syncTeamNames", {
          team1Name: teamOne,
          team2Name: teamTwo,
        });
      },
    },
  };
</script>

<style language="scss">
  .cm-draft-info-row {
    display: inline-flex;
  }
  .cm-draft-info-col {
    display: inline-flex;
    flex-direction: column;
  }
</style>
