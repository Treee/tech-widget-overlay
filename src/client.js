import { SocketEnums } from "./socket-enums";

export default {
    clientProperties: {
        clientId: ''
    },
    // dataType: SocketEnums, rawData: any
    formatDataForWebsocket(dataType, rawData) {
        console.log(`Formatting Data for websocket.\nDataType: ${dataType} / ClientId: ${this.clientProperties.clientId} / RawData:`, rawData);
        return JSON.stringify({ type: dataType, data: rawData, toClientId: this.clientProperties.clientId });
    },
    sendMessage(dataType, rawData) {
        this.socket.send(this.formatDataForWebsocket(dataType, rawData));
    },
    startClient(clientId, callbackFn) {
        this.clientProperties.clientId = clientId;
        const isLocal = false;
        const url = isLocal ? 'ws://localhost:8443' : 'wss://itsatreee.com/aoe-websocket-server/';
        this.socket = new WebSocket(url);
        this.socket.onopen = this.onOpen.bind(this);
        // this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onmessage = callbackFn;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
        return this;
    },
    onOpen() {
        console.log('[open] Connection established');
        this.socket.send(this.formatDataForWebsocket(SocketEnums.ClientRegister, this.clientProperties.clientId));
    },
    onMessage(event) {
        console.log(`DataType: ${event.type} / RawData: ${JSON.stringify(event.data)}`);
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