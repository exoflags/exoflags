const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const outPath = path.join(__dirname, '../data/data.json');

const exoplanetsPath = path.join(__dirname, '../data/exoplanets.json');
const exoplanetsFile = fs.readFileSync(exoplanetsPath);
// Nest by id for faster lookup, avoid keeping 2 representations of same data
const exoplanets = indexBy(JSON.parse(exoplanetsFile), d => d.pl_name);

const constellationsPath = path.join(__dirname, '../data/constellations.csv');

csv()
  .fromFile(constellationsPath)
  .then(data => {
    data.forEach(d => {
      const planetaryName = d['Planetary Name'];
      const constellation = d['Constellation'];

      const exoplanet = exoplanets[planetaryName];
      exoplanet.constellation = constellation || null;
    });

    fs.writeFileSync(outPath, JSON.stringify(exoplanets, null, 4));

    console.log('Success!');
  })
  .catch(error => console.log(error));

function csvToJson(path) {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(path)
      .then(json => resolve(json))
      .catch(error => console.log(error));
  });
}

function indexBy(array, accessor) {
  return array.reduce((memo, el) => {
    memo[accessor(el)] = el;
    return memo;
  }, {});
}
