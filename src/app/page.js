import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import FeaturedProducts from "@/components/FeaturedProducts";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Events from "@/components/Events";
import WhyChooseUs from "@/components/WhyChooseUs";
import CoffeeJourney from "@/components/CoffeeJourney";
import Locations from "@/components/Locations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import Blog from "@/components/Blog";
import Team from "@/components/Team";
import CoffeeQuiz from "@/components/CoffeeQuiz";
import LoyaltyRewards from "@/components/LoyaltyRewards";
import GiftCard from "@/components/GiftCard";
import Cart from "@/components/Cart";
import { CartProvider } from "@/components/CartContext";
import CheckoutWrapper from "@/components/CheckoutWrapper";

export default function Home() {
  return (
    <CartProvider>
      <main>
        <Navbar />
        <Cart />
        <Hero />
        <About />
        <WhyChooseUs />
        <CoffeeQuiz />
        <Menu />
        <FeaturedProducts />
        <CoffeeJourney />
        <Blog />
        <Gallery />
        <Team />
        <Testimonials />
        <Events />
        <Reservation />
        <LoyaltyRewards />
        <GiftCard />
        <Locations />
        <FAQ />
        <Contact />
        <Footer />
        <AIChat />
        <CheckoutWrapper />
      </main>
    </CartProvider>
  );
}
