/*
    CHALLENGE:
    - Stream updates for BTCUSDT
    - Get snapshot for BTCUSDT
    - Sync snapshot and updates so data is accurate
    - Take arg for x BTC
    - Calc average buy/ask USDT price for x BTC
        - Account for buy/ask quantities
    - Output to console
*/

import WebSocket from 'ws';
import Axios from 'axios';
import { MarketSnapshot } from './models/MarketSnapshot';
import { MarketUpdate } from './models/MarketUpdate';

export class Main {
    private readonly snapshotUrl = 'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1000';
    private readonly updatesUrl = 'wss://stream.binance.com:9443/ws/btcusdt@depth@100ms';
    private readonly websock: WebSocket;
    private readonly targetBTC: number;
    private snapshot: MarketSnapshot;
    private updates: MarketUpdate[] = []; // could be sortable queue

    constructor(btc: number) {
        this.targetBTC = btc;
        // setup websock for updates
        this.websock = new WebSocket(this.updatesUrl);
        this.websock.on('error', (e: any) => { console.error(e); });
        this.websock.on('ping', () => { this.websock.pong(); });
        this.websock.on('message', (data: any) => { this.updates.push(JSON.parse(data) as MarketUpdate); });
    }

    public async run() {
        await this.getSnapshot();
        this.applyUpdates();
        this.calcAverages();
        setTimeout(this.run.bind(this), 1000);
    }
    private async getSnapshot() {
        // skip if already have and wait for updates
        if (this.snapshot && !this.updates.length) {
            return;
        }
        // get snapshot
        const response = await Axios.get(this.snapshotUrl);
        if (response.status == 200 && response.data != null) {
            this.snapshot = {
                lastUpdateId: response.data.lastUpdateId,
                bids: {},
                asks: {},
            };
            // turn bid/ask arrays into maps
            response.data.bids.forEach((x: MarketUpdate) => {
                this.snapshot.bids[x[0]] = x[1];
            });
            response.data.asks.forEach((x: MarketUpdate) => {
                this.snapshot.asks[x[0]] = x[1];
            });
        } else {
            throw new Error('Failed to get snapshot!');
        }
    }
    private applyUpdates() {
        // sort update according to update time
        this.updates.sort((a: MarketUpdate, b: MarketUpdate): number => {
            return a.E - b.E;
        });

        // wait for snapshot and updates, and for updates to catchup to snapshot
        if (!this.snapshot || !this.updates.length ||
            this.updates[this.updates.length - 1].u < this.snapshot.lastUpdateId) {
            return;
        }

        // iter updates
        for (let i = 0; i < this.updates.length; ++i) {
            // cache and remove from array
            const up = this.updates[i];
            this.updates.splice(i--, 1);

            // skip if too old for this snapshot
            if (up.u < this.snapshot.lastUpdateId) {
                continue;
            }

            // SEE README FOR SOLUTION TO PARTIAL UPDATE

            //apply update to snapshot
            up.b.forEach(x => {
                this.snapshot.bids[x[0]] = x[1];
            });
            up.a.forEach(x => {
                this.snapshot.asks[x[0]] = x[1];
            });
        }
    }
    private calcAverages() {
        // wait for snapshot
        if (!this.snapshot) {
            return;
        }

        // cals average trade
        const avgTrade = (amount: number, prices: string[], quantities: Object): number => {
            let total: number = 0;
            for (let price of prices) {
                if (amount <= 0) {
                    break;
                }
                let quantity = +quantities[price];
                let trade = Math.min(amount, quantity);
                amount -= trade;
                total += trade * +price;
            }
            return total;
        };

        // calc and log
        let avgBid: number = avgTrade(this.targetBTC, Object.keys(this.snapshot.bids).sort(), this.snapshot.bids);
        let avgAsk: number = avgTrade(this.targetBTC, Object.keys(this.snapshot.asks).sort().reverse(), this.snapshot.asks);

        process.stdout.write(`\r${this.targetBTC}x BTC\t\tBID: \$${avgBid.toFixed(6)}\t\tASK: \$${avgAsk.toFixed(6)}`);
    }
    public sum(a: number, b: number): number {
        return Math.floor(a + b);
    }
}
