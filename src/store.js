import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        civ1: "test",
        civ2: "",
        upgradeGroups: [],
        ageNames: {},
        civHelpTexts: {},
        civNames: {},
        dataString: {},
        SocketEnums: {
            ClientRegister: 0,
            AdminShow: 2,
            AdminHideAll: 6
        },
        techUpgradeOverlayControlOptions: {
            sound: false,
            tech: false,
            blacksmith: false,
            university: false,
            monastary: false,
            dock: false,
            barracks: false,
            archeryRange: false,
            stable: false,
            siegeWorkshop: false
        }
    },
    getters: {
        getCivDescription: (state) => (civName) => {
            return state.dataString[state.civHelpTexts[civName]] || "";
        },
        getCivNames: (state) => {
            return Object.keys(state.civNames);
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
        updateCiv(state, civ) {
            if (state.civ1 === "") {
                state.civ1 = civ;
            } else {
                state.civ2 = civ;
            }
        },
        updateUpgradeGroups(state, upgrades) {
            state.upgradeGroups = upgrades;
        },
        clearCivs(state) {
            state.civ1 = "";
            state.civ2 = "";
        },
        clearUpgradeGroups(state) {
            state.upgradeGroups = [];
        }
    },
    actions: {
        // Get data from server and send that to mutations to mutate the current state
    }
});
