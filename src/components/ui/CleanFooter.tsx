export default function CleanFooter() {
    return (
      <footer className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Main heading */}
            <h2 className="text-white text-4xl lg:text-5xl font-light leading-tight mb-8">
              Cultivate your thoughts<br />
              shape the future.
            </h2>
            
            {/* Message button */}
            <div className="mb-12">
              <button className="group relative max-w-md mx-auto border border-gray-600 rounded-full px-6 py-3 bg-transparent hover:border-blue-400 transition-colors flex items-center justify-between w-80">
                <span className="text-gray-400 text-left">Send us a message.</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-blue-400 transition-colors">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            {/* Contact info */}
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              <div>
                <h3 className="text-white text-lg font-medium mb-3">Email Us</h3>
                <p className="text-gray-400">hello@timeaura.com.br</p>
              </div>
              
              <div>
                <h3 className="text-white text-lg font-medium mb-3">Follow Us</h3>
                <p className="text-gray-400">@boardflow.ai</p>
              </div>
            </div>
          </div>
          
          {/* Bottom copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 BoardFlow.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }