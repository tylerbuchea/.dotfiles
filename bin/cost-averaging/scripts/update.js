const fs = require('fs');
const request = require('request');
const combine = require('stream-combiner');
const transforms = require('./transforms');

const datasets = [
  {
    streams: [
      fs.createReadStream('./Coinbase_BTCUSD_d.csv'),
      transforms.csv(),
      transforms.toArray(),
      fs.createWriteStream('./coinbase.js'),
    ],
    onFinish: resolve => resolve('SUCCESS: ./coinbase.json'),
  },
];

main()
  .then(console.log)
  .catch(console.error);

async function main() {
  const promises = datasets.map(dataset =>
    promiseStream(dataset.streams, dataset.onFinish)
  );
  const paths = await Promise.all(promises);
  return paths;
}

function promiseStream(streams, onFinish) {
  const promise = new Promise((resolve, reject) => {
    const lastStream = streams[streams.length - 1];
    lastStream
      .on('finish', () => onFinish(resolve, streams))
      .on('error', reject);
  });
  combine(streams);
  return promise;
}
