
export interface MarketSnapshot {
    lastUpdateId: number;
    bids: {
        [key: string]: string;
    };
    asks: {
        [key: string]: string;
    };
}
