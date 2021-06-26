/*
    CHALLENGE:
    - Stream updates for BTCUSDT
    - Get snapshot for BTCUSDT
    - Sync snapshot and updates so data is accurate
    - Take arg for x BTC
    - Calc average buy/ask USDT price for x BTC
        - Account for buy/ask quantities
    - Output to console

    wss://stream.binance.com:9443/ws/btcusdt@depth@100ms
*/

import WebSocket = require("ws");

class Main
{
    readonly streamUrl = 'wss://stream.binance.com:9443/ws/btcusdt@depth';
    protected websock: WebSocket;

    constructor () {
        this.websock = new WebSocket(this.streamUrl);
        this.websock.on('open', () => { console.log('Connected!'); });
        this.websock.on('close', () => { console.log('Disconnected!'); });
        this.websock.on('error', (e: any) => { console.error(e); });
        this.websock.on('ping', this.onPing.bind(this));
        this.websock.on('message', this.onMessage.bind(this));
    }

    onPing() {
        this.websock.pong();
    }
    onMessage(data: any) {
        console.log(data);
        this.websock.close();
    }
}

const main = new Main();
