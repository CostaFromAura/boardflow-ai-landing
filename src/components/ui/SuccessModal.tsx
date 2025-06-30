import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-4"
      style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full transform transition-all duration-500 scale-100 rounded-3xl"
        style={{
          background: 'rgba(15, 15, 15, 0.85)',
          backdropFilter: 'blur(40px) saturate(200%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Glassmorphism overlay */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 p-8 text-center rounded-3xl">
          {/* Success Icon with glow */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div 
              className="absolute inset-0 rounded-full opacity-60 animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
            />
            <div 
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(147, 51, 234, 0.2)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                backdropFilter: 'blur(10px)'
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
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(126, 34, 206, 0.8) 100%)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3)'
            }}
          >
            <span className="relative z-10">Awesome!</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(126, 34, 206, 0.9) 100%)'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}