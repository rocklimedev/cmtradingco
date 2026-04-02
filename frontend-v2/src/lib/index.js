export const LOGO_RED = "/assets/logos/red_logo.png";
export const LOGO_WHITE = "/assets/logos/white_logo.png";
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.cmtradingco.com/api"
    : "http://localhost:4000/api";
// export const API_URL = "http://localhost:4000/api";

export const WHATSAPP_NUMBER = "919911080605";
export const PHONE_NUMBER = "+91 99110 80605";
export const PHONE_RAW = "919911080605";
export const EMAIL = "info@chhabramarble.com";
export const ADDRESS = " 487/65, National Market, Peera Garhi, Delhi, 110087";
export const BUSINESS_HOURS = "Mon - Sat: 10:00 AM - 8:00 PM | Sun: Closed";

export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/chhabramarble/",
    icon: "Instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/chhabra-marble-trading-co",
    icon: "Linkedin",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/chhabramarble",
    icon: "Facebook",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@chhabramarble/featured",
    icon: "Youtube",
  },
  {
    name: "Google Maps",
    url: "https://maps.app.goo.gl/ZNgEoLq9BDwrUi6u9",
    icon: "MapPin",
  },
];

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Catalogue", path: "/catalogue" },
  { name: "Contact", path: "/contact" },
];

