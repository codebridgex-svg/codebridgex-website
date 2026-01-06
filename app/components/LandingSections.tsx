"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

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
    <div ref={rootRef} className="mx-auto max-w-6xl px-6 pb-16">
      {/* WHAT WE DO */}
      <section
        data-animate-section
        className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.50)] backdrop-blur-xl"
      >
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-medium tracking-wide text-white/55">
              WHAT WE DO
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Custom-built platforms that feel premium and perform at scale
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              CodeBridgeX builds fully customized full-stack websites, web apps, and
              digital platforms using modern technologies — designed to be fast, secure,
              and future-ready.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              data-animate-item
              className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39d5ff] shadow-[0_0_18px_rgba(57,213,255,0.8)]" />
                Service
              </div>
              <h3 className="text-base font-semibold text-white/90">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {s.description}
              </p>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-4 text-xs text-white/55">
                Built with clean architecture, premium UI, and measurable outcomes.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CODEBRIDGEX */}
      <section data-animate-section className="mt-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            data-animate-item
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <div className="text-xs font-medium tracking-wide text-white/55">
              WHY CODEBRIDGEX
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Futuristic execution. Trustworthy engineering.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              We combine modern UI craft with reliable full-stack engineering —
              delivering products that look premium and run flawlessly.
            </p>

            <div className="mt-6 grid gap-3">
              {valueProps.map((v) => (
                <div key={v} data-animate-item className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#39d5ff]">
                    <CheckIcon />
                  </div>
                  <div className="text-sm text-white/80">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-animate-item
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#39d5ff]/10 via-white/[0.03] to-[#8b5dff]/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#39d5ff]/15 blur-[90px]" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#8b5dff]/15 blur-[90px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8b5dff] shadow-[0_0_18px_rgba(139,93,255,0.8)]" />
                Value
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white/90">
                Bridge the gap between vision and execution
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                From strategy and UI/UX to backend systems and deployment — we build
                technology that turns business problems into scalable solutions.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Speed", v: "Fast delivery without sacrificing quality" },
                  { k: "Quality", v: "Clean code, stable releases, future-ready" },
                  { k: "Design", v: "Premium UI with glass + neon accents" },
                  { k: "Trust", v: "Secure, scalable, maintainable systems" },
                ].map((x) => (
                  <div
                    key={x.k}
                    data-animate-item
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="text-xs text-white/55">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold text-white/90">
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
      <section data-animate-section className="mt-16">
        <div
          data-animate-item
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div className="text-xs font-medium tracking-wide text-white/55">
            TECHNOLOGIES
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Modern stack. Production-grade results.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            We use proven tools to ship high-performance experiences — from frontend
            interactions to backend systems and DevOps.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                data-animate-item
                className="rounded-full border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-4 py-2 text-xs text-white/80 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY / SOLUTIONS */}
      <section data-animate-section className="mt-16">
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-medium tracking-wide text-white/55">
              SOLUTIONS
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Built to solve. Designed to scale.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
              A glimpse of solution types we deliver — tailored to your industry and
              goals.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {caseStudies.map((c) => (
            <div
              key={c.title}
              data-animate-item
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#39d5ff]/10 blur-[70px]" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-56 w-56 rounded-full bg-[#8b5dff]/10 blur-[70px]" />

              <div className="relative">
                <h3 className="text-base font-semibold text-white/90">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {c.description}
                </p>
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Outcome</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    {c.outcome}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section data-animate-section className="mt-16">
        <div
          data-animate-item
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
        >
          <div className="text-xs font-medium tracking-wide text-white/55">
            OUR PROCESS
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            A clear workflow from idea to launch
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {process.map((p, idx) => (
              <div
                key={p}
                data-animate-item
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/20 text-sm font-semibold text-white/85">
                    {idx + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#39d5ff]/50 via-white/10 to-[#8b5dff]/50" />
                </div>
                <div className="mt-4 text-sm font-semibold text-white/90">{p}</div>
                <div className="mt-2 text-xs leading-relaxed text-white/60">
                  Structured, transparent, and optimized for quality + speed.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section data-animate-section className="mt-16">
        <div data-animate-item className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-medium tracking-wide text-white/55">
              TESTIMONIALS
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Teams trust CodeBridgeX for high-impact delivery
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              data-animate-item
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <blockquote className="text-sm leading-relaxed text-white/75">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-medium text-white/60">
                — {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACT + CTA */}
      <section data-animate-section className="mt-16">
        <div
          data-animate-item
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#39d5ff]/10 via-white/[0.03] to-[#8b5dff]/10 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#39d5ff]/18 blur-[90px]" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#8b5dff]/18 blur-[100px]" />

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

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-gradient-to-r from-[#39d5ff] to-[#8b5dff] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_45px_rgba(139,93,255,0.22)] hover:opacity-95"
                >
                  Start a Project
                </a>
                <a
                  href="mailto:hello@codebridgex.com"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur hover:bg-white/[0.07]"
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
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur"
            >
              <div className="text-sm font-semibold text-white/90">Send a message</div>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-2 text-xs text-white/60">
                  Name
                  <input
                    required
                    className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="Your name"
                    name="name"
                  />
                </label>
                <label className="grid gap-2 text-xs text-white/60">
                  Email
                  <input
                    required
                    type="email"
                    className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="you@company.com"
                    name="email"
                  />
                </label>
                <label className="grid gap-2 text-xs text-white/60">
                  Message
                  <textarea
                    required
                    rows={4}
                    className="min-h-[120px] resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/90 outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
                    placeholder="Tell us what you want to build..."
                    name="message"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#39d5ff] to-[#8b5dff] px-5 py-3 text-sm font-semibold text-black hover:opacity-95"
              >
                Send
              </button>
              <div className="mt-3 text-center text-[11px] text-white/45">
                This form is frontend-only for now (no backend yet).
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 pt-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-white/90">CodeBridgeX</div>
            <div className="mt-1 text-xs text-white/55">
              Building Bridges Between Ideas &amp; Technology
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
