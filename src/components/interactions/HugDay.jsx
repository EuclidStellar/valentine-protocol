import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const HugDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [charge, setCharge] = useState(0); // 0 to 100
    const [isHolding, setIsHolding] = useState(false);
    
    useEffect(() => {
        let interval;
        if (isHolding && charge < 100) {
            interval = setInterval(() => {
                setCharge(c => Math.min(100, c + 2));
            }, 50); // Fills in ~2.5 seconds
        } else if (!isHolding && charge > 0 && charge < 100) {
            interval = setInterval(() => {
                setCharge(c => Math.max(0, c - 5));
            }, 50); // Decays quickly if released
        }
        return () => clearInterval(interval);
    }, [isHolding, charge]);

    useEffect(() => {
        if (charge >= 100 && !hasKeepsake('hug_key')) {
             setTimeout(() => addKeepsake('hug_key', 'Hug Key', '🗝️'), 500);
        }
    }, [charge, hasKeepsake, addKeepsake]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
            <audio src={config.music.hug} autoPlay loop hidden />
            <div className="bg-[#26233a] border-y-4 border-[#e11d48] w-full text-center py-4">
                 <h2 className="text-[#e11d48] text-lg mb-1">{config.messages.hug.title.toUpperCase()}</h2>
                 <p className="text-[10px] text-[#908caa]">HOLD THE BUTTON TO SEND A LONG HUG</p>
            </div>

            {/* Visual Feedback - Expanding Heart */}
            <div className="relative w-48 h-48 flex items-center justify-center">
                 {/* Background Pulse */}
                 <motion.div 
                    animate={{ scale: isHolding ? 1.2 : 1, opacity: isHolding ? 0.5 : 0.2 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-[#e11d48] rounded-full blur-xl"
                 />
                 
                 {/* Filling Heart */}
                 <div className="relative z-10 text-9xl">
                     <span className="text-[#26233a]">🤍</span> {/* Empty base */}
                     <div 
                        className="absolute bottom-0 left-0 right-0 overflow-hidden text-[#e11d48] transition-all duration-100 ease-linear"
                        style={{ height: `${charge}%` }}
                     >
                         🤍
                     </div>
                 </div>
                 
                 {/* Simplified Circle Fill if Text Clipping is hard in pure React/Tailwind without SVG */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                     <mask id="heartMask">
                         <path d="M50 90 C10 60 -10 30 20 10 C40 -5 50 20 50 20 C50 20 60 -5 80 10 C110 30 90 60 50 90 Z" fill="white" />
                     </mask>
                     <rect x="0" y={100 - charge} width="100" height="100" fill="#e11d48" mask="url(#heartMask)" />
                     <path d="M50 90 C10 60 -10 30 20 10 C40 -5 50 20 50 20 C50 20 60 -5 80 10 C110 30 90 60 50 90 Z" fill="none" stroke="#e11d48" strokeWidth="2" />
                 </svg>
            </div>

            {/* Interaction Button */}
            <button 
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={(e) => { e.preventDefault(); setIsHolding(true); }}
                onTouchEnd={(e) => { e.preventDefault(); setIsHolding(false); }}
                className={`
                    w-full py-4 text-xl font-bold border-4 transition-all
                    ${charge >= 100 
                        ? 'bg-green-500 border-green-700 text-[#191724] cursor-default' 
                        : 'bg-[#191724] border-[#e11d48] text-[#e11d48] active:bg-[#e11d48] active:text-white'}
                `}
            >
                {charge >= 100 ? "HUG SENT!" : (isHolding ? "HOLDING..." : "HOLD TO HUG")}
            </button>

             {charge >= 100 && (
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-2 text-center"
                 >
                     <div className="text-4xl animate-bounce">🗝️</div>
                     <p className="text-xs text-[#e0def4] mt-2">"{config.messages.hug.success}"</p>
                 </motion.div>
             )}
        </div>
    );
};

export default HugDay;
