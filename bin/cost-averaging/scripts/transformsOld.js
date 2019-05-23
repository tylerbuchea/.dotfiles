const csv = require("csvtojson")
const { Transform } = require("stream")
const fs = require("fs").promises

module.exports = {
  js: () => {
    let firstLine = true
    const transform = new Transform({
      writableObjectMode: true,
      transform(chunk, encoding, next) {
        const data = JSON.parse(chunk.toString())
        let string = JSON.stringify(data) + ",\n"
        if (firstLine) {
          string = "export default [\n" + string
          firstLine = false
        }
        next(null, string)
      },
      flush(callback) {
        this.push("\n]")
        callback()
      },
    })
    return transform
  },
  bucket: () => {
    const collector = {}

    const transform = new Transform({
      writableObjectMode: true,
      transform(chunk, encoding, next) {
        const data = JSON.parse(chunk.toString())
        const {
          RegionID,
          RegionName,
          State,
          Metro,
          CountyName,
          SizeRank,
          ...dates
        } = data

        Object.entries(dates).forEach(([date, price]) => {
          if (!collector[date]) collector[date] = {}
          collector[date][RegionName] = price
        })

        next(null, chunk)
      },
    })

    transform.on("finish", () => {
      const data = Object.entries(collector).map(([date, regions]) => ({
        name: date,
        ...regions,
      }))
      fs.writeFile("./src/data/yo.js", JSON.stringify(data))
    })

    return transform
  },
}
