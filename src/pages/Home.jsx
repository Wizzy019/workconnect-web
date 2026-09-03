import BenefitCard from "../components/home/BenefitCard";
import FinalCTA from "../components/home/FinalCTA";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Navbar from "../components/layout/Navbar";
import ProductShowcase from "../components/home/ProductShowcase";
import WhyWorkConnect from "../components/home/WhyWorkConnect";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <ProductShowcase />
      <WhyWorkConnect />
      <FinalCTA />
    </div>
  );
};

export default Home;
