# Binance Local Order Book
This task requires you to design and/or create a local order book that replicates the Binance order book. To accomplish this task you will need to refer to the Binance documentation to understand the structure of the order book updates messages.
 
 ### Resources & Tooling Allowed
 - [Binance Diff Depth Stream](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#diff-depth-stream)
 - [How to manage a local order book correctly](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#how-to-manage-a-local-order-book-correctly)
 - Http, Websocket and other libraries of your choosing
   - Binance related libraries are not allowed)
   - Data structure imports are allowed, if you do use one please explain your choice
 - Take a look at [Binance's BTCUSDT Interface](https://www.binance.com/en/trade/BTC_USDT?type=spot)
 - Reach out with any questions
 
 ### Requirements
 You are required to design a solution to create a local copy of the Binance's BTCUSDT market. This local copy will be used to compute weighted buy and sell prices. Your app will need to accept an argument for the quantity of BTC to use for the weighted pricing. With that argument, you are to produce an average execution price to buy or sell the aforementioned quantity of Bitcoin. You should display this price on the console, preferably overwriting the previous line (instead of just appending a new line to console).

Some trading background: 
- BTC/USDT is currency pair. 
- BTC is the symbol for bitcoin. In this pair, its called the base currency
- USDT is the symbol for Tether (a USD backed stable coin). In this pair, its called the quote currency
- A sell order with a price if 31000, meeans the cost per BTC, is 31000 USDT (roughly 31K US)
 
The idea behind the average execution price is that it should tell the user what the average price would be for their given order size at any point in time. The reason this is useful is that the larger the trade in a financial market, the more slippage there will be and thus the worse the average price will be for the user. In this sense, the average execution price is the true price for the user, more so than just the best buy and sell prices.
 