export const categories = [
  {
    id: "tiles-stone",
    name: "Tiles & Stone",
    image:
      "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=1920&q=80",
    subcategories: [
      {
        name: "Indoor Tiles",
        image:
          "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=800&q=80",
      },
      {
        name: "Outdoor Tiles",
        image:
          "https://images.unsplash.com/photo-1718073869252-3b78770dc972?w=800&q=80",
      },
      {
        name: "Bathroom Tiles",
        image:
          "https://images.unsplash.com/photo-1714648775477-a15cc5aed21f?w=800&q=80",
      },
      {
        name: "Kitchen Tiles",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
      {
        name: "Floor Tiles",
        image:
          "https://images.unsplash.com/photo-1706629503586-2731f65587ae?w=800&q=80",
      },
      {
        name: "Mosaic",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
      {
        name: "Facade Tiles",
        image:
          "https://images.unsplash.com/photo-1518892974594-4adbf359419c?w=800&q=80",
      },
      {
        name: "Luxury Tiles",
        image:
          "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=800&q=80",
      },
    ],
  },
  {
    id: "basins",
    name: "Basins",
    image:
      "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=1920&q=80",
    subcategories: [
      {
        name: "Wall-Hung Basins",
        image:
          "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=800&q=80",
      },
      {
        name: "Counter-Top Basins",
        image:
          "https://images.unsplash.com/photo-1687951276836-06efbfda608b?w=800&q=80",
      },
      {
        name: "Pedestal Basins",
        image:
          "https://images.unsplash.com/photo-1701251786408-d0320ecaad8d?w=800&q=80",
      },
      {
        name: "Under-Counter Basins",
        image:
          "https://images.unsplash.com/photo-1687951276836-06efbfda608b?w=800&q=80",
      },
      {
        name: "Designer Basins",
        image:
          "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=800&q=80",
      },
    ],
  },
  {
    id: "showers-faucets",
    name: "Showers & Faucets",
    image:
      "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=1920&q=80",
    subcategories: [
      {
        name: "Rain Showers",
        image:
          "https://images.unsplash.com/photo-1766371900913-1f9fee835af7?w=800&q=80",
      },
      {
        name: "Basin Mixers",
        image:
          "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=800&q=80",
      },
      {
        name: "Kitchen Faucets",
        image:
          "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80",
      },
      {
        name: "Shower Panels",
        image:
          "https://images.unsplash.com/photo-1766371900913-1f9fee835af7?w=800&q=80",
      },
      {
        name: "Diverters",
        image:
          "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=800&q=80",
      },
    ],
  },
  {
    id: "sanitary-ware",
    name: "Sanitary Ware",
    image:
      "https://images.unsplash.com/photo-1706670368974-af427a98e816?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1706670368974-af427a98e816?w=1920&q=80",
    subcategories: [
      {
        name: "Western Toilets",
        image:
          "https://images.unsplash.com/photo-1706670368974-af427a98e816?w=800&q=80",
      },
      {
        name: "Wall-Hung Toilets",
        image:
          "https://images.unsplash.com/photo-1706670368974-af427a98e816?w=800&q=80",
      },
      {
        name: "Urinals",
        image:
          "https://images.unsplash.com/photo-1651544861864-5a91fe5353cc?w=800&q=80",
      },
      {
        name: "Bidets",
        image:
          "https://images.unsplash.com/photo-1701251786408-d0320ecaad8d?w=800&q=80",
      },
      {
        name: "Cisterns",
        image:
          "https://images.unsplash.com/photo-1706670368974-af427a98e816?w=800&q=80",
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness",
    image:
      "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=1920&q=80",
    subcategories: [
      {
        name: "Bathtubs",
        image:
          "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=800&q=80",
      },
      {
        name: "Jacuzzis",
        image:
          "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=800&q=80",
      },
      {
        name: "Steam Cabins",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
      {
        name: "Sauna",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
      {
        name: "Shower Enclosures",
        image:
          "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=800&q=80",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=1920&q=80",
    subcategories: [
      {
        name: "Towel Rails",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
      {
        name: "Soap Dispensers",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
      {
        name: "Mirrors",
        image:
          "https://images.unsplash.com/photo-1701251786408-d0320ecaad8d?w=800&q=80",
      },
      {
        name: "Shelves",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
      {
        name: "Hooks",
        image:
          "https://images.unsplash.com/photo-1648383336009-27812dcbf260?w=800&q=80",
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    image:
      "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=1920&q=80",
    subcategories: [
      {
        name: "CPVC Pipes",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
      {
        name: "PVC Fittings",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
      {
        name: "Valves",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
      {
        name: "Connectors",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
      {
        name: "Water Heaters",
        image:
          "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?w=800&q=80",
      },
    ],
  },
  {
    id: "chemicals-adhesives",
    name: "Chemicals & Adhesives",
    image:
      "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
    banner:
      "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=1920&q=80",
    subcategories: [
      {
        name: "Tile Adhesives",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
      {
        name: "Grouts",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
      {
        name: "Waterproofing",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
      {
        name: "Sealants",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
      {
        name: "Primers",
        image:
          "https://images.unsplash.com/photo-1765556556784-7656ee0a1bd8?w=800&q=80",
      },
    ],
  },
];

export const featuredProducts = [
  {
    id: "fp1",
    name: "Essence Wall-Mounted Basin Mixer",
    brand: "Grohe",
    image:
      "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=600&q=80",
  },
  {
    id: "fp2",
    name: "Calacatta Gold Porcelain Slab",
    brand: "Sunhearrt Ceramik",
    image:
      "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=600&q=80",
  },
  {
    id: "fp3",
    name: "Modern Wash Basin",
    brand: "American Standard",
    image:
      "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=600&q=80",
  },
  {
    id: "fp4",
    name: "Italian Marble Surface",
    brand: "Colston",
    image:
      "https://images.unsplash.com/photo-1718073869252-3b78770dc972?w=600&q=80",
  },
  {
    id: "fp5",
    name: "Premium Rain Shower",
    brand: "Grohe",
    image:
      "https://images.unsplash.com/photo-1766371900913-1f9fee835af7?w=600&q=80",
  },
  {
    id: "fp6",
    name: "Freestanding Luxury Bathtub",
    brand: "Colston",
    image:
      "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=600&q=80",
  },
];

export const partners = [
  { id: "grohe", name: "Grohe", logo: "/assets/brand_logos/grohe.png" },
  {
    id: "american-standard",
    name: "American Standard",
    logo: "/assets/brand_logos/american_standard.png",
  },
  { id: "colston", name: "Colston", logo: "/assets/brand_logos/colston.png" },
  { id: "nexion", name: "Nexion", logo: "/assets/brand_logos/nexion.png" },
];

export const catalogues = [
  {
    id: "cat-grohe",
    brand: "Grohe Bau",
    image:
      "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/grohe-bau.pdf",
  },
  {
    id: "cat-grohe-premium",
    brand: "Grohe Premium",
    image:
      "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/grohe-premium.pdf",
  },
  {
    id: "cat-american-standard",
    brand: "American Standard",
    image:
      "https://images.unsplash.com/photo-1595515770294-38a01e2ac4dd?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/american-standard.pdf",
  },
  {
    id: "cat-colston-project",
    brand: "Colston Project",
    image:
      "https://images.unsplash.com/photo-1718073869252-3b78770dc972?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/colston-project.pdf",
  },
  {
    id: "cat-colston-water-innovation",
    brand: "Colston Water Innovation",
    image:
      "https://images.unsplash.com/photo-1718073869252-3b78770dc972?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/colston-water-innovation.pdf",
  },
  {
    id: "cat-colston-wellness",
    brand: "Colston Wellness",
    image:
      "https://images.unsplash.com/photo-1718073869252-3b78770dc972?w=600&q=80",
    downloadUrl: "http://static.cmtradingco.com/catalogues/colston-wellness.pdf",
  },
];

export const whyChooseUs = [
  {
    title: "Wide Product Range",
    description:
      "From tiles to sanitaryware, fittings to stone \u2014 everything under one roof.",
    icon: "Grid3X3",
  },
  {
    title: "Trusted Global Partners",
    description:
      "We partner with world-renowned brands to bring you the finest materials.",
    icon: "Shield",
  },
  {
    title: "Expert Consultation",
    description:
      "Our team of experts helps you choose the perfect materials for your project.",
    icon: "Users",
  },
  {
    title: "Premium Showroom",
    description:
      "Walk through our curated showroom to experience materials firsthand.",
    icon: "Star",
  },
];

export const heroImages = {
  home: "https://images.unsplash.com/photo-1701251786408-d0320ecaad8d?w=1920&q=80",
  about:
    "https://images.unsplash.com/photo-1518892974594-4adbf359419c?w=1920&q=80",
  products:
    "https://images.unsplash.com/photo-1714648775477-a15cc5aed21f?w=1920&q=80",
  catalogue:
    "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=1920&q=80",
  contact:
    "https://images.unsplash.com/photo-1766371900913-1f9fee835af7?w=1920&q=80",
};
export const bannerImages = [
  "../../assets/banner/banner_1.jpeg",
  "../../assets/banner/banner_2.jpeg",
  "../../assets/banner/banner_3.jpeg",
  "../../assets/banner/banner_4.jpeg",
];
export const showcaseImages = {
  parallax1:
    "https://images.unsplash.com/photo-1706629503586-2731f65587ae?w=1920&q=80",
  parallax2:
    "https://images.unsplash.com/photo-1728486885790-1454260d9246?w=1920&q=80",
  promo:
    "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=1920&q=80",
  aboutOffer:
    "https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=1920&q=80",
};
