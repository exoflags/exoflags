const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const outPath = path.join(__dirname, '../data/data.json');

const exoplanetsPath = path.join(__dirname, '../data/exoplanets.json');
const exoplanetsFile = fs.readFileSync(exoplanetsPath);
const exoplanets = JSON.parse(exoplanetsFile);

const constellationsPath = path.join(__dirname, '../data/constellations.csv');

csv()
  .fromFile(constellationsPath)
  .then(data => {
    const constellations = indexBy(data, d => d['Planetary Name']);

    exoplanets.forEach(exoplanet => {
      const joinData = constellations[exoplanet.pl_name];
      const constellation = joinData && joinData.Constellation;

      exoplanet.constellation = constellation || null;
      // Convert jupiter mass to earth mass (Mj/Me)
      exoplanet.pl_bmassj =
        exoplanet.pl_bmassj && exoplanet.pl_bmassj * 317.828;
      // Convert jupiter radius to earth radius (Rj/Re)
      exoplanet.pl_radj = exoplanet.pl_radj && exoplanet.pl_radj * 11.209;
    });

    fs.writeFileSync(
      outPath,
      JSON.stringify(Object.values(exoplanets), null, 4)
    );

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
