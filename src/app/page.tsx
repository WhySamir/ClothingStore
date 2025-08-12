import FashionCategories from "./components/FashionCategories";
import FashionPromoComponent from "./components/FashionPromoComponent";
import LandingPage from "./components/Landingpage";
import InstagramTestimonials from "./components/Testimonal";
import MightLike from "./components/Youmightlike";

export default function Home() {
  return (
    <>
      <LandingPage />
      <FashionCategories />
      <MightLike />
      <FashionPromoComponent />
      <InstagramTestimonials />s
    </>
  );
}
