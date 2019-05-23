const csv = require('csvtojson');
const { Transform } = require('stream');
const fs = require('fs').promises;

module.exports = {
  csv: () => csv(),
  toArray: () => {
    let firstChunk = true;
    const transform = new Transform({
      writableObjectMode: true,
      transform: (chunk, encoding, next) => {
        let data = chunk.toString();
        if (firstChunk) {
          firstChunk = false;
          data = 'module.exports = [\n' + data;
        }
        data += ',';
        next(null, data);
      },
      flush(cb) {
        this.push('\n]');
        cb();
      },
    });
    return transform;
  },
};
