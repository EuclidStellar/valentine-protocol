import React from 'react';
import InventoryBar from './InventoryBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#e0def4] font-pixel overflow-hidden relative crt selection:bg-[#eb6f92] selection:text-[#191724]">
      {/* CRT Effects */}
      <div className="scanlines"></div>
      
      {/* Dynamic Starry Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Nebula/Gradient Base */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3),rgba(15,23,42,0))]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(235,111,146,0.15),transparent_40%)]" />
          
          {/* Stars (Simple CSS Noise + Animation) */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 animate-pulse"></div>
          
          {/* Floating Particles (Hearts/Stars) */}
          <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute text-[#eb6f92] opacity-20 animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontSize: `${Math.random() * 20 + 10}px`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  >
                      {Math.random() > 0.5 ? '✦' : '♥'}
                  </div>
              ))}
          </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-2xl mx-auto min-h-screen flex flex-col items-center pt-8 px-4 pb-32">
        {children}
      </main>

      {/* Retro UI Inventory Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
          <InventoryBar />
      </div>

      {/* Music Player Removed as per request (Per-day audio implementation active) */}

      {/* Dev Tools Removed for Production - Timeline Locked */}
    </div>
  );
};

export default Layout;
