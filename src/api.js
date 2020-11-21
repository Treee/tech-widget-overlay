export default {
    async getAoEData() {
        const aoeData = await fetch("https://aoe2techtree.net/data/data.json");
        return aoeData.json();
    },

    async getAoEDataStrings() {
      const aoeDataStrings = await fetch("https://aoe2techtree.net/data/locales/en/strings.json");
      return aoeDataStrings.json();
    },
    async getAoEOverlayInfo() {
        const options = {
            headers: {
                origin: "*"
            }
        };
        const info = await fetch("http://localhost:32123/players", options);
        return info.json();
    },

    async getAoECMInfo(profileId){
        // https://bobstuff.org/cmoverlays/profile/5bc51522b1368b6070a3d033
        const options = {
            headers: {                
                origin: "*"
            }
        };
        const info = await fetch(`https://bobstuff.org/cmoverlays/profile/${profileId}`, options);
        return info.json();
    }
}