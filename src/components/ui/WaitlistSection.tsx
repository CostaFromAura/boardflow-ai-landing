"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Modal de sucesso com glassmorphism
function SuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-4"
      style={{ backdropFilter: "blur(20px) saturate(180%)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full transform transition-all duration-500 scale-100 rounded-3xl"
        style={{
          background: "rgba(15, 15, 15, 0.85)",
          backdropFilter: "blur(40px) saturate(200%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        />

        <div className="relative z-10 p-8 text-center rounded-3xl">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div
              className="absolute inset-0 rounded-full opacity-60 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: "rgba(147, 51, 234, 0.2)",
                border: "1px solid rgba(147, 51, 234, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg
                className="w-10 h-10 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-purple-400 text-3xl font-bold mb-4 tracking-wide">
            Success!
          </h2>
          <p className="text-gray-200 mb-2 leading-relaxed text-lg">
            You've been added to our waitlist! 🚀
          </p>
          <p className="text-gray-400 text-sm mb-8">
            We'll notify you when BoardFlow is ready.
          </p>

          <button
            onClick={onClose}
            className="relative w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 group overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(126, 34, 206, 0.8) 100%)",
              border: "1px solid rgba(147, 51, 234, 0.3)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(147, 51, 234, 0.3)",
            }}
          >
            <span className="relative z-10">Awesome!</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(126, 34, 206, 0.9) 100%)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WaitlistSection({
  sharedEmail,
}: {
  sharedEmail: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referral: "",
    role: "",
  });

  useEffect(() => {
    if (sharedEmail) {
      setFormData((prev) => ({ ...prev, email: sharedEmail }));
    }
  }, [sharedEmail]);

  const [loading, setLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ envia todos os dados
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessModalOpen(true);
        setFormData({ name: "", email: "", referral: "", role: "" });
      } else {
        alert(`Error: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Network error occurred";
      alert(`Network error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />

      <section className="bg-black text-white w-full relative">
        <div className="grid md:grid-cols-2 gap-12 py-24">
          <div className="space-y-6 px-6 max-w-lg w-full mx-auto flex flex-col justify-center">
            <Image
              src="/boardflowlogo.svg"
              alt="BoardFlow Logo"
              width={90}
              height={90}
            />

            <h2 className="text-2xl md:text-3xl lg:text-5xl leading-snug whitespace-nowrap">
              <span className="font-medium">Subscribe to </span>
              <span className="font-bold text-white">BoardFlow.ai</span>
            </h2>

            <p className="text-gray-300 text-lg">
              Be the first to explore a smarter whiteboard. We're selecting early
              users to test <strong>BoardFlow</strong> and help shape its future.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-black border-white/20 text-white placeholder:text-white/40"
                required
              />
              <Input
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-black border-white/20 text-white placeholder:text-white/40"
                required
              />

              <select
                name="referral"
                value={formData.referral}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    referral: e.target.value,
                  }))
                }
                className="bg-black border border-white/20 text-white placeholder:text-white/40 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">How did you discover us?</option>
                <option value="Twitter / X">Twitter / X</option>
                <option value="Reddit">Reddit</option>
                <option value="Discord">Discord</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Product Hunt">Product Hunt</option>
                <option value="Friend Referral">Friend Referral</option>
                <option value="Other">Other</option>
              </select>

              <Input
                name="role"
                placeholder="What do you do? (e.g. Student, Product Manager)"
                value={formData.role}
                onChange={handleChange}
                className="bg-black border-white/20 text-white placeholder:text-white/40"
              />

              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full text-white font-semibold py-3 px-6 rounded-full text-base mt-4"
              >
                {loading ? "Sending..." : "Get Early Access"}
              </Button>
            </form>
          </div>

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
    </>
  );
}
