
export interface MarketUpdate {
    e: string; // Event type
    E: number; // Event time
    s: string; // Symbol
    U: number; // First update ID in event
    u: number; // Final update ID in event
    b: string[][]; // Bids to be updated
    a: string[][]; // Asks to be updated
}
