import Vue from "vue";
import Vuex from "vuex";

import AoE2Api from "./api";

Vue.use(Vuex);

const defaultMaps = [
  "arabia",
  "atacama",
  "canberra",
  "cape-of-storms",
  "forest-pond",
  "golden-pit",
  "hidden-treasures",
  "kawasan",
  "river-belt",
  "rockslide",
  "acropolis",
  "alpine-lakes",
  "archipelago",
  "arena",
  "baltic",
  "black-forest",
  "cenotes",
  "coastal",
  "coast-to-mountain",
  "continental",
  "eruption",
  "fortress",
  "front-line",
  "ghost-lake",
  "gold-rush",
  "hideout",
  "highland",
  "hill-fort",
  "islands",
  "land-madness",
  "lombardia",
  "mediterranean",
  "mega-random",
  "migration",
  "mongolia",
  "nomad",
  "not-socotra",
  "oasis",
  "regecide-fortress",
  "scandinavia",
  "serengeti",
  "socotra",
  "steppe",
  "team-acropolis",
  "team-islands",
  "valley",
  "yucatan",
];

const customMaps = [
  "wc-chaos-pit",
  "rbw2-arabia",
  "rbw2-atacama",
  "rbw2-blockades",
  "rbw2-cross",
  "rbw2-eruption",
  "rbw2-frigid-lake",
  "rbw2-golden-swamp",
  "rbw2-haboob",
  "rbw2-kawasan",
  "rbw2-land-madness",
  "rbw2-lowland",
  "rbw2-wings",
  "boa2-african-waters",
  "boa2-arabia",
  "boa2-beachfight",
  "boa2-canyon-lake",
  "boa2-colloseum",
  "boa2-desert-slope",
  "boa2-donut",
  "boa2-grand-bara",
  "boa2-not-socotra",
  "rbw-acropolis",
  "rbw-arabia",
  "rbw-atacama",
  "rbw-aztlan",
  "rbw-cross",
  "rbw-el-dorado",
  "rbw-golden-pit",
  "rbw-golden-swamp",
  "rbw-kawasan",
  "rbw-land-madness",
  "rbw-sinkhole",
  "rbw-wings",
  "hc4-arabia",
  "hc4-bay",
  "hc4-cross",
  "hc4-cup",
  "hc4-el-dorado",
  "hc4-goldrush",
  "hc4-hideout",
  "hc4-high-tide",
  "hc4-islands",
  "hc4-ravines",
  "hc4-slopes",
  "msm-acclivity",
  "msm-alpine",
  "msm-arabia",
  "msm-big-freeze",
  "msm-haboob",
  "msm-kawasan",
  "msm-lowland",
];

const customMapPrefixes = ["wc", "boa2", "rbw", "rbw2", "hc4", "msm"];

const toCamelCase = (text) => {
  let camelCase = "";
  text.split("-").forEach((word) => {
    camelCase = camelCase
      .concat(word.charAt(0).toUpperCase())
      .concat(word.substring(1))
      .concat(" ");
  });
  return camelCase;
};
const debounceMapName = (state, potentialDuplicate) => {
  const similarMapNames = state.mapPickAndBanOverlayControlOptions.adminOptions.filter(
    (map) => {
      let selectedMapName = map.selectedMapName;
      let mapParts = selectedMapName.split("-");
      // if the last part is a number we know to remove it fopr rendering the image
      if (!isNaN(mapParts[mapParts.length - 1])) {
        mapParts = mapParts.slice(0, [mapParts.length - 1]);
        selectedMapName = mapParts.join("-");
      }
      return selectedMapName === potentialDuplicate;
    }
  );
  return similarMapNames?.length > 0
    ? `${potentialDuplicate}-${similarMapNames.length}`
    : potentialDuplicate;
};

