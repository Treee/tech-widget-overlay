const SocketEnums = {
    ClientRegister: 0
}
export default {
    clientProperties: {
        clientId: ''
    },
    // message: { type: SocketEnums, data: any }
    handleMessage(message) {
        console.log(`DataType: ${message.type} / RawData: ${JSON.stringify(message.data)}`);
    },
    // dataType: SocketEnums, rawData: any
    formatDataForWebsocket(dataType, rawData) {
        console.log('Formatting Data for websocket');
        console.log(`Formatting Data for websocket.\nDataType: ${dataType} / RawData: ${rawData} / ClientId: ${this.clientProperties.clientId}`);
        return JSON.stringify({ type: dataType, data: rawData, toClientId: this.clientProperties.clientId });
    },
    startClient(clientId, callbackFn) {
        this.clientProperties.clientId = clientId;
        this.socket = new WebSocket('wss://www.itsatreee.com:8443');
        this.socket.onopen = this.onOpen.bind(this);
        // this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onmessage = callbackFn;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
    },
    onOpen() {
        console.log('[open] Connection established');
        this.socket.send(this.formatDataForWebsocket(SocketEnums.ClientRegister, this.clientProperties.clientId));
    },
    onMessage(event) {
        this.handleMessage(JSON.parse(event.data));
    },
    onClose(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    },
    onError(event) {
        console.log(`[error] ${event.message}`);
    }
}