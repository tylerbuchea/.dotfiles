const coinbase = require('./coinbase');
const dailyAssetPrices = coinbase
  // .filter(({ Date: date }) => date.split('-')[0] === '2018')
  .map(({ Close }) => parseInt(Close));

// console.log('lengths', coinbase.length, dailyAssetPrices.length);

const amountToSpend = 6000;

const buyPeriodInDays = dailyAssetPrices.length;
const costAveragingDailyBuy = amountToSpend / buyPeriodInDays;

let totalAssetsBoughtWithCostAveraging = 0;

dailyAssetPrices.forEach(assetPriceToday => {
  const assetsBoughtToday = costAveragingDailyBuy / assetPriceToday;
  totalAssetsBoughtWithCostAveraging += assetsBoughtToday;
});

let marketBeatingDays = 0;
const marketBeatingDaysAssetsBought = [];

dailyAssetPrices.forEach(assetPriceToday => {
  const assetsBoughtToday = amountToSpend / assetPriceToday;
  if (assetsBoughtToday > totalAssetsBoughtWithCostAveraging) {
    marketBeatingDays++;
    marketBeatingDaysAssetsBought.push(assetsBoughtToday);
  }
});

const bestMarketBeatingDayAssetsBought = marketBeatingDaysAssetsBought
  .sort()
  .reverse()[10];
const bestDayPercentDifference =
  (bestMarketBeatingDayAssetsBought / totalAssetsBoughtWithCostAveraging) * 100;

const lastPriceForPeriod = dailyAssetPrices[dailyAssetPrices.length - 1];
const totalDollarsFromBeatingMarket =
  bestMarketBeatingDayAssetsBought * lastPriceForPeriod;
const totalDollarsFromCostAveraging =
  totalAssetsBoughtWithCostAveraging * lastPriceForPeriod;

const dollarReturnOnInvestmentBeatingMarket =
  totalDollarsFromBeatingMarket - amountToSpend;
const dollarReturnOnInvestmentCostAveraging =
  totalDollarsFromCostAveraging - amountToSpend;

const percentReturnOnInvestmentBeatingMarket = parseInt(
  (dollarReturnOnInvestmentBeatingMarket / amountToSpend) * 100
);
const percentReturnOnInvestmentCostAveraging = parseInt(
  (dollarReturnOnInvestmentCostAveraging / amountToSpend) * 100
);

console.log(
  'marketBeatingDays:',
  marketBeatingDays,
  'out of ' + buyPeriodInDays,
  `(${parseInt((marketBeatingDays / buyPeriodInDays) * 100)}%)`
);
console.log(
  'bestMarketBeatingDayAssetsBought:',
  bestMarketBeatingDayAssetsBought.toFixed(2) + ' units'
);
console.log(
  'totalAssetsBoughtWithCostAveraging:',
  totalAssetsBoughtWithCostAveraging.toFixed(2) + ' units'
);
console.log(
  `bestDayPercentDifference: ${bestDayPercentDifference.toFixed(2)}%`
);
console.log('costAveragingDailyBuy:', '$' + costAveragingDailyBuy.toFixed(2));

console.log('lastPriceForPeriod:', lastPriceForPeriod);

console.log(
  'totalDollarsFromBeatingMarket:',
  '$' + parseInt(totalDollarsFromBeatingMarket)
);
console.log(
  'totalDollarsFromCostAveraging:',
  '$' + parseInt(totalDollarsFromCostAveraging)
);
console.log(
  'dollarReturnOnInvestmentBeatingMarket',
  '$' + parseInt(dollarReturnOnInvestmentBeatingMarket),
  `(${percentReturnOnInvestmentBeatingMarket}%)`
);
console.log(
  'dollarReturnOnInvestmentCostAveraging',
  '$' + parseInt(dollarReturnOnInvestmentCostAveraging),
  `(${percentReturnOnInvestmentCostAveraging}%)`
);
