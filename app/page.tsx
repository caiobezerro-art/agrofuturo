import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { TechnologySection } from "@/components/technology-section"
import { SustainabilitySection } from "@/components/sustainability-section"
import { SimulatorSection } from "@/components/simulator-section"
import { DashboardSection } from "@/components/dashboard-section"
import { MapSection } from "@/components/map-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { GamificationSection } from "@/components/gamification-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <TechnologySection />
      <SustainabilitySection />
      <SimulatorSection />
      <DashboardSection />
      <MapSection />
      <ChatbotSection />
      <GamificationSection />
      <Footer />
    </main>
  )
}
