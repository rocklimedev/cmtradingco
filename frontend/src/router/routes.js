import NotFound from "../components/NotFound";
import HomeWrapper from "../components/Home/HomeWrapper";
import ContactWrapper from "../components/Contact/ContactWrapper";
import AboutWrapper from "../components/About/AboutWrapper";
import ProjectWrapper from "../components/Projects/ProjectWrapper";
import ProductWrapper from "../components/Products/ProductWrapper";
import CategoryProducts from "../components/Products/CategoriesProducts";
import ProductDetails from "../components/Products/ProductDetails";

const masterRoutes = [
  {
    path: "/",
    name: "Home",
    element: <HomeWrapper />,
  },
  {
    path: "/404",
    name: "Not Found",
    element: <NotFound />,
  },
  {
    path: "/contact",
    name: "Contact",
    element: <ContactWrapper />,
  },
  {
    path: "/about",
    name: "About",
    element: <AboutWrapper />,
  },
  {
    path: "/project",
    name: "Project",
    element: <ProjectWrapper />,
  },
  {
    path: "/brands",
    name: "Brands",
    element: <ProductWrapper />,
  },
  {
    path: "/store/cat/:categoryId",
    name: "Category Products",
    element: <CategoryProducts />,
  },
  {
    path: "/product/brand/:brandName",
    name: "Brand Catalogues",
    element: <ProductDetails />,
  },
];

export default masterRoutes;
