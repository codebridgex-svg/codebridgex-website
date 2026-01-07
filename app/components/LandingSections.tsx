"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import AnimatedTechStack from "./AnimatedTechStack";
import BentoGrid from "./BentoGrid";
import MasonryTestimonials from "./SmoothTestimonials";

type Service = { title: string; description: string };
type CaseStudy = { title: string; description: string; outcome: string };
type Testimonial = { quote: string; author: string };

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-5 w-5 flex-none"
    >
      <path
        d="M7.7 13.2 4.9 10.4a1 1 0 0 1 1.4-1.4l1.9 1.9 5.6-5.6a1 1 0 1 1 1.4 1.4l-6.3 6.5a1 1 0 0 1-1.2 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LandingSections() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const services = useMemo<Service[]>(
    () => [
      {
        title: "Custom Full-Stack Web Development",
        description:
          "Modern, scalable, and high-performance websites and apps tailored to your needs.",
      },
      {
        title: "Business Problem → Tech Solution",
        description:
          "We convert your real-world business problems into smart technology platforms.",
      },
      {
        title: "End-to-End Digital Solutions",
        description:
          "From design to deployment — UI/UX, backend, APIs, dashboards, automation & more.",
      },
      {
        title: "Fully Customizable",
        description: "Nothing generic. Every solution is built uniquely for your brand.",
      },
    ],
    []
  );

  const valueProps = useMemo<string[]>(
    () => [
      "Latest Modern Technologies",
      "Future-Proof Architecture",
      "Scalable & Secure",
      "High Performance & Lightning Fast",
      "Clean Professional UI/UX",
      "Dedicated Expert Team",
    ],
    []
  );

  const tech = useMemo<string[]>(
    () => [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Three.js",
      "GSAP",
      "Tailwind",
      "Cloud & DevOps",
    ],
    []
  );

  const caseStudies = useMemo<CaseStudy[]>(
    () => [
      {
        title: "Operations Dashboard",
        description:
          "A real-time admin platform with role-based access, analytics, and audit trails.",
        outcome: "Faster decisions, fewer manual tasks, clearer KPIs.",
      },
      {
        title: "Conversion-First Website",
        description:
          "Premium UI/UX redesign with performance upgrades and clean information architecture.",
        outcome: "Better trust signals + smoother journeys that convert.",
      },
      {
        title: "Automation Portal",
        description:
          "A secure internal tool integrating APIs and workflows to eliminate repetitive work.",
        outcome: "Reduced operational friction and improved reliability.",
      },
    ],
    []
  );

  const process = useMemo<string[]>(
    () => [
      "Understand Your Business & Problem",
      "Plan Smart Solution",
      "Design Powerful UI/UX",
      "Develop Full-Stack System",
      "Test & Optimize",
      "Launch & Support",
    ],
    []
  );

  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        quote:
          "CodeBridgeX helped us turn an impossible idea into a powerful working platform.",
        author: "Happy Client",
      },
      {
        quote:
          "The UI feels premium and fast. Their team delivered with clarity and precision.",
        author: "Founder, SaaS Startup",
      },
      {
        quote:
          "From architecture to polish — everything was thoughtful, scalable, and future-ready.",
        author: "Product Lead",
      },
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-animate-section]")
    );

    // Set initial states once
    for (const section of sections) {
      const items = Array.from(
        section.querySelectorAll<HTMLElement>("[data-animate-item]")
      );

      gsap.set(section, { opacity: 0, y: 18, filter: "blur(6px)" });
      if (items.length) gsap.set(items, { opacity: 0, y: 14 });
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;
          const items = Array.from(
            section.querySelectorAll<HTMLElement>("[data-animate-item]")
          );

          gsap.to(section, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          });

          if (items.length) {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.08,
            });
          }

          io.unobserve(section);
        }
      },
      { threshold: 0.18 }
    );

    sections.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-6xl px-4 sm:px-6 pb-12 sm:pb-16">
      {/* WHAT WE DO */}
      <section
        id="services"
        data-animate-section
        className="mt-12 sm:mt-16 md:mt-20 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.50)] backdrop-blur-xl scroll-mt-24"
      >
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] sm:text-xs font-medium tracking-wide text-white/55">
              WHAT WE DO
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Custom-built platforms that feel premium and perform at scale
            </h2>
            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70">
              CodeBridgeX builds fully customized full-stack websites, web apps, and
              digital platforms using modern technologies — designed to be fast, secure,
              and future-ready.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              data-animate-item
              className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 sm:p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-[#FF5722]/40 hover:shadow-[0_20px_60px_rgba(255,87,34,0.3)]"
            >
              {/* Animated corner accent */}
              <div className="absolute right-0 top-0 h-20 w-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-l from-[#FF5722] to-transparent" />
                <div className="absolute right-0 top-0 h-12 w-px bg-gradient-to-b from-[#FF5722] to-transparent" />
              </div>
              
              <div className="relative z-10">
                <div className="mb-2 sm:mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF5722]/20 bg-[#FF5722]/10 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#FF5722] transition-all duration-300 group-hover:border-[#FF5722]/50 group-hover:bg-[#FF5722]/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] shadow-[0_0_18px_rgba(255,87,34,0.8)] animate-pulse" />
                  Service
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">{s.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
                  {s.description}
                </p>
                <div className="mt-4 sm:mt-5 h-px w-full bg-gradient-to-r from-[#FF5722]/0 via-white/10 to-[#FF6B35]/0 transition-all duration-500 group-hover:from-[#FF5722]/60 group-hover:via-[#FF5722] group-hover:to-[#FF6B35]/60" />
                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/55 transition-colors duration-300 group-hover:text-white/75">
                  Built with clean architecture, premium UI, and measurable outcomes.
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CODEBRIDGEX */}
      <section data-animate-section className="mt-10 sm:mt-12 md:mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            data-animate-item
            className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-8 backdrop-blur-xl"
          >
            <div className="text-[10px] sm:text-xs font-medium tracking-wide text-white/55">
              WHY CODEBRIDGEX
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Futuristic execution. Trustworthy engineering.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/70">
              We combine modern UI craft with reliable full-stack engineering —
              delivering products that look premium and run flawlessly.
            </p>

            <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3">
              {valueProps.map((v) => (
                <div key={v} data-animate-item className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 text-[#FF5722] flex-shrink-0">
                    <CheckIcon />
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-animate-item
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF5722]/10 via-white/[0.03] to-[#FF6B35]/10 p-5 sm:p-6 md:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#FF5722]/15 blur-[90px]" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#FF6B35]/15 blur-[90px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_18px_rgba(255,107,53,0.8)]" />
                Value
              </div>

              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-white/90">
                Bridge the gap between vision and execution
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/70">
                From strategy and UI/UX to backend systems and deployment — we build
                technology that turns business problems into scalable solutions.
              </p>

              <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                {[
                  { k: "Speed", v: "Fast delivery without sacrificing quality" },
                  { k: "Quality", v: "Clean code, stable releases, future-ready" },
                  { k: "Design", v: "Premium UI with glass + neon accents" },
                  { k: "Trust", v: "Secure, scalable, maintainable systems" },
                ].map((x) => (
                  <div
                    key={x.k}
                    data-animate-item
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4"
                  >
                    <div className="text-[10px] sm:text-xs text-white/55">{x.k}</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-white/90">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TECHNOLOGIES */}
      <section id="technologies" data-animate-section className="mt-10 sm:mt-12 md:mt-16 overflow-visible scroll-mt-24">
        <div
          data-animate-item
          className="overflow-visible rounded-2xl sm:rounded-3xl border border-[#FF5722]/20 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 sm:p-6 md:p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(255,87,34,0.15)]"
        >
          <div className="text-[10px] sm:text-xs font-medium tracking-wide text-[#FF5722]/80 uppercase">
            TECHNOLOGIES
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Modern stack. Production-grade results.
          </h2>
          <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70">
            We use proven tools to ship high-performance experiences — from frontend
            interactions to backend systems and DevOps.
          </p>

          {/* Animated Tech Stack with infinite scroll */}
          <div className="mt-6 sm:mt-8 overflow-visible">
            <AnimatedTechStack />
          </div>

          {/* Bottom accent line */}
          <div className="mt-4 sm:mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF5722]/30 to-transparent" />
          <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-white/50">
            Infinite scrolling tech showcase • Powered by latest technologies
          </p>
        </div>
      </section>

      {/* CASE STUDY / SOLUTIONS */}
      <section id="solutions" data-animate-section className="mt-10 sm:mt-12 md:mt-16 scroll-mt-24">
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] sm:text-xs font-medium tracking-wide text-white/55">
              SOLUTIONS
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Built to solve. Designed to scale.
            </h2>
            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70">
              A glimpse of solution types we deliver — tailored to your industry and
              goals.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
          {caseStudies.map((c) => (
            <div
              key={c.title}
              data-animate-item
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:rotate-1 hover:border-[#FF5722]/30 hover:shadow-[0_25px_70px_rgba(255,87,34,0.25)]"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#FF5722]/10 blur-[70px] transition-all duration-500 group-hover:bg-[#FF5722]/20" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-[#FF6B35]/10 blur-[70px] transition-all duration-500 group-hover:bg-[#FF6B35]/20" />

              <div className="relative">
                <h3 className="text-base font-semibold text-white/90 transition-all duration-300 group-hover:text-[#FF5722]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
                  {c.description}
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 group-hover:border-[#FF5722]/40 group-hover:bg-[#FF5722]/10">
                  <div className="text-xs font-semibold text-[#FF5722]/80 transition-colors duration-300 group-hover:text-[#FF5722]">Outcome</div>
                  <div className="mt-1 text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                    {c.outcome}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT SHOWCASE - BENTO GRID */}
      <section id="projects" data-animate-section className="mt-16 scroll-mt-24">
        <div data-animate-item>
          <div className="text-xs font-medium tracking-wide text-[#FF5722]/80 uppercase">
            FEATURED PROJECTS
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Explore our recent work
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            Real projects, real results. See how we've helped businesses transform their digital presence.
          </p>

          <div className="mt-8">
            <BentoGrid />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section data-animate-section className="mt-10 sm:mt-12 md:mt-16">
        <div
          data-animate-item
          className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-8 backdrop-blur-xl"
        >
          <div className="text-[10px] sm:text-xs font-medium tracking-wide text-white/55">
            OUR PROCESS
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            A clear workflow from idea to launch
          </h2>

          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
            {process.map((p, idx) => (
              <div
                key={p}
                data-animate-item
                className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 sm:p-5 md:p-6 transition-all duration-500 hover:border-[#FF5722]/40 hover:shadow-[0_15px_50px_rgba(255,87,34,0.2)] hover:scale-105"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl sm:rounded-2xl border border-white/10 bg-black/20 text-xs sm:text-sm font-semibold text-white/85 transition-all duration-500 group-hover:scale-110 group-hover:border-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,87,34,0.6)]">
                    {idx + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#FF5722]/30 via-white/10 to-[#FF6B35]/30 transition-all duration-500 group-hover:from-[#FF5722] group-hover:via-[#FF6B35] group-hover:to-[#FF5722]" />
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">{p}</div>
                <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                  Structured, transparent, and optimized for quality + speed.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" data-animate-section className="mt-10 sm:mt-12 md:mt-16 scroll-mt-24">
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] sm:text-xs font-medium tracking-wide text-white/55">
              TESTIMONIALS
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Teams trust CodeBridgeX for high-impact delivery
            </h2>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <MasonryTestimonials />
        </div>
      </section>

      {/* CONTACT + CTA */}
      <section data-animate-section className="mt-10 sm:mt-12 md:mt-16">
        <div
          data-animate-item
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#FF5722]/10 via-white/[0.03] to-[#FF6B35]/10 p-5 sm:p-6 md:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#FF5722]/18 blur-[90px]" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#FF6B35]/18 blur-[100px]" />

          <div className="relative grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-xs font-medium tracking-wide text-white/55">
                CALL TO ACTION
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to build something extraordinary?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Let’s turn your idea into reality. Share what you’re building and we’ll
                outline a smart path to launch.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF6B35] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black shadow-[0_12px_45px_rgba(255,107,53,0.22)] hover:opacity-95 text-center"
                >
                  Start a Project
                </a>
                <a
                  href="mailto:hello@codebridgex.com"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white/85 backdrop-blur hover:bg-white/[0.07] text-center"
                >
                  Contact Us
                </a>
              </div>

              {submitted ? (
                <div className="mt-5 text-sm text-white/70">
                  Thanks — we’ll respond shortly.
                </div>
              ) : (
                <div className="mt-5 text-xs text-white/55">
                  Typical response time: within 1–2 business days.
                </div>
              )}
            </div>

            <form
              id="contact"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                setError("");

                try {
                  const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    setSubmitted(true);
                    setFormData({ name: "", email: "", message: "" });
                  } else {
                    setError(data.error || "Failed to send message");
                  }
                } catch (err) {
                  setError("Failed to send message. Please try again.");
                  console.error("Error:", err);
                } finally {
                  setIsLoading(false);
                }
              }}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-5 md:p-6 backdrop-blur"
            >
              <div className="text-xs sm:text-sm font-semibold text-white/90">Send a message</div>
              <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3">
                <label className="grid gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
                  Name
                  <input
                    required
                    className="h-10 sm:h-11 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 text-xs sm:text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </label>
                <label className="grid gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
                  Email
                  <input
                    required
                    type="email"
                    className="h-10 sm:h-11 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 text-xs sm:text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="you@company.com"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </label>
                <label className="grid gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-white/60">
                  Message
                  <textarea
                    required
                    rows={4}
                    className="min-h-[100px] sm:min-h-[120px] resize-none rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="Tell us what you want to build..."
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={isLoading}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 sm:mt-4 w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF5722] to-[#FF6B35] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
              
              {submitted && (
                <div className="mt-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-center text-sm text-green-400">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {error && (
                <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-center text-sm text-red-400">
                  ✗ {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 sm:mt-12 md:mt-16 border-t border-white/10 pt-8 sm:pt-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-white/90">CodeBridgeX</div>
            <div className="mt-1 text-xs text-white/55">
              Building Bridges Between Ideas &amp; Technology
            </div>
            
            {/* Contact Information */}
            <div className="mt-4 space-y-2">
              <a 
                href="mailto:codebridgex@gmail.com" 
                className="flex items-center gap-2 text-xs text-white/60 hover:text-[#FF5722] transition-colors group"
              >
                <svg 
                  className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span>codebridgex@gmail.com</span>
              </a>
              
              <a 
                href="tel:+917223820412" 
                className="flex items-center gap-2 text-xs text-white/60 hover:text-[#FF5722] transition-colors group"
              >
                <svg 
                  className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span>+91 722 382 0412</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-white/55">
            <a className="hover:text-white/80" href="#">
              Services
            </a>
            <a className="hover:text-white/80" href="#">
              Technologies
            </a>
            <a className="hover:text-white/80" href="#contact">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} CodeBridgeX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
