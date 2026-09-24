"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Moon, Sun, Sparkles, MessageSquare, Terminal, Zap, Check, ChevronDown, Wand2, Image as ImageIcon, Headphones, FileText, LayoutTemplate, PenTool } from "lucide-react";
import { useNavigation } from "@/store/navigation";
import { Logo } from "@/components/shared/Logo";
import { Features } from "./Features";
import { AIModels } from "./AIModels";
import { ProductPreview } from "./ProductPreview";
import { WhyChoose } from "./WhyChoose";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import dynamic from "next/dynamic";

const Ambient3D = dynamic(() => import("./Ambient3D"), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent animate-pulse" /> 
});

export function LandingPage() {
  const { setView } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0B0914] text-white' : 'bg-[#FAFAF9] text-stone-900'}`}>
      
      {/* Background Ambient 3D */}
      <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}>
        <Ambient3D isDarkMode={isDarkMode} />
      </div>

      {/* 1. Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? (isDarkMode ? 'bg-[#0B0914]/80 backdrop-blur-xl border-b border-white/5 shadow-sm' : 'bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-black/5 shadow-sm') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105 duration-300" onClick={() => setView("landing")}>
              <Logo size="md" />
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 bg-black/5 px-6 py-2 rounded-full dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5">
              {['Features', 'AI Models', 'Product', 'Pricing', 'FAQ'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm font-medium relative group ${isDarkMode ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'} transition-colors`}>
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-full transition-all duration-300 ${isDarkMode ? 'text-stone-400 hover:text-white hover:bg-white/10' : 'text-stone-500 hover:text-stone-900 hover:bg-black/5'}`}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setView("extension")} className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${isDarkMode ? 'text-stone-300 hover:text-white hover:bg-white/10' : 'text-stone-600 hover:text-stone-900 hover:bg-black/5'}`}>
                Install Extension
              </button>
              <button onClick={() => setView("app")} className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm shadow-sm transition-all duration-300 overflow-hidden bg-violet-600 hover:bg-violet-700 hover:shadow-violet-600/20 hover:-translate-y-0.5 border border-violet-500/50">
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${isDarkMode ? 'text-zinc-400 bg-zinc-800/50' : 'text-zinc-500 bg-zinc-100'}`}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 rounded-full ${isDarkMode ? 'text-zinc-300 bg-zinc-800/50' : 'text-zinc-600 bg-zinc-100'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 border-b opacity-100' : 'max-h-0 opacity-0'} ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="px-4 py-6 flex flex-col gap-4">
            {['Features', 'AI Models', 'Product', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`block text-base font-medium px-4 py-2 rounded-lg ${isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-100'}`}>
                {item}
              </a>
            ))}
            <hr className={`my-2 ${isDarkMode ? 'border-zinc-800' : 'border-zinc-100'}`} />
            <button onClick={() => setView("extension")} className={`text-left text-base font-medium px-4 py-2 rounded-lg ${isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-100'}`}>
              Install Extension
            </button>
            <button onClick={() => setView("app")} className="flex items-center justify-center gap-2 mx-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 ${isDarkMode ? 'bg-[#1C1A27] border-white/10 text-stone-300' : 'bg-white border-black/10 text-stone-700'} shadow-sm`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-sm font-medium">New: Advanced Chat Canvas</span>
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.1] mb-4 ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-br from-white to-stone-400' : 'text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-500'}`}>
              Chat with the <br className="hidden lg:block" />
              <span className="text-violet-600 dark:text-violet-500">Best AI Models</span>
            </h1>

            <p className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Experience unparalleled intelligence. Seamlessly switch between GPT-5.5, Opus 4.8, and Gemini Flash in one beautiful, unified workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button onClick={() => setView("app")} className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg shadow-sm border border-violet-500/50 transition-all duration-300 hover:bg-violet-700 hover:shadow-violet-600/20 hover:-translate-y-0.5">
                Start Chatting Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className={`flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'bg-[#1C1A27] text-white hover:bg-[#252236] border border-white/5' : 'bg-white text-stone-900 hover:bg-stone-50 border border-black/5 shadow-sm'}`}>
                <Terminal className="w-5 h-5" />
                View Documentation
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[
                  'from-blue-400 to-emerald-400',
                  'from-violet-400 to-fuchsia-400',
                  'from-amber-400 to-orange-400',
                  'from-rose-400 to-red-400',
                  'from-cyan-400 to-blue-400'
                ].map((gradient, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 ${isDarkMode ? 'border-zinc-950' : 'border-[#FAFAFA]'} bg-gradient-to-br ${gradient} shadow-sm transition-transform hover:-translate-y-1 z-[${5-i}]`}></div>
                ))}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Trusted by <strong className={isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}>100,000+</strong> users worldwide
              </div>
            </div>
          </div>

          {/* Right: Browser Mockup Preview */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative z-10 perspective-[2000px]">
            {/* Glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/30 to-blue-500/30 blur-[80px] rounded-full scale-110 -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            
            {/* Main Window */}
            <div className={`relative rounded-[24px] overflow-hidden border shadow-2xl transition-transform duration-500 hover:rotate-y-2 hover:-rotate-x-2 ${isDarkMode ? 'border-white/10 bg-[#15131F] shadow-black/80' : 'border-black/5 bg-white shadow-stone-200/50'}`}>
              
              {/* Traffic Lights / Header */}
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDarkMode ? 'border-white/5 bg-[#1C1A27]' : 'border-black/5 bg-[#FAFAF9]'}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 hover:bg-amber-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 hover:bg-green-400 transition-colors"></div>
                </div>
                <div className={`mx-auto w-48 h-6 rounded-md flex items-center justify-center text-xs font-medium ${isDarkMode ? 'bg-[#0B0914] text-stone-400' : 'bg-white text-stone-500 shadow-sm border border-black/5'}`}>
                  <Sparkles className="w-3 h-3 mr-1.5 text-violet-500" /> echogpt.app
                </div>
              </div>

              {/* App UI Inside Mockup */}
              <div className="flex h-[420px]">
                {/* Sidebar */}
                <div className={`hidden sm:flex flex-col w-[160px] border-r p-3 ${isDarkMode ? 'border-white/5 bg-[#13111C]' : 'border-black/5 bg-[#FAFAF9]'}`}>
                  <button className={`w-full flex items-center justify-start gap-2 px-3 py-2 rounded-lg text-sm font-medium mb-4 ${isDarkMode ? 'bg-[#252236] text-white hover:bg-[#2F2B42]' : 'bg-white border border-black/5 shadow-sm text-stone-800 hover:bg-stone-50'}`}>
                    <MessageSquare className="w-4 h-4" /> New chat
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Recent</div>
                    <div className={`px-2 py-1.5 rounded-md text-xs truncate cursor-pointer ${isDarkMode ? 'text-stone-300 bg-white/5' : 'text-stone-700 bg-black/5'}`}>React architecture</div>
                    <div className={`px-2 py-1.5 rounded-md text-xs truncate cursor-pointer ${isDarkMode ? 'text-stone-500 hover:text-stone-300 hover:bg-white/5' : 'text-stone-500 hover:text-stone-700 hover:bg-black/5'}`}>Next.js routing</div>
                    <div className={`px-2 py-1.5 rounded-md text-xs truncate cursor-pointer ${isDarkMode ? 'text-stone-500 hover:text-stone-300 hover:bg-white/5' : 'text-stone-500 hover:text-stone-700 hover:bg-black/5'}`}>Python script...</div>
                  </div>
                  <div className={`mt-auto flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500"></div>
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>Arafat</span>
                  </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col p-4 sm:p-5 relative overflow-hidden">
                  
                  {/* Model Selector Top */}
                  <div className="flex justify-center mb-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm cursor-pointer ${isDarkMode ? 'bg-[#1C1A27] border-white/5 text-stone-200' : 'bg-white border-black/5 text-stone-700'}`}>
                      <img src="https://cdn.21st.dev/assets/mirror/b9/b93fa7942be639a1dae60194ff12141145d7d9fd59581582d6ff23335755f19c.svg" alt="GPT-5.5" className={`w-4 h-4 object-contain ${isDarkMode ? 'invert' : ''}`} />
                      <span className="text-xs font-semibold">GPT 5.5</span>
                      <ChevronDown className="w-3 h-3 opacity-50" />
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="flex flex-col gap-5 flex-1">
                    {/* User */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-stone-100 dark:bg-[#252236] text-stone-900 dark:text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                        How do I build a scalable React app?
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-[#1C1A27] border-white/5' : 'bg-white border-black/5 shadow-sm'} border`}>
                        <img src="https://cdn.21st.dev/assets/mirror/b9/b93fa7942be639a1dae60194ff12141145d7d9fd59581582d6ff23335755f19c.svg" className={`w-4 h-4 ${isDarkMode ? 'invert' : ''}`} alt="AI" />
                      </div>
                      <div className={`flex-1 text-sm leading-relaxed ${isDarkMode ? 'text-stone-300' : 'text-stone-700'}`}>
                        <p className="mb-2">Here are the key principles for scalable React apps:</p>
                        <ul className="space-y-1.5">
                          <li className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Component boundaries:</strong> keep them single-purpose.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Server-first:</strong> use Server Components & Suspense.</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Type safety:</strong> strict TypeScript everywhere.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Generating Indicator */}
                    <div className="flex gap-3 mt-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-[#1C1A27] border-white/5' : 'bg-white border-black/5 shadow-sm'} border`}>
                        <img src="https://cdn.21st.dev/assets/mirror/5d/5de1221c77cc91e748066fd642ad0eee1c1fa65328814f5178166f901e599709.svg" className="w-4 h-4" alt="Opus" />
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-sm w-fit ${isDarkMode ? 'bg-[#1C1A27]' : 'bg-stone-50'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Input Mockup */}
                  <div className={`absolute bottom-4 left-4 sm:left-5 right-4 sm:right-5 h-12 rounded-2xl border flex items-center px-3 gap-2 shadow-sm ${isDarkMode ? 'bg-[#1C1A27]/90 border-white/5' : 'bg-white/90 border-black/5 backdrop-blur-md'}`}>
                    <PlusIcon className={`w-4 h-4 ${isDarkMode ? 'text-stone-400' : 'text-stone-400'}`} />
                    <div className={`flex-1 text-xs ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Message EchoGPT...</div>
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-violet-600 text-white' : 'bg-violet-600 text-white'}`}>
                      <ArrowUpIcon className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Floating Overlay Card - Depth effect */}
                  <div className={`absolute -right-6 top-24 w-48 rounded-[20px] border shadow-2xl p-3 transform rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-300 ${isDarkMode ? 'bg-[#15131F]/95 border-white/10 shadow-black/60' : 'bg-white/95 border-black/5 shadow-stone-300/60'} backdrop-blur-xl z-20`}>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>Quick Actions</div>
                    <div className="space-y-1.5">
                      <div className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium cursor-pointer ${isDarkMode ? 'hover:bg-white/5 text-stone-300' : 'hover:bg-black/5 text-stone-700'}`}>
                        <Wand2 className="w-3.5 h-3.5 text-violet-500" /> Improve writing
                      </div>
                      <div className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium cursor-pointer ${isDarkMode ? 'hover:bg-white/5 text-stone-300' : 'hover:bg-black/5 text-stone-700'}`}>
                        <ImageIcon className="w-3.5 h-3.5 text-violet-500" /> Generate image
                      </div>
                      <div className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium cursor-pointer ${isDarkMode ? 'hover:bg-white/5 text-stone-300' : 'hover:bg-black/5 text-stone-700'}`}>
                        <Headphones className="w-3.5 h-3.5 text-violet-500" /> Voice chat
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Optional Gradient fade out at bottom */}
      <div className={`h-24 absolute bottom-0 left-0 right-0 z-0 bg-gradient-to-b pointer-events-none ${isDarkMode ? 'from-transparent to-[#0B0914]' : 'from-transparent to-[#FAFAF9]'}`}></div>
      
      {/* Other Sections */}
      <main className={`relative z-10 flex flex-col items-center w-full ${isDarkMode ? 'bg-[#0B0914]' : 'bg-[#FAFAF9]'}`}>
        <Features />
        <AIModels />
        <ProductPreview />
        <WhyChoose />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

// Small helper icons for the mockup
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default LandingPage;
