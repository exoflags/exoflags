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

export const EXAMPLES = [
  {
    path: '/examples/',
    title: 'Objects of interest',
    name: '',
    body: [
      'Click a planet above to discover a selection of notable confirmed exoplanets and their associated flag visualisations.'
    ]
  },
  {
    path: '/examples/1',
    title: 'Most Recently Confirmed',
    name: 'bet Pic c',
    body: [
      'Beta Pictoris-C was discovered on August 28th 2019 by Lagrange et al. It can be found 19.3 Parsecs away from Earth in the consteallation Pictor. It is 2860 times more massive than the Earth. Its host star has a mass of 1.76 solar masses.',
      'As new planets get discovered, this page and our Instagram feed automatically posts the most up-to-date flag visualisation, follow @Exoflags on Instagram to stay up to date'
    ]
  },
  {
    path: '/examples/2',
    title: 'Closest Confirmed',
    name: 'Proxima Cen b',
    body: [
      'The closest confirmed exoplanet fs Proxima Centauri b, which was confirmed in 2016 to orbit Proxima Centauri, the closest star to our Solar System, 1.3 parsecs (4.25 light years away in the constellation Centaurus.',
      'At the current progress of human space travel technology, it would take over 81,000 years to reach it.'
    ]
  },
  {
    path: '/examples/3',
    title: 'Largest Confirmed',
    name: 'TrES-4 b',
    body: [
      'The largest planet discovered to date is also one of the strangest and theoretically should not even exist, scientists say. Dubbed TrES-4, the planet is about 1.7',
      'times the size of Jupiter and belongs to a small subclass of "puffy" planets that have extremely low densities.'
    ]
  },
  {
    path: '/examples/4',
    title: 'Best candidate for supporting life',
    name: 'Kepler-186 f',
    body: [
      'A 2015 review concluded that the exoplanet Kepler-186f was likely the best candidates for being potentially habitable. It is located at a distance of 490 light-years away.',
      'Kepler-186f is similar in size to Earth with a 1.2-Earth-radius size and it is located towards the outer edge of the habitable zone around its red dwarf host star in the constellation Cygnus'
    ]
  }
];
export const FLAG_BUILDER_STEPS = [
  {
    path: '/explore/1',
    flagProperty: FLAG_PROPERTIES.distance,
    title: 'Distance',
    body: [
      'When we look out into the vast expanse of space for new worlds, what we measure is the light we observe from Earth as a point of origin. This light from distant stars and galaxies allows us to catch and measure glimpses of new worlds as their paths cross the light that is beaming back to us.',
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
      'The final component of the system identifies the area of the night sky from Earth where we can locate the exoplanet in question.',
      'In 1922 the International Astronomical Union (IAU) formally accepted the modern list of 88 constellations, and in 1928 adopted official constellation boundaries that together cover the entire celestial sphere from the earth as a point of origin.',
      'Any given point in a celestial coordinate system lies within the boundaries of one of these modern constellation symbols, thus aiding in approximating the area of the sky where the associated exoplanet can be found.',
      // 'The basis of this set of modern constellation iconography builds upon the work originally created by Denis Moskowitz, which can be found here: <a href="https://thenounproject.com/denismm/collection/constellation-symbols-fixed-width/">https://thenounproject.com/denismm/collection/constellation-symbols-fixed-width/</a>'

      // Click here to search the confirmed exoplanets database.'
      'Drag the red pin to choose the constellation where the planet can be found.'
    ]
  }
];
