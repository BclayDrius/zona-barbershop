import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingSteps from "@/components/BookingSteps";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import Hours from "@/components/Hours";
import FinalCTA from "@/components/FinalCTA";
import ScissorDivider from "@/components/ScissorDivider";
import FloatingTools from "@/components/FloatingTools";
import ParallaxBand from "@/components/ParallaxBand";
import { images } from "@/content/site";

export default function HomePage() {
  return (
    <main className="relative">
      <FloatingTools />
      <Hero />
      <Services />
      <BookingSteps />
      <ScissorDivider />
      <Gallery />
      <ParallaxBand src={images.band} />
      <About />
      <ScissorDivider />
      <Pillars />
      <Hours />
      <FinalCTA />
    </main>
  );
}
