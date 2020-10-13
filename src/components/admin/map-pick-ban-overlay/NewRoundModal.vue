<template>
  <div class="md-layout md-gutter">
    <div>
      <md-switch
        v-model="mapOverlayVisible"
        class="md-primary large-font"
        v-on:click="updateMapsClick"
      >Map Display</md-switch>
      <md-button
        class="md-raised"
        v-on:click="updateMapsClick"
      >Update</md-button>

      <md-dialog
        class="screen-centered"
        :md-active.sync="newRoundDialog"
      >
        <md-dialog-title>Preferences</md-dialog-title>

        <md-field>
          <label for="map-names">Map List</label>
          <md-select
            v-model="selectedMapName"
            name="map-names"
            id="map-names"
          >
            <md-option
              v-for="(value, index) in this.$store.getters.getAllMaps"
              :key="index"
              :value="value"
            >{{getPrettyMapName(value)}}
            </md-option>
          </md-select>
        </md-field>

        <md-field>
          <label for="num-maps">Num Maps</label>
          <md-input
            type="number"
            id="num-maps"
            name="num-maps"
            min="1"
            max="99"
            v-model="numMapsToGenerate"
          />
        </md-field>
        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="confirmDialog(false)"
          >Close</md-button>
          <md-button
            class="md-primary"
            @click="confirmDialog(true)"
          >Save</md-button>
        </md-dialog-actions>
      </md-dialog>
      <md-button
        class="md-raised"
        @click="newRoundDialog = true"
      >New Round</md-button>
    </div>
    <CMDraftInfo />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import CMDraftInfo from "./CMDraftInfo.vue";

  export default {
    name: "NewRoundModal",
    components: {
      CMDraftInfo,
    },
    data() {
      return {
        mapOverlayVisible: this.controlOptions?.mapOverlayVisible,
        selectedMapName: this.controlOptions?.selectedMapName,
        numMapsToGenerate: this.controlOptions?.numMapsToGenerate || 1,
        newRoundDialog: false,
      };
    },
    computed: {
      ...mapState({
        controlOptions: (state) => state.mapPickAndBanOverlayControlOptions,
      }),
    },
    methods: {
      getPrettyMapName(rawMapName) {
        return this.$store.getters.getFormattedMapName(rawMapName) || "";
      },
      confirmDialog(isSaved) {
        if (isSaved) {
          for (let i = 0; i < this.numMapsToGenerate; i++) {
            this.$store.dispatch("addNewPlayerRound", {
              selectedMapName: this.selectedMapName,
              mapState: "open",
            });
          }
          this.updateMapsClick();
        }
        this.newRoundDialog = false;
      },
      updateMapsClick() {
        if (this.mapOverlayVisible) {
          this.$emit("mapOverlayShowBubble");
        } else {
          this.$emit("mapOverlayHideBubble");
        }
      },
    },
  };
</script>

<style language="scss">
  .screen-centered {
    top: inherit;
    transform: translate(0%, 0%) scale(1) !important;
  }
</style>