export default new Vuex.Store({
  // strict: true,
  state: {
    showMap: false,
    mapId: "",
    roundOverlay: {
      roundMode: 0,
      roundOverlayVisible: false,
      team1Name: "",
      team2Name: "",
    },
    ageNames: {},
    civHelpTexts: {},
    civNames: {},
    dataString: {},
    clearAllCivsClicked: false,
    clearAllMapsClicked: false,
    clientControlOptions: {
      roundMode: 0,
      roundOverlayVisible: false,
      selectedMapsAndState: [],
      players: [],
    },
    miscOverlayControlOptions: {
      civ1: [],
      civ2: [],
      isCivDisplayVisible: false,
      showTeamColors: false,
      showCurrentMapName: false,
      currentMap: "",
      civ1X: "0",
      civ1Y: "0",
      civ1Width: "0",
      civ2X: "0",
      civ2Y: "0",
      civ2Width: "0",
    },
    techUpgradeOverlayControlOptions: {
      civ1: "",
      civ2: "",
      sound: false,
      autoHide: true,
      autoHideDelay: 12000,
      tech: true,
      blacksmith: false,
      university: false,
      monastary: false,
      dock: false,
      barracks: false,
      archeryRange: false,
      stable: false,
      siegeWorkshop: false,
    },
    mapPickAndBanOverlayControlOptions: {
      mapOverlayVisible: false,
      selectedMapName: "",
      numMapsToGenerate: 1,
      numBans: 1,
      team1Name: "",
      team2Name: "",
      adminOptions: [],
      selectedMaps: [],
      mapStates: [],
    },
    defaultMaps: defaultMaps,
    customMaps: customMaps,
    customMapPrefixes: customMapPrefixes,
  },
  getters: {
    getRoundOverlayData: (state) => {
      return state.roundOverlay;
    },
    getCurrentRoundData: (state) => {
      const currentRound = state.mapPickAndBanOverlayControlOptions.adminOptions.find(
        (map) => {
          return map.state === "current";
        }
      );
      const roundOverlay = state.roundOverlay;
      return {
        currentRound,
        roundMode: roundOverlay.roundMode,
      };
    },
    getCivDescription: (state) => (civName) => {
      if (civName === "") {
        return "";
      } else {
        // console.log('civ name', civName);
        // console.log('civ dataString', state.dataString);
        // console.log('civ civHelpTexts', state.civHelpTexts[civName]);
        return state.dataString[state.civHelpTexts[civName]] || "";
      }
    },
    getCivNames: (state) => {
      return Object.keys(state.civNames);
    },
    getPlayerNames: (state) => {
      const players = [];
      if (state.mapPickAndBanOverlayControlOptions.team1Name !== "") {
        players.push(state.mapPickAndBanOverlayControlOptions.team1Name);
      }
      if (state.mapPickAndBanOverlayControlOptions.team2Name) {
        players.push(state.mapPickAndBanOverlayControlOptions.team2Name);
      }
      return players;
    },
    getDefaultMaps: (state) => {
      return state.defaultMaps;
    },
    getCustomMaps: (state) => {
      return state.customMaps;
    },
    getAllMaps: (state) => {
      return state.defaultMaps.concat(state.customMaps);
    },
    getCustomPrefixes: (state) => {
      return state.customMapPrefixes;
    },
    getFormattedMapName: (state) => (rawMapName) => {
      let mapName = "";
      if (typeof rawMapName === "object") {
        rawMapName = rawMapName[0];
      }
      const mapNameParts = rawMapName.split("-");
      if (mapNameParts.length === 1) {
        // single word map name, not custom
        mapName = toCamelCase(rawMapName);
      } else {
        const customMapPrefix =
          state.customMapPrefixes.find((prefix) => {
            return prefix === mapNameParts[0];
          }) || "";
        if (customMapPrefix === "") {
          // multi word map name, not custom
          mapName = toCamelCase(rawMapName);
        } else {
          // multi word map name, is custom
          mapName = `${mapNameParts[0].toUpperCase()} ${toCamelCase(
            rawMapName.substring(mapNameParts[0].length + 1)
          )}`;
        }
      }
      // toCamelCase
      return mapName.trim();
    },
    getMapData: (state) => {
      return state.mapPickAndBanOverlayControlOptions.adminOptions;
    },
    isCustomMap: (state) => (map) => {
      return state.customMaps.some((customMap) => {
        return map === customMap;
      });
    },
    isPlayerOne: (state) => (playerName) => {
      return state.techUpgradeOverlayControlOptions.civ1 === playerName;
    },
    isPlayerTwo: (state) => (playerName) => {
      return state.techUpgradeOverlayControlOptions.civ2 === playerName;
    },
    getMiscOverlayData: (state) => {
      return { ...state.miscOverlayControlOptions };
    },
    getTechOverlayData: (state) => {
      return state.techUpgradeOverlayControlOptions;
    },
    getMapStateForMap: (state) => (map) => {
      const mapIndex = state.mapPickAndBanOverlayControlOptions.mapStates.findIndex(
        (mapState) => {
          return mapState.name === map;
        }
      );
      return state.mapPickAndBanOverlayControlOptions.mapStates[mapIndex];
    },
    getCMInfo: () => (profileId) => {
      return AoE2Api.getAoECMInfo(profileId);
    },
    getClientPlayers: (state) => {
      return state.clientControlOptions.players;
    },
    getTeamSelectedCivDraft: (state) => (mapId, team) => {
      if (team === "team1") {
        const foundIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
          (map) => {
            return map.id === mapId;
          }
        );
        return state.mapPickAndBanOverlayControlOptions.adminOptions[foundIndex]
          .teamOneCiv;
      } else if (team === "team2") {
        const foundIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
          (map) => {
            return map.id === mapId;
          }
        );
        return state.mapPickAndBanOverlayControlOptions.adminOptions[foundIndex]
          .teamTwoCiv;
      }
    },
    // Compute derived state based on the current state. More like computed property.
  },
  mutations: {
    setAgeNames(state, ages) {
      state.ageNames = ages;
    },
    setCivHelpTexts(state, helpTexts) {
      state.civHelpTexts = helpTexts;
    },
    setCivNames(state, civNames) {
      state.civNames = civNames;
    },
    setDataStrings(state, dataStrings) {
      state.dataString = dataStrings;
    },
    updateTeam1Civ(state, data) {
      // console.log(`updating team 1 civ from ${state.techUpgradeOverlayControlOptions.civ1} to ${data}`);
      state.techUpgradeOverlayControlOptions.civ1 = data.formattedName;
      if (data.bypassMiscUpdate) {
        state.miscOverlayControlOptions.civ1 = data.formattedName;
      }
      state.clearAllCivsClicked = false;
    },
    updateTeam2Civ(state, data) {
      // console.log(`updating team 2 civ from ${state.techUpgradeOverlayControlOptions.civ1} to ${civ}`);
      state.techUpgradeOverlayControlOptions.civ2 = data.formattedName;
      if (data.bypassMiscUpdate) {
        state.miscOverlayControlOptions.civ2 = data.formattedName;
      }
      state.clearAllCivsClicked = false;
    },
    clearCivs(state) {
      state.techUpgradeOverlayControlOptions.civ1 = "";
      state.techUpgradeOverlayControlOptions.civ2 = "";
    },
    preTransitionCivOverlay(state) {
      state.clearAllCivsClicked = true;
    },
    resetTransitionCivOverlay(state) {
      state.clearAllCivsClicked = false;
    },
    preTransitionMapOverlay(state) {
      state.clearAllMapsClicked = true;
    },
    updateTechOverlayControls(state, data) {
      state.techUpgradeOverlayControlOptions.sound = data.sound;
      state.techUpgradeOverlayControlOptions.autoHide = data.autoHide;
      state.techUpgradeOverlayControlOptions.civ1 = data.team1RoundDraft;
      state.techUpgradeOverlayControlOptions.civ2 = data.team2RoundDraft;
      state.techUpgradeOverlayControlOptions.autoHideDelay = data.autoHideDelay;
      state.techUpgradeOverlayControlOptions.tech = data.tech;
      state.techUpgradeOverlayControlOptions.blacksmith = data.blacksmith;
      state.techUpgradeOverlayControlOptions.university = data.university;
      state.techUpgradeOverlayControlOptions.monastary = data.monastary;
      state.techUpgradeOverlayControlOptions.dock = data.dock;
      state.techUpgradeOverlayControlOptions.barracks = data.barracks;
      state.techUpgradeOverlayControlOptions.archeryRange = data.archeryRange;
      state.techUpgradeOverlayControlOptions.stable = data.stable;
      state.techUpgradeOverlayControlOptions.siegeWorkshop = data.siegeWorkshop;
    },
    updateMiscOverlayControlOptions(state, data) {
      state.miscOverlayControlOptions.civ1 = data.teamOneCiv || [];
      state.miscOverlayControlOptions.civ2 = data.teamTwoCiv || [];
      state.miscOverlayControlOptions.roundMode = data.roundMode || 0;
      state.miscOverlayControlOptions.isCivDisplayVisible =
        data.isCivDisplayVisible;
      state.miscOverlayControlOptions.showTeamColors = data.showTeamColors;
      state.miscOverlayControlOptions.showCurrentMapName =
        data.showCurrentMapName;
      state.miscOverlayControlOptions.currentMap =
        data.currentMap || state.miscOverlayControlOptions.currentMap || "";
      state.miscOverlayControlOptions.civ1X =
        data.civ1X || state.miscOverlayControlOptions.civ1X;
      state.miscOverlayControlOptions.civ1Y =
        data.civ1Y || state.miscOverlayControlOptions.civ1Y;
      state.miscOverlayControlOptions.civ1Width =
        data.civ1Width || state.miscOverlayControlOptions.civ1Width;
      state.miscOverlayControlOptions.civ2X =
        data.civ2X || state.miscOverlayControlOptions.civ2X;
      state.miscOverlayControlOptions.civ2Y =
        data.civ2Y || state.miscOverlayControlOptions.civ2Y;
      state.miscOverlayControlOptions.civ2Width =
        data.civ2Width || state.miscOverlayControlOptions.civ2Width;
    },
    updateScoreboardClientControls(state, data) {
      state.miscOverlayControlOptions.civ1 =
        data?.currentRound?.teamOneCiv || [];
      state.miscOverlayControlOptions.civ2 =
        data?.currentRound?.teamTwoCiv || [];
      state.miscOverlayControlOptions.roundMode = data?.roundMode || 0;
      state.miscOverlayControlOptions.isCivDisplayVisible =
        data.isCivDisplayVisible;
      state.miscOverlayControlOptions.showTeamColors = data.showTeamColors;
      state.miscOverlayControlOptions.showCurrentMapName =
        data.showCurrentMapName;
      state.miscOverlayControlOptions.currentMap =
        data?.currentRound?.selectedMapName ||
        state.miscOverlayControlOptions.currentMap ||
        "";
      state.miscOverlayControlOptions.civ1X =
        data.civ1X || state.miscOverlayControlOptions.civ1X;
      state.miscOverlayControlOptions.civ1Y =
        data.civ1Y || state.miscOverlayControlOptions.civ1Y;
      state.miscOverlayControlOptions.civ1Width =
        data.civ1Width || state.miscOverlayControlOptions.civ1Width;
      state.miscOverlayControlOptions.civ2X =
        data.civ2X || state.miscOverlayControlOptions.civ2X;
      state.miscOverlayControlOptions.civ2Y =
        data.civ2Y || state.miscOverlayControlOptions.civ2Y;
      state.miscOverlayControlOptions.civ2Width =
        data.civ2Width || state.miscOverlayControlOptions.civ2Width;
    },
    updateScoreboardMapName(state, data) {
      state.miscOverlayControlOptions.showCurrentMapName =
        data.showCurrentMapName;
      state.miscOverlayControlOptions.currentMap = data.currentMap;
    },
    updateClientSideMapsAndState(state, data) {
      state.clientControlOptions.roundMode = data.roundMode;
      state.clientControlOptions.roundOverlayVisible = data.roundOverlayVisible;
      state.clientControlOptions.selectedMapsAndState = data.mapData;
      state.clientControlOptions.players = [data.team1Name, data.team2Name];
      state.clearAllMapsClicked = false;
    },
    clearClientMaps(state) {
      state.clientControlOptions.roundOverlayVisible = false;
      state.clientControlOptions.selectedMapsAndState = [];
    },
    addNewPlayerRound(state, data) {
      data.id = debounceMapName(state, data.selectedMapName);
      if (state.mapPickAndBanOverlayControlOptions.adminOptions.length === 0) {
        data.state = "current";
      }
      state.mapPickAndBanOverlayControlOptions.adminOptions.push(data);
    },
    saveRoundState(state, data) {
      const mapToUpdateIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
        (map) => {
          return map.id === data.mapIdToUpdate;
        }
      );
      if (mapToUpdateIndex > -1) {
        const previousState =
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            mapToUpdateIndex
          ].mapState;
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          mapToUpdateIndex
        ].homeMapPlayer = data.homeMap;
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          mapToUpdateIndex
        ].winner = data.winner;
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          mapToUpdateIndex
        ].teamOneCiv = data.teamOneCiv;
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          mapToUpdateIndex
        ].teamTwoCiv = data.teamTwoCiv;
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          mapToUpdateIndex
        ].state = data.state;
        // this map was current, now played. next map is current if exists
        if (data.state === "played") {
          const nextMapIndex = mapToUpdateIndex + 1;
          if (
            state.mapPickAndBanOverlayControlOptions.adminOptions[nextMapIndex]
          ) {
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].homeMapPlayer = data.homeMap;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].winner = data.winner;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].teamOneCiv = data.teamOneCiv;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].teamTwoCiv = data.teamTwoCiv;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].state = "current";
          }
        } else if (previousState === "played" && data.state !== "played") {
          // set the next map to open
          const nextMapIndex = mapToUpdateIndex + 1;
          if (
            state.mapPickAndBanOverlayControlOptions.adminOptions[nextMapIndex]
          ) {
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].homeMapPlayer = data.homeMap;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].winner = data.winner;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].teamOneCiv = data.teamOneCiv;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].teamTwoCiv = data.teamTwoCiv;
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              nextMapIndex
            ].state = "open";
          }
        }
      }
    },
    deleteRound(state, data) {
      state.mapPickAndBanOverlayControlOptions.adminOptions = state.mapPickAndBanOverlayControlOptions.adminOptions.filter(
        (map) => {
          return map.id !== data.mapIdToDelete;
        }
      );
    },
    syncTeamNames: (state, data) => {
      state.mapPickAndBanOverlayControlOptions.team1Name = data.team1Name;
      state.mapPickAndBanOverlayControlOptions.team2Name = data.team2Name;

      state.roundOverlay.team1Name = data.team1Name;
      state.roundOverlay.team2Name = data.team2Name;
    },
    updateRoundType: (state, data) => {
      state.roundOverlay.roundMode = data.roundMode;
    },
    clearAllRounds: (state) => {
      state.mapPickAndBanOverlayControlOptions.adminOptions = [];
    },
    updateMapSelected: (state, data) => {
      // check to see if the same map has been selected, rename it if so
      const newMapName = debounceMapName(state, data.selectedMap);
      const mapToChange = state.mapPickAndBanOverlayControlOptions.adminOptions.filter(
        (map) => {
          return map.id === data.mapToReplace;
        }
      );
      if (mapToChange.length === 1) {
        mapToChange[0].id = newMapName;
        mapToChange[0].selectedMapName = newMapName;
      }
    },
    setWinnerModifyMapState: (state, data) => {
      const currentMapIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
        (map) => {
          return map.id === data.mapIdToModify;
        }
      );
      if (data.newMapState === "played") {
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          currentMapIndex
        ].state = data.newMapState;
        if (
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ]
        ) {
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ].state = "current";
        }
      } else if (data.newMapState === "current") {
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          currentMapIndex
        ].state = data.newMapState;
        if (
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ]
        ) {
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ].state = "open";
        }
      }
    },
    setMapStateModifyState: (state, data) => {
      const currentMapIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
        (map) => {
          return map.id === data.mapIdToModify;
        }
      );
      if (data.newMapState === "open") {
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          currentMapIndex
        ].state = "current";
        if (
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ]
        ) {
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ].state = data.newMapState;
        }
      } else if (data.newMapState === "current") {
        state.mapPickAndBanOverlayControlOptions.adminOptions[
          currentMapIndex
        ].state = "banned";
        if (
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ]
        ) {
          state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex + 1
          ].state = data.newMapState;
        }
      }
    },
    setSelectedCivsForTeam: (state, data) => {
      const currentMapIndex = state.mapPickAndBanOverlayControlOptions.adminOptions.findIndex(
        (map) => {
          return map.id === data.mapIdToModify;
        }
      );
      if (data.team === "team1") {
        if (
          !state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex
          ].teamOneCiv
        ) {
          Vue.set(
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ],
            "teamOneCiv",
            [data.selectedCiv]
          );
        } else {
          const duplicateCivIndex = state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex
          ].teamOneCiv.findIndex((civName) => {
            return civName === data.selectedCiv;
          });
          if (duplicateCivIndex > -1) {
            // remove it from the list
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ].teamOneCiv.splice(duplicateCivIndex, 1);
          } else {
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ].teamOneCiv.push(data.selectedCiv);
          }
        }
      } else if (data.team === "team2") {
        if (
          !state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex
          ].teamTwoCiv
        ) {
          Vue.set(
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ],
            "teamTwoCiv",
            [data.selectedCiv]
          );
        } else {
          const duplicateCivIndex = state.mapPickAndBanOverlayControlOptions.adminOptions[
            currentMapIndex
          ].teamTwoCiv.findIndex((civName) => {
            return civName === data.selectedCiv;
          });
          if (duplicateCivIndex > -1) {
            // remove it from the list
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ].teamTwoCiv.splice(duplicateCivIndex, 1);
          } else {
            state.mapPickAndBanOverlayControlOptions.adminOptions[
              currentMapIndex
            ].teamTwoCiv.push(data.selectedCiv);
          }
        }
      }
    },
    updateTeamCivDrafts: (state, payload) => {
      state.roundOverlay.teamOneCivDraft = payload.teamOneCivDraft;
      state.roundOverlay.teamTwoCivDraft = payload.teamTwoCivDraft;
    },
    updateRoundVisibility: (state, payload) => {
      state.roundOverlay.roundOverlayVisible = payload.roundOverlayVisible;
    },
    showMap: (state, payload) => {
      console.log("showmap", payload);
      state.showMap = true;
      state.mapId = payload.mapId;
    },
    hideMap: (state) => {
      console.log("hideMap");
      state.showMap = false;
      state.mapId = "";
    },
  },
  actions: {
    resetTransitionCivOverlay(store, payload) {
      if (payload.delay) {
        setTimeout(function() {
          console.log("resetTransitionCivOverlay");
          store.commit("resetTransitionCivOverlay");
          store.commit("clearCivs");
        }, payload.delay);
      } else {
        store.commit("resetTransitionCivOverlay");
      }
    },
    preTransitionCivOverlay(store, payload) {
      if (payload.delay) {
        setTimeout(function() {
          console.log("pretransition");
          store.commit("preTransitionCivOverlay");
        }, payload.delay);
      } else {
        store.commit("preTransitionCivOverlay");
      }
    },
    clearCivs(store, payload) {
      if (payload.delayMs) {
        store.commit("preTransitionCivOverlay");
        setTimeout(() => {
          store.commit("clearCivs", 2000);
        }, payload.delayMs);
      } else {
        store.commit("clearCivs");
      }
    },
    clearMaps(store, payload) {
      if (payload.delayMs) {
        store.commit("preTransitionMapOverlay");
        setTimeout(() => {
          store.commit("clearClientMaps", 2000);
        }, payload.delayMs);
      } else {
        store.commit("clearClientMaps");
      }
    },
    addNewPlayerRound(store, payload) {
      store.commit("addNewPlayerRound", payload);
    },
    saveRoundState(store, payload) {
      store.commit("saveRoundState", payload);
    },
    deleteRound(store, payload) {
      store.commit("deleteRound", payload);
    },
    clearRounds(store, payload) {
      store.commit("clearAllRounds", payload);
    },
    updateRoundVisibility(store, payload) {
      store.commit("updateRoundVisibility", payload);
    },
    setRoundType(store, payload) {
      store.commit("updateRoundType", payload);
    },
    syncTeamNames(store, payload) {
      store.commit("syncTeamNames", payload);
    },
    updateTeam1Civ(store, payload) {
      store.commit("updateTeam1Civ", payload);
    },
    updateTeam2Civ(store, payload) {
      store.commit("updateTeam2Civ", payload);
    },
    updateMapSelected(store, payload) {
      store.commit("updateMapSelected", payload);
    },
    setWinnerModifyMapState(store, payload) {
      store.commit("setWinnerModifyMapState", payload);
    },
    setMapStateModifyState(store, payload) {
      store.commit("setMapStateModifyState", payload);
    },
    setSelectedCivsForTeam(store, payload) {
      store.commit("setSelectedCivsForTeam", payload);
    },
    updateTeamCivDrafts(store, payload) {
      store.commit("updateTeamCivDrafts", payload);
    },
    updateTechOverlayControls(store, payload) {
      store.commit("updateTechOverlayControls", payload);
    },
    updateScoreboardOverlayControls(store, payload) {
      store.commit("updateMiscOverlayControlOptions", payload);
    },
    updateScoreboardClientControls(store, payload) {
      store.commit("updateScoreboardClientControls", payload);
    },
    showMap(store, payload) {
      store.commit("showMap", payload);
    },
    hideMap(store, payload) {
      store.commit("hideMap", payload);
    },
  },
});
