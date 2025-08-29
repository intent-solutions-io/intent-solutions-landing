import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Platforms from "@/components/Platforms";
import Market from "@/components/Market";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Platforms />
      <Market />
      <Founder />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
