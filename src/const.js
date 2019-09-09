export const PLANETARY_NEIGHBOURS_CTX = require.context(
  './assets/planetaryNeighbours'
);

export const CONSTELLATION_CTX = require.context('./assets/constellations');

export const FLAG_PROPERTIES = {
  distance: 'distance',
  stellarMass: 'stellarMass',
  stellarRadius: 'stellarRadius',
  planetaryMass: 'planetaryMass',
  planetaryRadius: 'planetaryRadius',
  planetaryNeighbours: 'planetaryNeighbours',
  constellation: 'constellation'
};

export const FLAG_BUILDER_STEPS = [
  {
    path: '/explore/1',
    flagProperty: FLAG_PROPERTIES.distance,
    title: 'Distance',
    body: [
      'When we look out into the vast expanse of space for new worlds, we measure is the light we observe from Earth as a point of origin. This light from distant stars and galaxies allows us to catch and measure glimpses of new worlds as their paths cross the light that is beaming back to us.',
      'Knowing that light is a constant speed  we can measure the distance the light has travelled to reach us across such astronomical distances by observing how its spectrum has shifted based on how far away it begins its journey.',
      'Due to a phenomenon called redshift, astronomers know that the most distant sources of light are shifted towards the red end of the spectrum',
      'The Exoflags system uses this same metric, a shifting from blue to red to convey distance visually. A nearby exoplanet will automatically generate a blue background, while the further away our discovery the more shifted towards the red end of the spectrum its colour will be.'
    ]
  },
  {
    path: '/explore/2',
    flagProperty: FLAG_PROPERTIES.stellarMass,
    title: 'Stellar Mass',
    body: [
      'Once the distance of a host star with a candidate exoplanet is known, the mass of the star can be calculated by looking at its apparent luminosity and its distance. Knowing that brightness, or luminosity, is directly related to mass for a given star type can give us the answer we need.',
      'When stellar mass is calculated, the Exoflags system ties the numerical value of solar mass to the luminosity of a right-angled triangle where the most massive host stars are represented by the brightness of the triangle.',
      'The upper limits of our current understanding of stellar mass places the greatest possible mass of a star at around 350 solar masses. The minimum mass of what we can define as a star is currently theorised to be about 0.07 solar masses.'
    ]
  },
  {
    path: '/explore/3',
    flagProperty: FLAG_PROPERTIES.stellarRadius,
    title: 'Stellar Radius',
    body: [
      'The radius of an exoplanetary host star can be derived from its luminosity, distance and temperature, which can be found by spectral analysis.',
      'The Exoflags system then relates the radial size of the star and scales the height of the right-angled stellar visualisation whereby the minimum possible stellar radius (thought currently to be around 0.10 solar radii) would draw a more acute angle, and the maximum possible stellar radius (around 2600 solar radii) would fill the entire vertical width of the flag.'
    ]
  },
  {
    path: '/explore/4',
    flagProperty: FLAG_PROPERTIES.planetaryMass,
    title: 'Planetary Mass',
    body: [
      "Once an exoplanet has been verified in a regular orbit around a host star, its orbital period and radius can be ascertained. When the orbital radius has been determined, the mass of the planet can be calculated using Newton's Law of Gravitation.",
      'The same visual metaphor relating a right-angled triangle to mass is used here, this time conveying the absence of light created by an exoplanet moving in front of a host star as a black triangle. This triangle derives its transparency from the mass of the planet itself where the most massive planets possible have a more opaque appearance and the least massive planets are displayed as the least opaque.'
    ]
  },
  {
    path: '/explore/5',
    flagProperty: FLAG_PROPERTIES.planetaryRadius,
    title: 'Planetary Radius',
    body: [
      'To determine the planet’s radius, the drop in brightness of the parent star that occurs during a planetary transit is measured.',
      'The Exoflag system again draws the angle of the associated right-angled triangle to correspond with the data recorded about the exoplanet’s radius.',
      'The smallest theoretical definition of planetary radius (thought to be around 350km) will draw the most acute angle and the largest possible theoretical definition of planetary radius (thought to be about 48000 times the radius of Earth) draws the triangle to its maximum extent.'
    ]
  },
  {
    path: '/explore/6',
    flagProperty: FLAG_PROPERTIES.planetaryNeighbours,
    title: 'Exoplanetary Neighbours',
    body: [
      'An icon is attached to the upper right corner of the flag denoting the number of other observed planets orbiting the host star in question.',
      'Current estimates, based on observation, inform our understanding that a likely natural upper limit for the natural formation of planetary systems is estimated to be in the region of 10 planets*.',
      'Outside of our own solar system, the current exoplanetary system with the highest number of exoplanetary neighbours with distinct orbits is HD-10180, which has 9 planetary neighbours with distinct orbits.',
      '(*This figure is capable of changing with the emergence of further data)'
    ]
  },
  {
    path: '/explore/7',
    flagProperty: FLAG_PROPERTIES.constellation,
    title: 'Constellation',
    body: [
      'You’ve just explored the steps in data visualisation necessary to build an exoplanetary flag! Of the random variables you’ve chosen, on the right are the 3 most similar actual exoplanets that Earth-based studies have confirmed to date.',
      'You can learn more about these studies and explore the full depth of the NASA and Caltech database to find out more about the discovery of new worlds.'
      // Click here to search the confirmed exoplanets database.'
    ]
  }
];
