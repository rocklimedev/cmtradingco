import ar from "../img/brand_logos/american_standard.png";
import jk from "../img/brand_logos/jktylo.png";
import grohe from "../img/brand_logos/grohe.png";
import jkcemenet from "../img/brand_logos/jk_cement.png";
import colston from "../img/brand_logos/colston-logo_black.png";
import nexion from "../img/brand_logos/nexion.png";
import gr1 from "../pdf/Grohe/GROHE_Eurocube_Joy_en_CY.pdf";
import gr2 from "../pdf/Grohe/GROHE_Eurostyle_en_IN.pdf";
import gr3 from "../pdf/Grohe/GROHE_Flushplates-Brochure_en_MASTER.pdf";
import gr4 from "../pdf/Grohe/GROHE_Kitchen-Brochure_en_SG.pdf";
import gr5 from "../pdf/Grohe/GROHE_Magazine_4_EN.pdf";
import gr6 from "../pdf/Grohe/GROHE_Rapido_Smartbox.pdf";
import gr7 from "../pdf/Grohe/SmartControlFlyer_EN.pdf";
import jktylo1 from "../pdf/JK/JKTylo-606-TDS-Mar2024-UPLOAD.pdf";
import colston1 from "../pdf/Colston/ceramics-2023.pdf";
import colston2 from "../pdf/Colston/exclusive-bathrooms-2024.pdf";
import nexion1 from "../pdf/Nexion/NEXION-General-catalogue-1.pdf";
import am1 from "../pdf/American Standard/Acacia-E-Brochure.pdf";
import am2 from "../pdf/American Standard/Acacia-SupaSleek-Brochure.pdf";
import am3 from "../pdf/American Standard/AS-Product-Catalogue-2020.pdf";
import am4 from "../pdf/American Standard/EasySET-Brochure_LR.pdf";
import am6 from "../pdf/American Standard/Signature-Collection-Brochure.pdf";
import colston3 from "../pdf/Colston/wellness-catalogue-2024.pdf";
import am5 from "../pdf/American Standard/G19183_City_Collection-Brochure_2018_Updated_Low-Res.pdf";
const brands = [
  {
    name: "American Standard",
    link: "/product/brand/american-standard",
    logoSrc: ar,
    subtitle: "Innovative sanitary ware solutions for modern bathrooms",
    content:
      "American Standard offers a wide range of high-quality sanitary ware, including toilets, faucets, and showers, designed to combine style, functionality, and durability. With a legacy of innovation, their products are trusted by homeowners and professionals worldwide.",
    pdfs: [
      {
        pdfId: "pdf-american-1",
        title: "Acacia E Brochure",
        description: "Product brochure for American Standard Acacia E series",
        url: am1,
      },
      {
        pdfId: "pdf-american-2",
        title: "Acacia SupaSleek Brochure",
        description:
          "Product brochure for American Standard Acacia SupaSleek series",
        url: am2,
      },
      {
        pdfId: "pdf-american-3",
        title: "Product Catalogue 2020",
        description:
          "Comprehensive product catalogue for American Standard 2020",
        url: am3,
      },
      {
        pdfId: "pdf-american-4",
        title: "EasySET Brochure",
        description: "Brochure for American Standard EasySET products",
        url: am4,
      },
      {
        pdfId: "pdf-american-5",
        title: "City Collection Brochure 2018",
        description: "Brochure for American Standard City Collection 2018",
        url: am5,
      },
      {
        pdfId: "pdf-american-6",
        title: "Signature Collection Brochure",
        description: "Brochure for American Standard Signature Collection",
        url: am6,
      },
    ],
  },
  {
    name: "Grohe",
    link: "/product/brand/grohe",
    logoSrc: grohe,
    subtitle: "Premium bathroom and kitchen fittings",
    content:
      "Grohe is renowned for its cutting-edge bathroom and kitchen solutions, offering faucets, showers, and sanitary systems that blend German engineering with elegant design. Their products are built for performance and sustainability.",
    pdfs: [
      {
        pdfId: "pdf-grohe-1",
        title: "Eurocube Joy Brochure",
        description: "Product brochure for Grohe Eurocube Joy series",
        url: gr1,
      },
      {
        pdfId: "pdf-grohe-2",
        title: "Eurostyle Brochure",
        description: "Product brochure for Grohe Eurostyle series",
        url: gr2,
      },
      {
        pdfId: "pdf-grohe-3",
        title: "Flushplates Brochure",
        description: "Brochure for Grohe Flushplates",
        url: gr3,
      },
      {
        pdfId: "pdf-grohe-4",
        title: "Kitchen Brochure",
        description: "Brochure for Grohe Kitchen products",
        url: gr4,
      },
      {
        pdfId: "pdf-grohe-5",
        title: "Magazine 4",
        description: "Grohe Magazine issue 4",
        url: gr5,
      },
      {
        pdfId: "pdf-grohe-6",
        title: "Rapido Smartbox Brochure",
        description: "Brochure for Grohe Rapido Smartbox",
        url: gr6,
      },
      {
        pdfId: "pdf-grohe-7",
        title: "SmartControl Flyer",
        description: "Flyer for Grohe SmartControl products",
        url: gr7,
      },
    ],
  },
  {
    name: "JK Cement",
    link: "/product/brand/jk-cement",
    logoSrc: jkcemenet,
    subtitle: "Trusted cement solutions for construction",
    content:
      "JK Cement is a leading manufacturer of high-quality cement products, widely used in residential, commercial, and infrastructure projects. Known for strength and reliability, JK Cement is a preferred choice for builders and architects.",
    pdfs: [],
  },
  {
    name: "JK Tylo",
    link: "/product/brand/jk-tylo",
    logoSrc: jk,
    subtitle: "High-performance tile adhesives",
    content:
      "JK Tylo offers a range of tile adhesives and construction chemicals designed for durability and ease of use. Their products ensure strong bonding for tiles and stones in various applications.",
    pdfs: [
      {
        pdfId: "pdf-jktylo-1",
        title: "JK Tylo 606 TDS",
        description: "Technical Data Sheet for JK Tylo 606, March 2024",
        url: jktylo1,
      },
    ],
  },
  {
    name: "Nexion",
    link: "/product/brand/nexion",
    logoSrc: nexion,
    subtitle: "Premium ceramic and porcelain tiles",
    content:
      "Nexion specializes in high-quality ceramic and porcelain tiles, offering a variety of designs and finishes for residential and commercial spaces. Their tiles are known for elegance and durability.",
    pdfs: [
      {
        pdfId: "pdf-nexion-1",
        title: "Nexion General Catalogue",
        description: "General product catalogue for Nexion",
        url: nexion1,
      },
    ],
  },
  {
    name: "Colston",
    link: "/product/brand/colston",
    logoSrc: colston,
    subtitle: "Luxury bathroom solutions",
    content:
      "Colston provides premium bathroom products, including ceramics, bathtubs, and wellness solutions, designed to enhance comfort and aesthetics. Their catalogues showcase innovative designs for modern bathrooms.",
    pdfs: [
      {
        pdfId: "pdf-colston-1",
        title: "Ceramics 2023",
        description: "Product catalogue for Colston ceramics 2023",
        url: colston1,
      },
      {
        pdfId: "pdf-colston-2",
        title: "Exclusive Bathrooms 2024",
        description: "Catalogue for Colston exclusive bathrooms 2024",
        url: colston2,
      },
      {
        pdfId: "pdf-colston-3",
        title: "Wellness Catalogue 2024",
        description: "Wellness product catalogue for Colston 2024",
        url: colston3,
      },
    ],
  },
];

export default brands;
