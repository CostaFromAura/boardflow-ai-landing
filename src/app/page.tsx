"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeaturesSection from "@/components/ui/FeaturesSection";
import PinnedFAQSection from "@/components/ui/PinnedFAQSection";
import WaitlistSection from "@/components/ui/WaitlistSection";
import CleanFooter from "@/components/ui/CleanFooter";

export default function LandingPage() {
  const [sharedEmail, setSharedEmail] = useState("");

  return (
    <div className="min-h-screen bg-black text-white w-full scroll-smooth">
      {/* Header */}
      <header>
        <div className="w-full px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center -space-x-1">
              <Image 
                src="/boardflowlogo.svg" 
                alt="BoardFlow.ai Logo" 
                width={48} 
                height={48}
                className="w-12 h-12"
              />
              <span className="text-xl font-bold">BoardFlow.ai</span>
            </div>

            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="#features" className="text-gray-300 hover:text-white font-medium">Features</a>
              <a href="#ipad" className="text-gray-300 hover:text-white font-medium">Demo</a>
              <a href="#faq" className="text-gray-300 hover:text-white font-medium">FAQ</a>
              <a href="#waitlist" className="text-gray-300 hover:text-white font-medium">Waitlist</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white font-semibold">
                Download
              </Button>
              <Button className="bg-[#1A1A1A] hover:bg-blue-700 font-semibold">
                Try for free
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full px-6 py-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <Image
              src="/buildingbadge.svg"
              alt="Building phase"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-center">
            Capture your thinking.<br />
            Watch it{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-r from-blue-700 to-purple-600 px-2 transform"></span>
              <span className="relative text-white font-bold">
                evolve
              </span>
            </span>{" "}
            with AI.
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            An intelligent whiteboard that helps you think, learn, and connect ideas.
          </p>

          {/* Email Signup */}
          <div className="flex justify-center items-center max-w-md mx-auto">
            <div className="relative w-full bg-gray-900 border border-gray-700 rounded-full p-1">
              <Input
                type="email"
                placeholder="Your Email..."
                value={sharedEmail}
                onChange={(e) => setSharedEmail(e.target.value)}
                className="bg-transparent border-0 text-white placeholder-gray-400 pr-24 rounded-full focus:ring-0 focus:outline-none"
              />
              <a href="#waitlist">
                <Button className="absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold rounded-full px-6 py-2">
                  Waitlist
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Demo Screenshot */}
        <div id="demo" className="w-full mt-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <Image
              src="/demo-screenshot.svg"
              alt="BoardFlow.ai interface showing MVP Planning Board with tasks and roadmap"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div id="features" className="container mx-auto mt-14 px-6">
          <FeaturesSection />
        </div>

        {/* iPad */}
        <div id="ipad" className="w-full mt-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="flex justify-center">
              <Image
                src="/ipad.svg"
                alt="BoardFlow.ai Calculus Board Screenshot"
                width={1200}
                height={800}
                className="w-full h-auto max-w-7xl rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-14">
          <PinnedFAQSection />
        </div>

        {/* Waitlist */}
        <div id="waitlist" className="mt-14">
          <WaitlistSection sharedEmail={sharedEmail} />
        </div>

        {/* Footer */}
        <div className="mt-10">
          <CleanFooter />
        </div>
      </main>
    </div>
  );
}
