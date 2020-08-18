export default {
    async getAoEData() {
        const aoeData = await fetch("https://aoe2techtree.net/data/data.json");
        return aoeData.json();
    },

    async getAoEOverlayInfo() {
        const options = {
            headers: {
                mode: 'no-cors'
            },
        };
        const info = await fetch("http://localhost:32123/players", options);
        return info.json();
    }
}