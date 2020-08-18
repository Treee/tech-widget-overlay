export default {
    async getAoEData() {
        const aoeData = await fetch("https://aoe2techtree.net/data/data.json");
        return aoeData.json();
    },

    async getAoEOverlayInfo() {
        const options = {
            headers: {
                'Access-Control-Allow-Origin': 'https://treee.github.io'
            },
        };
        const info = await fetch("http://localhost:32123/players", options);
        return info.json();
    }
}