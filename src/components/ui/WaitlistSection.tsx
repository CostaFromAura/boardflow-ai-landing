"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WaitlistSection() {
  return (
    <section className="bg-black text-white w-full">
      <div className="grid md:grid-cols-2 gap-12 py-24">
        {/* Esquerda - Formulário */}
        <div className="space-y-6 px-6 max-w-lg w-full mx-auto flex flex-col justify-center">
          <Image src="/boardflowlogo.svg" alt="BoardFlow Logo" width={90} height={90} />

          <h2 className="text-2xl md:text-3xl lg:text-5xl leading-snug whitespace-nowrap">
            <span className="font-medium">Subscribe to </span>
            <span className="font-bold text-white">BoardFlow.ai</span>
          </h2>

          <p className="text-gray-300 text-lg">
            Be the first to explore a smarter whiteboard. We’re selecting early users to test <strong>BoardFlow</strong> and help shape its future.
          </p>

          <form className="space-y-4">
            <Input
              placeholder="Enter your name"
              className="bg-black border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="Enter your email"
              type="email"
              className="bg-black border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="We’re curious — how did you discover us?"
              className="bg-black border-white/20 text-white placeholder:text-white/40"
            />
            <Input
              placeholder="What do you do? (e.g. Student, Product Manager, UX Designer, Developer)"
              className="bg-black border-white/20 text-white placeholder:text-white/40"
            />

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full text-white font-semibold py-3 px-6 rounded-full text-base mt-4"
            >
              Get Early Access
            </Button>
          </form>
        </div>

        {/* Direita - Mockup */}
        <div className="relative w-full">
          <Image
            src="/boardflow-beta-mockup.svg"
            alt="BoardFlow mockup"
            width={800}
            height={600}
            className="w-full max-h-[800px] rounded-none md:rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
