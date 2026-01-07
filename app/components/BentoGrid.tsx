"use client";

import Image from "next/image";

type Project = {
  title: string;
  description: string;
  category: string;
  size: "small" | "medium" | "large";
  image: string;
};

export default function BentoGrid() {
  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack shopping experience with AI-powered recommendations",
      category: "Web App",
      size: "large",
      image: "/projects/ecommerce.png",
    },
    {
      title: "AI Chat Assistant",
      description: "Real-time chat with GPT integration and voice support",
      category: "AI/ML",
      size: "medium",
      image: "/projects/ai-chat.png",
    },
    {
      title: "Dashboard Analytics",
      description: "Real-time data visualization with custom charts",
      category: "SaaS",
      size: "medium",
      image: "/projects/dashboard.png",
    },
    {
      title: "Mobile Banking App",
      description: "Secure payments and transfers with biometric auth",
      category: "Mobile",
      size: "small",
      image: "/projects/banking.png",
    },
    {
      title: "Social Media Platform",
      description: "Connect with friends, share moments, real-time messaging",
      category: "Social",
      size: "large",
      image: "/projects/social.png",
    },
    {
      title: "Video Streaming",
      description: "Netflix-like platform with 4K streaming",
      category: "Media",
      size: "medium",
      image: "/projects/streaming.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
      {projects.map((project, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-[#FF5722]/40 hover:shadow-[0_20px_60px_rgba(255,87,34,0.3)]
            ${project.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
            ${project.size === "medium" ? "md:row-span-1" : ""}
            ${project.size === "small" ? "md:col-span-1" : ""}
          `}
        >
          {/* Project Image */}
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
            
            {/* Hover overlay with orange gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/0 to-[#FF6B35]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
          </div>

          {/* Corner accent */}
          <div className="absolute right-0 top-0 z-10 h-20 w-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-l from-[#FF5722] to-transparent" />
            <div className="absolute right-0 top-0 h-12 w-px bg-gradient-to-b from-[#FF5722] to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Category badge */}
            <div className="mb-auto">
              <span className="inline-block rounded-full border border-[#FF5722]/30 bg-[#FF5722]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[#FF5722] group-hover:bg-[#FF5722] group-hover:shadow-[0_0_20px_rgba(255,87,34,0.6)]">
                {project.category}
              </span>
            </div>

            {/* Content */}
            <div className="mt-auto">
              <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-white mb-2 drop-shadow-lg">
                {project.title}
              </h3>
              <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-white drop-shadow-md">
                {project.description}
              </p>

              {/* Gradient line */}
              <div className="mt-4 h-px w-full bg-gradient-to-r from-[#FF5722]/60 via-[#FF5722]/30 to-transparent transition-all duration-500 group-hover:from-[#FF5722] group-hover:via-[#FF6B35] group-hover:to-[#FF5722]/60" />
            </div>
          </div>

          {/* View Project indicator on hover */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full border-2 border-white bg-white/10 px-6 py-3 backdrop-blur-sm">
              <span className="font-semibold text-white">View Project →</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
