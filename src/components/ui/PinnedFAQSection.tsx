"use client";
import { useEffect, useRef, useState } from "react";
import { HelpCircle, MessageCircle, Shield } from "lucide-react";

export default function PinnedFAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const faqs = [
    {
      icon: HelpCircle,
      question: "How does BoardFlow.ai work?",
      answer:
        "BoardFlow.ai combines the freedom of a traditional whiteboard with the power of artificial intelligence. Simply start drawing, writing, or brainstorming, and our AI will provide contextual suggestions, auto-complete diagrams, and help expand your ideas in real-time. It's like having a creative partner that understands your thinking process.",
    },
    {
      icon: MessageCircle,
      question: "Can I collaborate with my team in real-time?",
      answer:
        "Absolutely! BoardFlow.ai supports seamless real-time collaboration. Invite team members to your boards and watch as everyone's contributions appear instantly. You can see who's working on what, leave comments, and even use our AI to moderate discussions and suggest next steps for your collaborative sessions.",
    },
    {
      icon: Shield,
      question: "Is my data secure and private?",
      answer:
        "Security and privacy are our top priorities. All your boards are encrypted end-to-end, and we never use your private content to train our AI models. You have full control over sharing permissions, and you can export or delete your data at any time. We're SOC 2 compliant and follow industry-standard security practices.",
    },
  ];

  // Detecta se é mobile/tablet
  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 1024); // breakpoint lg do Tailwind
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // No mobile/tablet, reseta transform e não adiciona listener
      if (cardsRef.current) cardsRef.current.style.transform = "none";
      return;
    }

    const container = containerRef.current;
    const cards = cardsRef.current;
    if (!container || !cards) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      const CARD_HEIGHT = windowHeight * 0.8;
      const CARD_SPACING = windowHeight * 0.01;
      const TOTAL_CARD_HEIGHT = CARD_HEIGHT + CARD_SPACING;

      if (containerTop <= 0 && containerTop > -(containerHeight - windowHeight)) {
        const scrollProgress = Math.abs(containerTop) / (containerHeight - windowHeight);
        const smoothProgress = scrollProgress * (faqs.length - 1);
        const translateY = smoothProgress * TOTAL_CARD_HEIGHT;
        cards.style.transform = `translateY(-${translateY}px)`;
      } else if (containerTop > 0) {
        cards.style.transform = `translateY(0px)`;
      } else if (containerTop <= -(containerHeight - windowHeight)) {
        const maxTranslate = (faqs.length - 1) * TOTAL_CARD_HEIGHT;
        cards.style.transform = `translateY(-${maxTranslate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: isMobile ? "auto" : `${(faqs.length - 1) * 100 + 100}vh` }}
    >
      <div className={`sticky top-0 h-screen overflow-hidden ${isMobile ? "relative h-auto overflow-visible" : ""}`}>
        <div className={`flex ${isMobile ? "flex-col" : ""} h-full`}>
          {/* Lado esquerdo fixo - Responsive */}
          <div
            className={`${
              isMobile 
                ? "w-full p-4 sm:p-6 md:p-8" 
                : "w-1/2 p-8 xl:p-12"
            } flex items-center justify-center bg-gradient-to-br from-gray-900 to-black`}
          >
            <div className="max-w-lg w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 leading-tight text-white">
                Questions?
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  We've got answers.
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
                Everything you need to know about BoardFlow.ai and how it can transform your thinking process.
              </p>
            </div>
          </div>

          {/* Lado direito - Cards com scroll controlado - Responsive */}
          <div className={`${
            isMobile 
              ? "w-full h-auto overflow-visible mt-4 px-4 sm:px-6 md:px-8" 
              : "w-1/2 h-full overflow-hidden"
          } relative bg-black`}>
            <div
              ref={cardsRef}
              className="flex flex-col transition-transform duration-300 ease-out"
              style={{ willChange: "transform" }}
            >
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative"
                    style={{
                      height: isMobile ? "auto" : "80vh",
                      marginBottom: isMobile ? "1.5rem" : "1vh",
                    }}
                  >
                    <div className="group w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/95 backdrop-blur-sm text-black p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-700 hover:scale-105 lg:hover:scale-110 shadow-2xl hover:shadow-blue-500/25 border border-gray-200/20">
                      <div className="rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center border-2 border-gray-300 group-hover:border-white mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-all duration-500 bg-white/10 group-hover:bg-white/20">
                        <IconComponent
                          size={isMobile ? 24 : 28}
                          className="text-gray-700 group-hover:text-white transition-colors duration-500"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 lg:mb-6 text-black group-hover:text-white transition-colors duration-500 leading-tight">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-100 transition-colors duration-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}