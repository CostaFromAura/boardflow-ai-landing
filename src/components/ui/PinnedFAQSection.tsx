"use client";
import { useEffect, useRef } from "react";
import { HelpCircle, MessageCircle, Shield } from "lucide-react";

export default function PinnedFAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;
    if (!container || !cards) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      const CARD_HEIGHT = windowHeight * 0.8;
      const CARD_SPACING = windowHeight * 0.01; // 🔽 ainda menor
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${(faqs.length - 1) * 100 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full">
          {/* Lado esquerdo fixo */}
          <div className="w-1/2 flex items-center justify-center p-12 bg-gradient-to-br from-gray-900 to-black">
            <div className="max-w-lg">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white">
                Questions?
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  We've got answers.
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Everything you need to know about BoardFlow.ai and how it can transform your thinking process.
              </p>
            </div>
          </div>

          {/* Lado direito - Cards com scroll controlado */}
          <div className="w-1/2 h-full overflow-hidden relative bg-black">
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
                    className="flex-shrink-0 flex items-center justify-center p-8 relative"
                    style={{
                      height: "80vh",
                      marginBottom: "1vh", // 🔽 distância menor
                    }}
                  >
                    <div className="group max-w-lg bg-white/95 backdrop-blur-sm text-black p-8 rounded-3xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-700 hover:scale-110 shadow-2xl hover:shadow-blue-500/25 border border-gray-200/20">
                      <div className="rounded-full w-16 h-16 flex items-center justify-center border-2 border-gray-300 group-hover:border-white mb-6 group-hover:scale-110 transition-all duration-500 bg-white/10 group-hover:bg-white/20">
                        <IconComponent
                          size={28}
                          className="text-gray-700 group-hover:text-white transition-colors duration-500"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-6 text-black group-hover:text-white transition-colors duration-500 leading-tight">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-100 transition-colors duration-500">
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
