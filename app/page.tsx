import Image from 'next/image';
import Link from 'next/link';
import { AnimatedCollaborators } from '../components/AnimatedCollaborators';
import { TextReveal } from '../components/TextReveal';
import { HeroParallax } from '../components/ui/hero-parallax';
import { SparklesCore } from '../components/ui/sparkles';
import { TracingBeam } from '../components/ui/tracing-beam';
import { ResearchCard } from '../components/ResearchCard';
import ScrollDownArrow from '../components/ScrollDownArrow';

export default function Home() {
  return (
    <>
      <main className="relative overflow-hidden">
        {/* Hero Section with Parallax Effect */}
        <section className="relative h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/gallery/healthy-coral-seascape-outer-gbr-rummer.jpg"
              alt="Healthy coral reef at the Great Barrier Reef"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>
          </div>
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                RummerLab
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Pioneering research on marine life adaptation in changing environments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 relative z-30">
              <Link 
                href="/research" 
                className="px-8 py-3 bg-blue-600/80 hover:bg-blue-600 text-white hover:text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/30 relative z-30"
                aria-label="View our research areas and projects"
              >
                Our Research
              </Link>
              <Link 
                href="/join" 
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white hover:text-white border border-white/30 font-medium rounded-lg transition-all duration-200 relative z-30"
                aria-label="Learn about joining our team"
              >
                Join Our Team
              </Link>
            </div>
          </div>
          
          <ScrollDownArrow />
        </section>
        
        {/* Mission Statement with Text Reveal */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto mb-10"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                RummerLab, led by Dr. Jodie Rummer, focuses on researching the physiological
                processes and adaptations of aquatic animals in response to environmental
                stressors. Our research aims to understand how these organisms cope with
                changing conditions and contribute to the conservation of aquatic ecosystems.
              </p>
            </div>
            
            <TextReveal />
          </div>
        </section>
        
        {/* Research Areas with Tracing Beam */}
        <section className="py-20 bg-gray-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Research Areas</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto mb-10"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Our main research focus lies in the ecological, evolutionary, and conservation physiology in fishes.
              </p>
            </div>
            
            <TracingBeam className="px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResearchCard 
                  title="Environmental Stressors"
                  description="Investigating physiological responses of marine life to environmental stressors including temperature, pH, and oxygen levels."
                  icon="🌊"
                  link="/environmental-stressors"
                />
                <ResearchCard 
                  title="Novel Protocols"
                  description="Developing innovative in vitro and in vivo protocols to study marine organisms with minimal invasiveness."
                  icon="🧪"
                  link="/in-vivo-protocols"
                />
                <ResearchCard 
                  title="Climate Change Adaptation"
                  description="Studying how marine species adapt to climate change and ocean acidification over time."
                  icon="🌡️"
                  link="/climate-change"
                />
                <ResearchCard 
                  title="Conservation"
                  description="Working to protect and preserve aquatic species and their ecosystems through evidence-based conservation strategies."
                  icon="🐠"
                  link="/conservation"
                />
              </div>
            </TracingBeam>
          </div>
        </section>
        
        {/* Featured Projects with Parallax Cards */}
        <section className="py-32 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                Discover Our Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Featured Projects
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-10"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                Explore our groundbreaking research initiatives focused on understanding and protecting marine ecosystems
              </p>
            </div>
            
            <div className="pb-16">
              <HeroParallax products={[
                {
                  title: "Physioshark Project",
                  link: "/physioshark-project",
                  thumbnail: "/images/gallery/blacktip-shark-blue-lagoon-french-polynesia-huertas.jpg",
                },
                {
                  title: "Epaulette Shark Research",
                  link: "/research",
                  thumbnail: "/images/gallery/epaulette-shark-coral-habitat-heron-island-laine.jpg",
                },
                {
                  title: "Great Barrier Reef Conservation",
                  link: "/conservation",
                  thumbnail: "/images/gallery/healthy-reef-great-barrier-reef-rummer.jpg",
                },
                {
                  title: "Climate Change Impact Studies",
                  link: "/climate-change",
                  thumbnail: "/images/gallery/dr-rummer-heron-island-southern-gbr-grumpy-turtle.jpg",
                },
              ]} />
            </div>
          </div>
        </section>
        
        {/* Collaborators Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Collaborators</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto mb-10"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                We work with leading researchers and institutions around the world.
              </p>
            </div>
            
            <AnimatedCollaborators />
          </div>
        </section>
        
        {/* Call to Action - Donate */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-3xl p-10 shadow-xl backdrop-blur-sm border border-blue-500/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Support Our Research</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Help us protect marine ecosystems by supporting our &quot;Baby Sharks in a Changing World&quot; project.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-8">
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                  How to Donate
                </h3>
                <p className="text-gray-300 mb-6 text-center">
                  To support our research, JCU has established dedicated donation pages:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="https://www.jcu.edu.au/give/give-to-innovation-and-discovery/baby-sharks-in-a-changing-world"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white hover:text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 overflow-hidden"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="text-white group-hover:text-white">Donate (Non-U.S.)</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 text-white" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </Link>
                  <Link 
                    href="https://jcuamerica.org/home/jcu-physioshark-research-program"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white hover:text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 overflow-hidden"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="text-white group-hover:text-white">Donate (U.S. Tax Deductible)</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 text-white" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};