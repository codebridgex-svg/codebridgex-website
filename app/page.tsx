import Image from "next/image";
import LandingSections from "./components/LandingSections";
import BackgroundFX from "./components/BackgroundFX";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <BackgroundFX className="opacity-80" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FF5722]/16 blur-[80px] sm:h-[520px] sm:w-[520px] sm:bg-[#FF5722]/20 sm:blur-[90px]" />
        <div className="absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-[#FF6B35]/16 blur-[90px] sm:h-[560px] sm:w-[560px] sm:bg-[#FF6B35]/20 sm:blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_-120px,rgba(255,87,34,0.10),transparent_65%)]" />
      </div>


      {/* Navigation Bar - Full Width */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#05060a]/90 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl flex-shrink-0 bg-gradient-to-br from-[#FF5722]/10 to-[#FF6B35]/10 p-1.5">
                <Image
                  src="/Gemini_Generated_Image_ebxjvmebxjvmebxj-removebg-preview.png"
                  alt="CodeBridgeX Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-lg font-bold text-white">CodeBridgeX</div>
                <div className="hidden md:block text-[11px] text-white/50">
                  Building Bridges Between Ideas & Technology
                </div>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="#services" 
                className="text-sm font-medium text-white/70 hover:text-[#FF5722] transition-colors duration-300"
              >
                Services
              </a>
              <a 
                href="#technologies" 
                className="text-sm font-medium text-white/70 hover:text-[#FF5722] transition-colors duration-300"
              >
                Technologies
              </a>
              <a 
                href="#solutions" 
                className="text-sm font-medium text-white/70 hover:text-[#FF5722] transition-colors duration-300"
              >
                Solutions
              </a>
              <a 
                href="#projects" 
                className="text-sm font-medium text-white/70 hover:text-[#FF5722] transition-colors duration-300"
              >
                Projects
              </a>
              <a 
                href="#testimonials" 
                className="text-sm font-medium text-white/70 hover:text-[#FF5722] transition-colors duration-300"
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF6B35] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_12px_40px_rgba(255,87,34,0.45)] hover:scale-105 transition-all duration-300"
              >
                Get Started
              </a>
            </nav>

            {/* CTA Button - Tablet/Mobile */}
            <div className="lg:hidden">
              <a 
                href="#contact" 
                className="rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF6B35] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,87,34,0.3)] hover:opacity-95 transition-all"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">

        <section className="flex flex-col items-center text-center px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/[0.08] px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] shadow-[0_0_18px_rgba(255,87,34,0.8)] animate-pulse" />
            <span className="hidden sm:inline">100% Custom — Latest Technology — Future-Ready Solutions</span>
            <span className="sm:hidden">100% Custom — Future-Ready</span>
          </div>

          <h1 className="mt-4 sm:mt-6 text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight max-w-4xl leading-tight">
            Build Powerful Digital Experiences with{" "}
            <span className="bg-gradient-to-r from-[#FF5722] to-[#FF6B35] bg-clip-text text-transparent">
              CodeBridgeX
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-2xl text-pretty text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/70">
            We create fully customized full-stack websites and enterprise-grade
            digital solutions that transform your business challenges into
            innovative technology success.
          </p>

          <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none">
            <a href="#contact" className="block sm:inline-block w-full sm:w-auto rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF6B35] px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_12px_45px_rgba(255,87,34,0.35)] hover:shadow-[0_16px_55px_rgba(255,87,34,0.45)] hover:scale-105 transition-all duration-300 text-center">
              Get Started
            </a>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl w-full">
            {[
              { label: "Full-Stack Builds", value: "Custom" },
              { label: "Performance", value: "Lightning Fast" },
              { label: "Architecture", value: "Future-Proof" },
            ].map((x) => (
              <div
                key={x.label}
                className="rounded-xl sm:rounded-2xl border border-[#FF5722]/20 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-3 sm:p-4 md:p-5 shadow-[0_0_0_1px_rgba(255,87,34,0.1)] backdrop-blur hover:border-[#FF5722]/40 hover:shadow-[0_8px_30px_rgba(255,87,34,0.2)] transition-all duration-300 group"
              >
                <div className="text-[10px] sm:text-xs md:text-sm text-white/60 group-hover:text-[#FF5722] transition-colors">{x.label}</div>
                <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base font-bold text-white/90 group-hover:text-white transition-colors">
                  {x.value}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <LandingSections />
    </div>
  );
}
