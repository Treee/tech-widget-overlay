import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultMaps = [
    "acropolis",
    "alpine-lakes",
    "arabia",
    "archipelago",
    "arena",
    "baltic",
    "black-forest",
    "cenotes",
    "coastal",
    "continental",
    "fortress",
    "front-line",
    "ghost-lake",
    "golden-pit",
    "gold-rush",
    "hideout",
    "highland",
    "hill-fort",
    "islands",
    "lombardia",
    "mediterranean",
    "mega-random",
    "migration",
    "mongolia",
    "nomad",
    "oasis",
    "scandinavia",
    "serengeti",
    "socotra",
    "steppe",
    "team-islands",
    "valley",
    "yucatan"
];

const customMaps = [
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
    "hc3-arabia",
    "hc3-bay",
    "hc3-cross",
    "hc3-cup",
    "hc3-el-dorado",
    "hc3-goldrush",
    "hc3-hideout",
    "hc3-high-tide",
    "hc3-islands",
    "hc3-ravines",
    "hc3-slopes",
    "msm-acclivity",
    "msm-alpine",
    "msm-arabia",
    "msm-big-freeze",
    "msm-haboob",
    "msm-kawasan",
    "msm-lowland"
];

const customMapPrefixes = ["boa2", "rbw", "hc3", "msm"];

const toCamelCase = (text) => {
    let camelCase = "";
    text.split("-").forEach(word => {
        camelCase = camelCase
            .concat(word.charAt(0).toUpperCase())
            .concat(word.substring(1))
            .concat(" ");
    });
    return camelCase;
};

export default new Vuex.Store({
    strict: true,
    state: {
        civ1: "",
        civ2: "",
        upgradeGroups: [],
        ageNames: {},
        civHelpTexts: {},
        civNames: {},
        dataString: {},
        clientControlOptions: {
            selectedMapsAndState: []
        },
        techUpgradeOverlayControlOptions: {
            civ1: "",
            civ2: "",
            sound: true,
            tech: true,
            blacksmith: false,
            university: false,
            monastary: false,
            dock: false,
            barracks: false,
            archeryRange: false,
            stable: false,
            siegeWorkshop: false
        },
        mapPickAndBanOverlayControlOptions: {
            mapOverlayVisible: false,
            showMapBrandingImage: false,
            brandingImageUrl: "",
            numPicks: 1,
            numBans: 1,
            team1Name: "",
            team2Name: "",
            selectedMaps: [],
            mapStates: []
        },
        playerCivOverlayControlOptions: {
            selectedCivs: [],
            isCivDisplayVisible: false
        },
        defaultMaps: defaultMaps,
        customMaps: customMaps,
        customMapPrefixes: customMapPrefixes
    },
    getters: {
        getCivDescription: (state) => (civName) => {
            return state.dataString[state.civHelpTexts[civName]] || "";
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
        getAllMaps: (state) => {
            return state.customMaps.concat(state.defaultMaps);
        },
        getCustomPrefixes: (state) => {
            return state.customMapPrefixes;
        },
        getFormattedMapName: (state) => (rawMapName) => {
            let mapName = "";
            const mapNameParts = rawMapName.split("-");
            if (mapNameParts.length === 1) {
                // single word map name, not custom
                mapName = toCamelCase(rawMapName);
            } else {
                const customMapPrefix =
                    state.customMapPrefixes.find(prefix => {
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
        isCustomMap: (state) => (map) => {
            return state.customMaps.some(customMap => {
                return map === customMap;
            });
        },
        isPlayerOne: (state) => (playerName) => {
            return state.techUpgradeOverlayControlOptions.civ1 === playerName;
        },
        isPlayerTwo: (state) => (playerName) => {
            return state.techUpgradeOverlayControlOptions.civ2 === playerName;
        }
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
        updateCivs(state, { civ1, civ2 }) {
            if (civ1 !== "") {
                state.techUpgradeOverlayControlOptions.civ1 = civ1;
                console.log('civ1')
            }
            if (civ2 !== "") {
                state.techUpgradeOverlayControlOptions.civ2 = civ2;
                console.log('civ2')
            }
        },
        updateUpgradeGroups(state, upgrades) {
            state.upgradeGroups = upgrades;
        },
        clearCivs(state) {
            state.techUpgradeOverlayControlOptions.civ1 = "";
            state.techUpgradeOverlayControlOptions.civ2 = "";
        },
        clearUpgradeGroups(state) {
            state.upgradeGroups = [];
        },
        clearSelectedMaps(state) {
            state.mapPickAndBanOverlayControlOptions.selectedMaps = [];
        },
        updateSelectedMaps(state, newMaps) {
            state.mapPickAndBanOverlayControlOptions.selectedMaps = newMaps;
        },
        updateMapPickAndBanOverlayControls(state, data) {
            state.mapPickAndBanOverlayControlOptions.mapOverlayVisible = data.mapOverlayVisible;
            state.mapPickAndBanOverlayControlOptions.showMapBrandingImage = data.showMapBrandingImage;
            state.mapPickAndBanOverlayControlOptions.brandingImageUrl = data.brandingImageUrl;
            state.mapPickAndBanOverlayControlOptions.numPick = data.numPick;
            state.mapPickAndBanOverlayControlOptions.numBan = data.numBan;
            state.mapPickAndBanOverlayControlOptions.team1Name = data.team1Name;
            state.mapPickAndBanOverlayControlOptions.team2Name = data.team2Name;
        },
        updateTechUpgradeOverlayControlOptions(state, data) {
            state.techUpgradeOverlayControlOptions.sound = data.sound;
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
        updatePlayerCivOverlayControlOptions(state, data) {
            state.playerCivOverlayControlOptions.selectedCivs = data.selectedCivs;
            state.playerCivOverlayControlOptions.isCivDisplayVisible = data.isCivDisplayVisible;
        }
    },
    actions: {
        // Get data from server and send that to mutations to mutate the current state
    }
});
