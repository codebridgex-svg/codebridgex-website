"use client";

import { useState } from "react";

type Technology = {
  name: string;
  description: string;
  color: string;
  textColor?: string;
  category: string;
};

export default function AnimatedTechStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const technologies: Technology[] = [
    {
      name: "React",
      description: "A JavaScript library for building user interfaces",
      color: "#61DAFB",
      textColor: "#000",
      category: "Frontend",
    },
    {
      name: "Next.js",
      description: "The React framework for production",
      color: "#000000",
      textColor: "#fff",
      category: "Framework",
    },
    {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8",
      color: "#339933",
      textColor: "#fff",
      category: "Backend",
    },
    {
      name: "TypeScript",
      description: "Typed superset of JavaScript",
      color: "#3178C6",
      textColor: "#fff",
      category: "Language",
    },
    {
      name: "Tailwind CSS",
      description: "A utility-first CSS framework",
      color: "#06B6D4",
      textColor: "#fff",
      category: "Styling",
    },
    {
      name: "MongoDB",
      description: "NoSQL database for modern applications",
      color: "#47A248",
      textColor: "#fff",
      category: "Database",
    },
    {
      name: "PostgreSQL",
      description: "Advanced open source database",
      color: "#4169E1",
      textColor: "#fff",
      category: "Database",
    },
    {
      name: "Supabase",
      description: "Open source Firebase alternative",
      color: "#3ECF8E",
      textColor: "#000",
      category: "Backend",
    },
    {
      name: "Firebase",
      description: "Google's app development platform",
      color: "#FFCA28",
      textColor: "#000",
      category: "Backend",
    },
    {
      name: "AWS",
      description: "Amazon Web Services cloud platform",
      color: "#FF9900",
      textColor: "#000",
      category: "Cloud",
    },
    {
      name: "Redis",
      description: "In-memory data structure store",
      color: "#DC382D",
      textColor: "#fff",
      category: "Cache",
    },
    {
      name: "Three.js",
      description: "JavaScript 3D library",
      color: "#000000",
      textColor: "#fff",
      category: "Graphics",
    },
    {
      name: "GSAP",
      description: "Professional-grade animation library",
      color: "#88CE02",
      textColor: "#000",
      category: "Animation",
    },
    {
      name: "Express",
      description: "Fast, minimalist web framework",
      color: "#000000",
      textColor: "#fff",
      category: "Backend",
    },
    {
      name: "Docker",
      description: "Containerization platform",
      color: "#2496ED",
      textColor: "#fff",
      category: "DevOps",
    },
    {
      name: "GraphQL",
      description: "Query language for APIs",
      color: "#E10098",
      textColor: "#fff",
      category: "API",
    },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <div className="relative py-8 pb-8">
      {/* Gradient overlays for fade effect */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#05060a] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#05060a] to-transparent" />

      {/* Infinite scrolling container - overflow only for horizontal scroll */}
      <div className="relative overflow-x-hidden">
        <div className="flex animate-infinite-scroll hover:pause-animation">
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group relative mx-2 flex-shrink-0"
              onMouseEnter={() => setHoveredTech(`${tech.name}-${index}`)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Tech badge */}
              <div
                className="relative cursor-pointer overflow-hidden rounded-full border-2 bg-black px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                style={{
                  borderColor: tech.color,
                  color: tech.color,
                  boxShadow:
                    hoveredTech === `${tech.name}-${index}`
                      ? `0 0 30px ${tech.color}80, 0 0 60px ${tech.color}40`
                      : "none",
                }}
              >
                {/* Shimmer effect */}
                <div
                  className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />

                <span className="relative z-10">{tech.name}</span>

                {/* Category badge */}
                <span
                  className="absolute -right-1 -top-1 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: "#FF5722",
                    color: "#fff",
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for infinite scroll animation */}
      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
