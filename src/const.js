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
      'Reprehenderit mollit magna mollit proident.',
      'Ipsum id esse in fugiat velit tempor. Sunt enim Lorem ut voluptate voluptate qui eu eiusmod et amet id. Anim pariatur labore elit irure. Nulla aliquip consequat irure ipsum. Lorem ipsum et irure sunt cillum dolor ullamco irure non est. Et veniam in proident eu dolor quis sint cillum in est ullamco.',
      'Quis sunt minim nostrud exercitation velit nostrud et veniam ut.'
    ]
  },
  {
    path: '/explore/2',
    flagProperty: FLAG_PROPERTIES.stellarMass,
    title: 'Stellar Mass',
    body: [
      'Excepteur ipsum ipsum irure officia elit laborum aliqua est aute ad occaecat nulla mollit consequat. Aliqua dolor nisi aliquip nulla laboris sint. Pariatur veniam occaecat et ex eu commodo aliquip nostrud occaecat nisi labore.',
      'Aute Lorem cillum ea sint consequat laboris eu excepteur incididunt officia aliquip reprehenderit enim. Aute pariatur sint ullamco officia exercitation eiusmod pariatur irure esse culpa deserunt deserunt aliqua quis. Anim pariatur est ullamco irure laborum nostrud velit eu consectetur adipisicing magna Lorem deserunt. Eu fugiat aliqua labore tempor eiusmod ex commodo ex sint ut adipisicing. Tempor enim enim qui nostrud do Lorem ad ut. Eiusmod ad sit ea voluptate ut magna nisi mollit.',
      'Cillum consectetur eu velit culpa voluptate eu.'
    ]
  },
  {
    path: '/explore/3',
    flagProperty: FLAG_PROPERTIES.stellarRadius,
    title: 'Stellar Radius',
    body: [
      'Cupidatat ut sunt mollit officia ex nisi proident id.',
      'Anim ad elit deserunt occaecat et ad non velit ullamco nulla aliqua consequat eu irure.',
      'Reprehenderit ullamco veniam minim non irure ut consequat veniam in. In culpa sit occaecat ex dolor velit consequat reprehenderit quis est do do. Occaecat id enim velit ad consectetur sint. Ea nisi id incididunt laboris cillum sunt. Lorem non irure in ad aute id eiusmod ipsum commodo fugiat aliquip pariatur ea incididunt. Eu sit laboris proident tempor. Laborum enim in qui exercitation dolore do tempor mollit sint.'
    ]
  },
  {
    path: '/explore/4',
    flagProperty: FLAG_PROPERTIES.planetaryMass,
    title: 'Planetary Mass',
    body: [
      'Esse qui non non cupidatat fugiat proident.',
      'Minim irure dolore nisi cillum Lorem amet ipsum commodo voluptate proident. Eu ut tempor ex officia. Adipisicing irure id ipsum est velit ea nulla veniam. Eu irure elit eu aliquip. Ut tempor cupidatat officia proident nisi duis. Et mollit consequat sunt minim mollit proident.',
      'Ullamco dolore cillum incididunt excepteur dolor sint cillum ullamco magna. Mollit enim laboris veniam esse ad. Commodo velit aute Lorem voluptate. Fugiat ipsum eiusmod quis ad sit ea sint in cupidatat.'
    ]
  },
  {
    path: '/explore/5',
    flagProperty: FLAG_PROPERTIES.planetaryRadius,
    title: 'Planetary Radius',
    body: [
      'Reprehenderit mollit magna labore mollit. Dolore eu excepteur id deserunt laboris proident esse sunt. Cupidatat magna cillum ea incididunt ea amet ex adipisicing voluptate pariatur fugiat do non.',
      'Dolore eu ex officia culpa qui ex veniam sint nostrud velit cillum irure proident.',
      'Enim officia esse exercitation ad pariatur nulla sit est et occaecat dolore. Aliquip culpa commodo cillum dolor mollit culpa ex cillum veniam ullamco minim sit. Culpa aliqua ullamco irure dolor cupidatat.'
    ]
  },
  {
    path: '/explore/6',
    flagProperty: FLAG_PROPERTIES.planetaryNeighbours,
    title: 'Planetary Neighbours',
    body: [
      'Reprehenderit sunt aliquip occaecat esse non velit qui eiusmod dolore labore voluptate ea anim.',
      'Labore sit ullamco amet amet. Minim fugiat cillum elit amet cillum. Qui minim ad duis non laborum. Nulla enim mollit commodo qui aliqua sint aliqua cillum incididunt elit laboris. Consectetur ut quis amet est.',
      'Sint cupidatat cupidatat est proident. Ad irure mollit excepteur exercitation Lorem veniam consectetur. Voluptate velit cupidatat non anim sit consectetur nisi consequat nostrud labore.'
    ]
  },
  {
    path: '/explore/7',
    flagProperty: FLAG_PROPERTIES.constellation,
    title: 'Constellation',
    body: [
      'Culpa laboris in reprehenderit enim pariatur quis adipisicing. Aliquip elit pariatur in commodo veniam nisi nulla excepteur enim deserunt excepteur mollit occaecat. Culpa veniam incididunt laboris do ad amet nulla. Sit qui esse nulla incididunt sunt nisi minim dolor nisi in. Ipsum cillum exercitation ipsum ad nisi laborum tempor exercitation aliqua amet amet consequat id. Cupidatat esse consectetur elit in culpa. Cupidatat quis nostrud sunt et veniam et anim reprehenderit Lorem pariatur enim deserunt Lorem enim.',
      'Proident voluptate incididunt aliquip excepteur in reprehenderit eiusmod adipisicing cillum aute eiusmod anim. Quis commodo ex dolor veniam qui consectetur sint nostrud tempor irure ad eiusmod tempor aute. Est adipisicing quis culpa deserunt veniam dolor nisi cupidatat esse deserunt. Adipisicing incididunt aliqua non proident duis culpa ullamco.',
      'Aute ea exercitation cillum qui et sint in sunt pariatur non quis et.'
    ]
  }
];
