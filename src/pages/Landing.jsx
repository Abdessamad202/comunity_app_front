import CTASection from "../components/CTASection";
import CommunityGrid from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import Stats from "../components/Stats";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeroSection />
      <CommunityGrid />
      <Stats />
      <CTASection />
    </div>
  )
}

export default Landing;