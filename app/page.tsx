import Hero3D from "./components/Hero3D";
import LandingSections from "./components/LandingSections";
import BackgroundFX from "./components/BackgroundFX";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <BackgroundFX className="opacity-80" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#39d5ff]/16 blur-[80px] sm:h-[520px] sm:w-[520px] sm:bg-[#39d5ff]/20 sm:blur-[90px]" />
        <div className="absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-[#8b5dff]/16 blur-[90px] sm:h-[560px] sm:w-[560px] sm:bg-[#8b5dff]/20 sm:blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_-120px,rgba(255,255,255,0.10),transparent_65%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_30px_rgba(57,213,255,0.15)] backdrop-blur" />
            <div>
              <div className="text-sm text-white/70">CodeBridgeX</div>
              <div className="text-xs text-white/50">
                Building Bridges Between Ideas &amp; Technology
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/[0.07]">
              Book Consultation
            </button>
            <button className="rounded-full bg-gradient-to-r from-[#39d5ff] to-[#8b5dff] px-4 py-2 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(139,93,255,0.25)] hover:opacity-95">
              Get Started
            </button>
          </div>
        </header>

        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#39d5ff] shadow-[0_0_18px_rgba(57,213,255,0.8)]" />
              100% Custom — Latest Technology — Future-Ready Solutions
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Build Powerful Digital Experiences with{" "}
              <span className="bg-gradient-to-r from-[#39d5ff] to-[#8b5dff] bg-clip-text text-transparent">
                CodeBridgeX
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70">
              We create fully customized full-stack websites and enterprise-grade
              digital solutions that transform your business challenges into
              innovative technology success.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-gradient-to-r from-[#39d5ff] to-[#8b5dff] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_45px_rgba(57,213,255,0.18)] hover:opacity-95">
                Get Started
              </button>
              <button className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur hover:bg-white/[0.07]">
                Book Consultation
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Full-Stack Builds", value: "Custom" },
                { label: "Performance", value: "Lightning Fast" },
                { label: "Architecture", value: "Future-Proof" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
                >
                  <div className="text-xs text-white/50">{x.label}</div>
                  <div className="mt-1 text-sm font-semibold text-white/90">
                    {x.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-r from-[#39d5ff]/20 to-[#8b5dff]/20 blur-2xl" />
            {/* fixed sizing + more room for the new "tech modules" */}
            <Hero3D className="relative h-[360px] sm:h-[460px] md:h-[560px]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          </div>
        </section>
      </main>

      <LandingSections />
    </div>
  );
}
