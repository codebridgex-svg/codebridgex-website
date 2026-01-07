"use client";

import { useEffect, useRef } from "react";

type Testimonial = {
  name: string;
  handle: string;
  avatar: string;
  comment: string;
  verified: boolean;
};

export default function MasonryTestimonials() {
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      handle: "@priyasharma",
      avatar: "PS",
      comment: "CodeBridgeX delivered our e-commerce platform ahead of schedule. The attention to detail and code quality is exceptional! 🚀",
      verified: true,
    },
    {
      name: "Arjun Patel",
      handle: "@arjunpatel",
      avatar: "AP",
      comment: "Working with this team was amazing. They transformed our outdated system into a modern, scalable solution.",
      verified: true,
    },
    {
      name: "Ananya Gupta",
      handle: "@ananyagupta",
      avatar: "AG",
      comment: "Best development experience I've had. Professional, communicative, and delivered exactly what we needed. Highly recommend! 💯",
      verified: true,
    },
    {
      name: "Rohan Kumar",
      handle: "@rohankumar",
      avatar: "RK",
      comment: "The AI integration they built for us is mind-blowing. Our productivity increased by 300%.",
      verified: true,
    },
    {
      name: "Sneha Reddy",
      handle: "@snehareddy",
      avatar: "SR",
      comment: "From concept to deployment, the process was smooth. The final product exceeded our expectations in every way. 🎯",
      verified: true,
    },
    {
      name: "Vikram Singh",
      handle: "@vikramsingh",
      avatar: "VS",
      comment: "Incredible work on our mobile app. The UI is beautiful and the performance is lightning fast!",
      verified: true,
    },
    {
      name: "Kavya Iyer",
      handle: "@kavyaiyer",
      avatar: "KI",
      comment: "They took our complex requirements and turned them into an elegant solution. The dashboard they built is a game-changer. ⚡",
      verified: true,
    },
    {
      name: "Aditya Verma",
      handle: "@adityaverma",
      avatar: "AV",
      comment: "Professional team that truly cares about their clients. The ongoing support has been fantastic as well.",
      verified: true,
    },
    {
      name: "Meera Desai",
      handle: "@meeradesai",
      avatar: "MD",
      comment: "So happy to see @CodeBridgeX work being recognized! 🔥 His work is literally a treasure trove for devs 💎",
      verified: true,
    },
    {
      name: "Karan Mehta",
      handle: "@karanmehta",
      avatar: "KM",
      comment: "There are level to this things. Congratulations @CodeBridgeX! 👏",
      verified: false,
    },
    {
      name: "Riya Joshi",
      handle: "@riyajoshi",
      avatar: "RJ",
      comment: "Well done team! You rock 🚀",
      verified: true,
    },
    {
      name: "Ishaan Kapoor",
      handle: "@ishaankapoor",
      avatar: "IK",
      comment: "I do highly recommend checking out CodeBridgeX. It's greaaaaat!",
      verified: true,
    },
  ];

  // Generate vibrant gradients for avatars
  const getGradientColors = (index: number): string => {
    const gradients = [
      "#FF5722, #FF6B35", // Orange
      "#E91E63, #F06292", // Pink
      "#9C27B0, #BA68C8", // Purple
      "#3F51B5, #5C6BC0", // Indigo
      "#00BCD4, #4DD0E1", // Cyan
      "#4CAF50, #81C784", // Green
      "#FF9800, #FFB74D", // Amber
      "#F44336, #EF5350", // Red
      "#607D8B, #90A4AE", // Blue Grey
      "#795548, #A1887F", // Brown
      "#FF6F00, #FFA726", // Deep Orange
      "#1976D2, #42A5F5", // Blue
    ];
    return gradients[index % gradients.length];
  };

  // Auto-scroll effect for each column
  useEffect(() => {
    const scrollColumn = (ref: React.RefObject<HTMLDivElement | null>, speed: number) => {
      const container = ref.current;
      if (!container) return;

      let animationFrameId: number;
      let isPaused = false;

      const scroll = () => {
        if (!isPaused && container) {
          container.scrollTop += speed;
          
          // Reset scroll for infinite loop
          if (container.scrollTop >= container.scrollHeight / 2) {
            container.scrollTop = 0;
          }
        }
        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);

      // Pause on hover
      container.addEventListener("mouseenter", () => {
        isPaused = true;
      });

      container.addEventListener("mouseleave", () => {
        isPaused = false;
      });

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    };

    // Different speeds for each column for variety
    const cleanup1 = scrollColumn(column1Ref, 0.3);
    const cleanup2 = scrollColumn(column2Ref, 0.4);
    const cleanup3 = scrollColumn(column3Ref, 0.5);

    return () => {
      cleanup1?.();
      cleanup2?.();
      cleanup3?.();
    };
  }, []);

  // Auto-scroll effect for mobile horizontal scroll
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isPaused = false;
    const speed = 0.5; // Adjust speed as needed

    const scroll = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        
        // Reset scroll for infinite loop
        // Since we don't duplicate items for mobile, we'll wrap around
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Pause on touch/hover
    container.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    container.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    container.addEventListener("touchstart", () => {
      isPaused = true;
    });

    container.addEventListener("touchend", () => {
      isPaused = false;
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Split testimonials into 3 columns and duplicate for infinite scroll
  const columns = [
    [...testimonials.filter((_, i) => i % 3 === 0), ...testimonials.filter((_, i) => i % 3 === 0)],
    [...testimonials.filter((_, i) => i % 3 === 1), ...testimonials.filter((_, i) => i % 3 === 1)],
    [...testimonials.filter((_, i) => i % 3 === 2), ...testimonials.filter((_, i) => i % 3 === 2)],
  ];

  const columnRefs = [column1Ref, column2Ref, column3Ref];

  return (
    <>
      {/* Mobile View: Horizontal Scroll */}
      <div 
        ref={mobileScrollRef}
        className="flex md:hidden overflow-x-auto gap-4 pb-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`mobile-${index}`}
            className="flex-shrink-0 w-[85vw] sm:w-[350px] group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full font-bold text-white text-sm shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${getGradientColors(index)})`,
                  }}
                >
                  <span className="relative z-10">{testimonial.avatar}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white/90 text-sm truncate">
                    {testimonial.name}
                  </span>
                  {testimonial.verified && (
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-[#1D9BF0]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="text-xs text-white/50">
                  {testimonial.handle}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Vertical Masonry with Auto-scroll */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            ref={columnRefs[columnIndex]}
            className="flex flex-col gap-4 h-[600px] overflow-hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {column.map((testimonial, index) => {
              const actualIndex = columnIndex + index * 3;
              return (
                <div
                  key={actualIndex}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#FF5722]/40 hover:bg-white/[0.12] hover:shadow-[0_10px_40px_rgba(255,87,34,0.2)]"
                >
                  <div className="flex items-start gap-3">
                    {/* Professional Avatar with gradient */}
                    <div className="flex-shrink-0">
                      <div
                        className="relative flex h-10 w-10 items-center justify-center rounded-full font-bold text-white text-sm shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${getGradientColors(actualIndex)})`,
                        }}
                      >
                        <span className="relative z-10">{testimonial.avatar}</span>
                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {/* Outer ring */}
                        <div className="absolute -inset-1 rounded-full border-2 border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white/90 text-sm transition-colors duration-300 group-hover:text-white truncate">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-[#1D9BF0]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-white/50 transition-colors duration-300 group-hover:text-white/70">
                        {testimonial.handle}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
                        {testimonial.comment}
                      </p>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#FF5722]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
