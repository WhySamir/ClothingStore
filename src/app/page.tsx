import FashionCategories from "./components/FashionCategories";
import FashionPromoComponent from "./components/FashionPromoComponent";
import LandingPage from "./components/Landingpage";

export default function Home() {
  return (
    <>
      <LandingPage />

      <FashionCategories />
      <FashionPromoComponent />
    </>
  );
}
