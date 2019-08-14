// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [ planetData, setPlanetData ] = useState([]);
  
//   useEffect(() => {
//     async function fetchData() {
//       const baseUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI';
//       const table = 'exoplanets';
//       const columns = [
//         'pl_hostname',
//         'pl_name',
//         'pl_discmethod',
//         'st_dist',
//         'pl_bmassj',
//         'st_mass',
//         'pl_orbper'
//       ];
//       const orderCol = columns[2];
//       const format = 'json';
  
//       const url = `${baseUrl}?table=${table}&select=${columns}&order=${orderCol}&format=${format}`;
  
//       const res = await fetch(url);
//       const data = await res.json();

//       setPlanetData(data);
//     }

//     fetchData();
//   }, [])

//   if (planetData.length === 0) {
//     return <p>loading...</p>;
//   }

//   return planetData.map(planet => (
//     <p key={planet.pl_name}>{planet.pl_name}</p>
//   ));
// }

// export default App;
