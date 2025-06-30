"use client";
import { useEffect, useRef } from "react";
import {
  Brain,
  Edit,
  Users,
  BookOpen,
  Settings,
  Repeat,
  Puzzle,
  Search,
  Folder,
  Clock,
  Globe,
  Target,
  Upload,
} from "lucide-react";

export default function FeaturesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let currentSpeed = 1;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += currentSpeed;

        const resetPoint = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= resetPoint) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    // desacelera, mas não para
    const handleMouseEnter = () => {
      currentSpeed = 0.2;
    };

    const handleMouseLeave = () => {
      currentSpeed = 1;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    scroll(); // inicia scroll (sem parar mais)

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const iconMap = {
    brain: Brain,
    edit: Edit,
    users: Users,
    bookOpen: BookOpen,
    settings: Settings,
    repeat: Repeat,
    puzzle: Puzzle,
    search: Search,
    folder: Folder,
    clock: Clock,
    globe: Globe,
    target: Target,
    upload: Upload,
  };

  type IconKey = keyof typeof iconMap;

  const features: { icon: IconKey; title: string; desc: string }[] = [
    { icon: "brain", title: "AI-Powered Insights", desc: "Let AI expand your ideas with smart suggestions, definitions, and learning prompts." },
    { icon: "edit", title: "Freeform Visual Editor", desc: "Draw, write, connect — design your thinking space with total freedom." },
    { icon: "users", title: "Real-Time Collaboration", desc: "Invite your team to co-create boards live and sync effortlessly." },
    { icon: "bookOpen", title: "Learning Mode", desc: "Activate study mode to turn boards into quizzes and flashcards." },
    { icon: "settings", title: "Smart Templates", desc: "Start fast with AI-assisted templates for brainstorming and planning." },
    { icon: "repeat", title: "AI-Autocomplete Diagrams", desc: "Start a flow and let AI help complete it with logical steps and connections." },
    { icon: "puzzle", title: "Smart Blocks", desc: "Quickly insert intelligent components like sticky notes and checklists." },
    { icon: "search", title: "Context-Aware Suggestions", desc: "AI reads your board and offers relevant insights or next steps in real time." },
    { icon: "folder", title: "Multi-Format Support", desc: "Combine text, sketches, images, and code — all in one seamless canvas." },
    { icon: "clock", title: "Infinite History & Undo", desc: "Explore every version of your thinking process and roll back anytime." },
    { icon: "globe", title: "Cross-Device Sync", desc: "Access your boards on desktop, tablet, or mobile — always up to date." },
    { icon: "target", title: "Focus Mode", desc: "Declutter your view, highlight what's important, and stay in the zone." },
    { icon: "upload", title: "Export & Share", desc: "Download boards as PDF or PNG or share them instantly with a public link." },
  ];

  const duplicatedFeatures = [...features, ...features, ...features];

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="text-left mb-16 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
          Think visually. Learn Smarter.
          <br />
          Create your board with AI.
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl">
          Collaborate, explore, and ideate with an intelligent whiteboard designed to supercharge your thinking.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-hidden scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", width: "100vw" }}
      >
        {duplicatedFeatures.map((card, i) => {
          const IconComponent = iconMap[card.icon];
          return (
            <div
              key={i}
              className="group flex-shrink-0 w-80 h-[500px] bg-white p-8 text-black hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="rounded-full w-16 h-16 flex items-center justify-center border border-gray-300 group-hover:border-white transition-colors duration-300 flex-shrink-0">
                <IconComponent size={28} className="text-gray-700 group-hover:text-white" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors duration-300 leading-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
