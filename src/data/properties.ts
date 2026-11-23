export interface PropertyItem {
  id: string;
  title: string;
  city: string;
  state: string;
  type: 'Modern Villa' | 'Stone Pavilion' | 'Timber Courtyard' | 'Glass Residence';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: string;
  price: number;
  priceFormatted: string;
  yearBuilt: number;
  image: string;
  summary: string;
  highlights: string[];
  materials: string[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface PricingTier {
  id: string;
  name: string;
  rate: string;
  unit: string;
  summary: string;
  featured?: boolean;
  features: string[];
}

export type LanguageCode = 'EN' | 'ES' | 'FR' | 'DE';

export interface LocalizedStrings {
  nav: {
    home: string;
    about: string;
    projects: string;
    services: string;
    pricing: string;
  };
  hero: {
    line1: string;
    line2: string;
    searchPlaceholder: string;
    searchCta: string;
    stats: {
      projects: string;
      experience: string;
      clients: string;
    };
    findProperties: string;
    cityLabel: string;
    propertiesLabel: string;
    bedroomLabel: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, LocalizedStrings> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About Us',
      projects: 'Projects',
      services: 'Services',
      pricing: 'Pricing',
    },
    hero: {
      line1: 'Build Your',
      line2: 'Dream Home',
      searchPlaceholder: 'with Modern Design',
      searchCta: 'Search Now',
      stats: {
        projects: 'Completed Projects',
        experience: 'Years of Experience',
        clients: 'Happy Clients',
      },
      findProperties: 'Find Properties',
      cityLabel: 'City',
      propertiesLabel: 'Properties',
      bedroomLabel: 'Bedroom',
    },
  },
  ES: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      projects: 'Proyectos',
      services: 'Servicios',
      pricing: 'Precios',
    },
    hero: {
      line1: 'Construye Tu',
      line2: 'Hogar Soñado',
      searchPlaceholder: 'con Diseño Moderno',
      searchCta: 'Buscar Ahora',
      stats: {
        projects: 'Proyectos Completados',
        experience: 'Años de Experiencia',
        clients: 'Clientes Felices',
      },
      findProperties: 'Buscar Propiedades',
      cityLabel: 'Ciudad',
      propertiesLabel: 'Propiedades',
      bedroomLabel: 'Dormitorios',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      projects: 'Projets',
      services: 'Services',
      pricing: 'Tarifs',
    },
    hero: {
      line1: 'Bâtissez Votre',
      line2: 'Maison de Rêve',
      searchPlaceholder: 'au Design Moderne',
      searchCta: 'Rechercher',
      stats: {
        projects: 'Projets Réalisés',
        experience: 'Ans d’Expérience',
        clients: 'Clients Satisfaits',
      },
      findProperties: 'Trouver un Bien',
      cityLabel: 'Ville',
      propertiesLabel: 'Propriétés',
      bedroomLabel: 'Chambres',
    },
  },
  DE: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      projects: 'Projekte',
      services: 'Leistungen',
      pricing: 'Preise',
    },
    hero: {
      line1: 'Bauen Sie Ihr',
      line2: 'Traumhaus',
      searchPlaceholder: 'mit Modernem Design',
      searchCta: 'Jetzt Suchen',
      stats: {
        projects: 'Projekte Abgeschlossen',
        experience: 'Jahre Erfahrung',
        clients: 'Zufriedene Kunden',
      },
      findProperties: 'Immobilien Finden',
      cityLabel: 'Stadt',
      propertiesLabel: 'Immobilien',
      bedroomLabel: 'Schlafzimmer',
    },
  },
};

export const HERO_BACKDROP_IMAGE = '/src/assets/images/hero_modern_house_1795179050387.jpg';

