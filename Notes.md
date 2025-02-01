Source of Binance crypto statistics: https://developers.binance.com/docs/binance-spot-api-docs/rest-api/general-api-information

Steps to find the above endpoint:
1. visit www.binance.com
2. scroll down to the bottom and click "APIs" under "Support"
3. scroll down to the bottom ==> click "Is there an API Documentation?" ==> click the link "this Page"

////////////////////////////////////////////////////////////////////////////////////////////////////////////

This app is working as at 26 Jan 16.12

Achievement:
1. Successfully fetch, filter, format fetched data into object format to be saved into mongodb
2. Successfully delete unwanted documents in mongodb
3. Successfully format mongodb document format into custom format

//////////////////////////////////////////////////////////////////////////////////////////

Monitoring work in progress:
1. Successful document deletion on 02 Feb 2025 02:00 onwards

/////////////////////////////////////////////////////////////////////////////////////////////////

Issues encountered:
1. Documents with non-underscored id are created from nowhere
2. Documents with same date and same hourlyTF are created

//////////////////////////////////////////////////////////////////////////////////////////////////

Document format in mongoDB:

{
    date: dd.mm.yyyy,
    hourlytimeframe: "hh:mm",
    BTCUSDT: 0.111,
    ETHUSDT: 0.222,
    BNBUSDT: 0.333,
    LTCUSDT: 0.444,
    ...
    ...
    DOTUSDT: 0.111,
    SUSHIUSDT: 0.222
}