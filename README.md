
## How to run

- Run `npm install`.
- Run `npm start {BTC quantity}`.
- See console output for results.

## Proposed solution to the partial update problem

- Begin continuous buffering of updates
- Get orderbook snapshot A
- Get orderbook snapshot B
- Subtract A from B, giving us a "delta snapshot" X
- Combine updates into a "delta snapshot" Y
- Subtract X from Y, giving us "margin snapshot" M
- For each price/quantity
  - Where M is 0, we are in sync
  - Where M is same magnitude as in X, discard update from X
  - Where M is same magnitude as in Y, discard update from Y
  - Where M is same magnitude as in Y and X, discard update from X and Y