export const PROPERTIES: PropertyItem[] = [
  {
    id: 'meadow-stone-pavilion',
    title: 'Meadow Stone Pavilion',
    city: 'Aspen',
    state: 'CO',
    type: 'Stone Pavilion',
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 4280,
    lotSize: '1.4 Acres',
    price: 4850000,
    priceFormatted: '$4,850,000',
    yearBuilt: 2026,
    image: '/src/assets/images/hero_modern_house_1795179050387.jpg',
    summary:
      'Single-level cantilevered pavilion pairing dry-stacked grey limestone with vertical walnut timber, radiant heated floors, and a warm chef’s kitchen opening directly onto manicured lawns.',
    highlights: [
      '14-foot floor-to-ceiling low-iron acoustic glazing',
      'Heated cedar-lined two-car architectural garage',
      'Wood-burning monolith limestone hearth and chimney',
      'Automated circadian warm-dimming interior illumination',
    ],
    materials: ['Honed Grey Limestone', 'Thermally Modified Walnut', 'Blackened Bronze Framing'],
  },
  {
    id: 'aspen-terrace-villa',
    title: 'Aspen Terrace Villa',
    city: 'Aspen',
    state: 'CO',
    type: 'Modern Villa',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3960,
    lotSize: '1.1 Acres',
    price: 4290000,
    priceFormatted: '$4,290,000',
    yearBuilt: 2025,
    image: '/src/assets/images/property_aspen_pavilion_1795179046799.jpg',
    summary:
      'Double-tiered flat roofline with clerestory ribbons that flood the central dining pavilion with soft daylight, anchored by floating stone entry steps and native ornamental grasses.',
    highlights: [
      'Clerestory transom glass spanning the main living gallery',
      'Floating travertine and cedar garden approach steps',
      'Private primary wing with soaking tub and garden courtyard',
      'Geothermal climate regulation with zero visible vents',
    ],
    materials: ['Split-Face Fieldstone', 'Vertical Dark Cedar', 'Brushed White Oak'],
  },
  {
    id: 'cedar-courtyard-estate',
    title: 'Cedar Courtyard Estate',
    city: 'Malibu',
    state: 'CA',
    type: 'Timber Courtyard',
    bedrooms: 5,
    bathrooms: 5.5,
    sqft: 5420,
    lotSize: '1.8 Acres',
    price: 6950000,
    priceFormatted: '$6,950,000',
    yearBuilt: 2026,
    image: '/src/assets/images/property_cedar_courtyard_1795179044605.jpg',
    summary:
      'Two-story courtyard sanctuary arranged around a dark-slate reflecting lap pool, uniting indoor living lounges with shaded timber soffits and coastal greenery.',
    highlights: [
      '48-foot mirror-surface basalt reflecting lap pool',
      'Upper-level primary terrace wrapped in frameless glass',
      'Disappearing corner pocket doors across living and dining',
      'Climate-controlled 600-bottle oak wine vault',
    ],
    materials: ['Basalt Pool Stone', 'Weathered Western Red Cedar', 'Natural Limestone Plaster'],
  },
  {
    id: 'ridge-glass-sanctuary',
    title: 'Ridge Glass Sanctuary',
    city: 'Lake Tahoe',
    state: 'NV',
    type: 'Glass Residence',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3450,
    lotSize: '2.2 Acres',
    price: 3890000,
    priceFormatted: '$3,890,000',
    yearBuilt: 2025,
    image: '/src/assets/images/property_ridge_glass_1795179042845.jpg',
    summary:
      'Hillside glass-and-stone residence overlooking misty pine ridges, designed with sweeping dark timber eaves and a dramatic double-sided stone fireplace anchor.',
    highlights: [
      '270-degree unobstructed ridge views through corner glass',
      'Sculpted Japanese maple and basalt stepping-stone garden',
      'Custom rift-cut oak kitchen island with monolithic quartzite',
      'Integrated solar roof array with dual battery storage',
    ],
    materials: ['Sierra Granite Masonry', 'Charred Timber Soffits', 'Architectural Steel'],
  },
  {
    id: 'barton-creek-retreat',
    title: 'Barton Creek Modern',
    city: 'Austin',
    state: 'TX',
    type: 'Modern Villa',
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 4120,
    lotSize: '0.95 Acres',
    price: 3450000,
    priceFormatted: '$3,450,000',
    yearBuilt: 2026,
    image: '/src/assets/images/property_aspen_pavilion_1795179046799.jpg',
    summary:
      'Low-slung limestone and walnut residence positioned beneath mature live oaks, engineered for seamless indoor-outdoor entertaining and passive cooling.',
    highlights: [
      'Deep 8-foot cantilevered eaves for natural solar shading',
      'Outdoor summer kitchen with custom stone hearth',
      'Dedicated sound-insulated architectural home studio',
      'Rainwater harvesting system irrigating native grounds',
    ],
    materials: ['Texas Lueders Limestone', 'Oiled American Walnut', 'Architectural Concrete'],
  },
  {
    id: 'desert-pines-courtyard',
    title: 'Sonoran Timber House',
    city: 'Scottsdale',
    state: 'AZ',
    type: 'Timber Courtyard',
    bedrooms: 5,
    bathrooms: 5,
    sqft: 5100,
    lotSize: '1.6 Acres',
    price: 5320000,
    priceFormatted: '$5,320,000',
    yearBuilt: 2025,
    image: '/src/assets/images/property_cedar_courtyard_1795179044605.jpg',
    summary:
      'Architectural courtyard villa combining raw stone massing, shaded dark-wood verandas, and a tranquil central water feature calibrated for desert twilight living.',
    highlights: [
      'Central micro-climate courtyard with shaded lap pool',
      'Detached one-bedroom guest casita with private entry',
      'Triple-glazed solar-control architectural glass walls',
      'Custom brass hardware and lime-washed interior suites',
    ],
    materials: ['Desert Quartzite', 'Dark Stained Douglas Fir', 'Honed Travertine'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01.',
    title: 'Site Strategy & Architectural Design',
    description:
      'Every Goldhouse residence begins with solar orientation, topography mapping, and bespoke architectural modeling that frames natural views while preserving privacy.',
    deliverable: '3D Spatial Blueprints & Permit Drawings',
  },
  {
    number: '02.',
    title: 'Turnkey Structural Construction',
    description:
      'Dedicated in-house master builders oversee steel framing, dry-stacked masonry, cantilevered timber roofs, and high-efficiency glazing from excavation through handover.',
    deliverable: 'Fixed-Schedule Construction Management',
  },
  {
    number: '03.',
    title: 'Warm Minimalist Interior Curation',
    description:
      'Bespoke millwork, natural limestone surfaces, warm architectural lighting, and custom kitchen cabinetry tailored for tactile comfort and enduring calm.',
    deliverable: 'Material Boards & Bespoke Millwork',
  },
  {
    number: '04.',
    title: 'Landscape & Courtyard Integration',
    description:
      'Native plantings, sculptural ornamental trees, stone pathways, and reflecting pools designed simultaneously with the house so architecture and nature read as one.',
    deliverable: 'Master Landscape & Lighting Plan',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'design-blueprint',
    name: 'Architectural Blueprint',
    rate: '$48,000',
    unit: 'Fixed design fee',
    summary: 'Complete architectural concept, engineering coordination, and permit-ready construction documentation.',
    features: [
      'Site topography & sun-path orientation study',
      'Full 3D photorealistic exterior & interior renders',
      'Permit-ready architectural & structural drawings',
      'Curated stone, timber, and glazing specification book',
    ],
  },
  {
    id: 'turnkey-residence',
    name: 'Turnkey Modern Home',
    rate: '$680',
    unit: 'per sq ft · all-inclusive',
    summary: 'End-to-end design and construction of a signature single-story or courtyard Goldhouse residence.',
    featured: true,
    features: [
      'Full architectural design & municipal permitting',
      'Natural stone masonry & cantilevered timber roofing',
      'Floor-to-ceiling thermal glazing & warm interior millwork',
      'Landscape architecture & 10-year structural warranty',
    ],
  },
  {
    id: 'bespoke-estate',
    name: 'Signature Private Estate',
    rate: 'Custom',
    unit: 'Estates 5,000+ sq ft',
    summary: 'White-glove land acquisition, custom architectural estate engineering, guest pavilions, and reflecting pools.',
    features: [
      'Off-market land scouting & feasibility diligence',
      'Dedicated principal architect & on-site superintendent',
      'Custom reflecting pools, wine vaults & guest casitas',
      'Full furniture curation & smart-home commissioning',
    ],
  },
];
