<template>
  <md-card md-with-hover class="card-style card-technology">
    <md-card-header>
      <div class="md-title">Technology Overlay</div>
      <div class="md-subhead">Controls</div>
    </md-card-header>
    <md-card-content>
      <md-button class="md-raised md-accent" v-on:click="clearAllClick"
        >Clear All</md-button
      >
      <md-button class="md-raised" v-on:click="showOverlayClick"
        >Show Overlay</md-button
      >
      <md-switch
        v-model="sound"
        @change="valueChanged"
        class="md-primary large-font"
        >Sound</md-switch
      >
      <md-switch
        v-model="autohide"
        @change="valueChanged"
        class="md-primary large-font"
        >Auto Hide</md-switch
      >
      <md-switch
        v-model="tech"
        @change="valueChanged"
        class="md-primary large-font"
        >Tech</md-switch
      >
      <md-switch
        v-model="blacksmith"
        @change="valueChanged"
        class="md-primary large-font"
        >Blacksmith</md-switch
      >
      <md-switch
        v-model="university"
        @change="valueChanged"
        class="md-primary large-font"
        >University</md-switch
      >
      <md-switch
        v-model="monastary"
        @change="valueChanged"
        class="md-primary large-font"
        >Monastary</md-switch
      >
      <md-switch
        v-model="dock"
        @change="valueChanged"
        class="md-primary large-font"
        >Dock</md-switch
      >
      <md-switch
        v-model="barracks"
        @change="valueChanged"
        class="md-primary large-font"
        >Barracks</md-switch
      >
      <md-switch
        v-model="archeryRange"
        @change="valueChanged"
        class="md-primary large-font"
        >Archery Range</md-switch
      >
      <md-switch
        v-model="stable"
        @change="valueChanged"
        class="md-primary large-font"
        >Stable</md-switch
      >
      <md-switch
        v-model="siegeWorkshop"
        @change="valueChanged"
        class="md-primary large-font"
        >Siege Workshop</md-switch
      >
      <md-field class="tech-field">
        <label>Auto Hide Delay (ms)</label>
        <md-input
          v-model="autoHideDelay"
          @change="valueChanged"
          type="number"
        ></md-input>
      </md-field>
    </md-card-content>
    <md-card-content>
      <md-menu
        class="custom-menu"
        :md-offset-x="-450"
        :md-offset-y="10"
        :mdCloseOnClick="false"
        :mdCloseOnSelect="false"
      >
        <md-button class="md-raised" md-menu-trigger>Civilizations</md-button>
        <md-menu-content class="custom-menu-content">
          <div class="civ-selection-list">
            <md-menu-item
              v-for="civName in this.$store.getters.getCivNames"
              :key="civName"
              :id="civName"
              @click="civClicked(civName)"
              @contextmenu.prevent="civRightClicked(civName)"
            >
              <div
                class="civ-icon-group"
                :class="{
                  'player-one': civ1 === civName,
                  'player-two': civ2 === civName,
                }"
              >
                <div class="civ-icon" :style="civIconStyle(civName)" />
                <div
                  class="civ-unique-unit unique-unit-container"
                  :style="uniqueUnitStyle(civName)"
                />
                <div class="civ-name">
                  {{ getMapName(civName) }}
                </div>
              </div>
            </md-menu-item>
          </div>
        </md-menu-content>
      </md-menu>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminTechUpgradeOverlay",
  data() {
    return {
      sound: this.controlOptions?.sound,
      autohide: this.controlOptions?.autohide || true,
      autoHideDelay: this.controlOptions?.autoHideDelay || 12,
      tech: this.controlOptions?.tech || true,
      blacksmith: this.controlOptions?.blacksmith,
      university: this.controlOptions?.university,
      monastary: this.controlOptions?.monastary,
      dock: this.controlOptions?.dock,
      barracks: this.controlOptions?.barracks,
      archeryRange: this.controlOptions?.archeryRange,
      stable: this.controlOptions?.stable,
      siegeWorkshop: this.controlOptions?.siegeWorkshop,
      civ1: this.controlOptions?.civ1,
      civ2: this.controlOptions?.civ2,
    };
  },
  computed: {
    ...mapState({
      controlOptions: (state) => state.techUpgradeOverlayControlOptions,
    }),
  },
  methods: {
    clearAllClick() {
      this.sound = false;
      this.tech = true;
      this.civ1 = "";
      this.civ2 = "";
      this.blacksmith = this.university = this.monastary = this.dock = false;
      this.barracks = this.archeryRange = this.stable = this.siegeWorkshop = false;
      this.$emit("techOverlayClearAll");
    },
    showOverlayClick() {
      console.log({ ...this.$data });
      this.$emit("techOverlayShow", this.$data);
    },
    toCamelCase(text) {
      let camelCase = "";
      text.split("-").forEach((word) => {
        camelCase = camelCase
          .concat(word.charAt(0).toUpperCase())
          .concat(word.substring(1))
          .concat(" ");
      });
      return camelCase;
    },
    valueChanged() {
      this.$store.commit("updateTechOverlayControls", {
        ...this.$data,
      });
      this.showOverlayClick();
    },
    civClicked(selectedCiv) {
      this.civ1 = selectedCiv;
      if (this.$store.getters.isPlayerOne(selectedCiv)) {
        this.civ1 = "";
      } else {
        this.civ1 = selectedCiv;
      }
      this.$store.commit("updateTechOverlayControls", {
        ...this.$data,
      });
    },
    civRightClicked(selectedCiv) {
      this.civ2 = selectedCiv;
      if (this.$store.getters.isPlayerTwo(selectedCiv)) {
        this.civ2 = "";
      } else {
        this.civ2 = selectedCiv;
      }
      this.$store.commit("updateTechOverlayControls", {
        ...this.$data,
      });
    },
    civIconStyle(civName) {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-icons/${civName?.toLowerCase()}.png")`,
        "background-size": "contain",
        "background-repeat": "no-repeat",
      };
    },
    uniqueUnitStyle(civName) {
      return {
        background: `url("https://treee.github.io/tech-widget-overlay/assets/images/civ-unique-units/${civName?.toLowerCase()}.tp.png`,
        "background-size": "cover",
        "background-repeat": "no-repeat",
      };
    },
    getMapName(mapId) {
      return this.$store.getters.getFormattedMapName(mapId);
    },
  },
};
</script>

<style language="scss">
.card-technology .md-list {
  background-color: burlywood;
}
.card-technology .tech-civs {
  flex-flow: row wrap;
  justify-content: space-evenly;
}
.tech-civs li {
  width: 5rem;
  height: 5rem;
}
.player-colors {
  width: inherit;
  height: inherit;
  display: inline-flex;
  opacity: 0.5;
}
.tech-field {
  width: 20%;
}
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
