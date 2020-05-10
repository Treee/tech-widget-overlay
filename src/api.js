export default {
    async getAoEData() {
        const aoeData = await fetch("https://aoe2techtree.net/data/data.json");
        return aoeData.json();
    }
}