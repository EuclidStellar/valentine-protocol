import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const RoseDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [waterLevel, setWaterLevel] = useState(0); // 0 to 100
    const [isBlooming, setIsBlooming] = useState(false);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    
    const STAGES = [
        { level: 0, text: "🥀", desc: "A sad, withered rose..." },
        { level: 30, text: "🌱", desc: "It's starting to recover!" },
        { level: 60, text: "🌿", desc: "Leaves are growing back!" },
        { level: 90, text: "🌹", desc: "It's blooming beautifully!" }
    ];

    const currentStage = STAGES.reduce((prev, curr) => waterLevel >= curr.level ? curr : prev, STAGES[0]);

    const handleWater = () => {
        if (waterLevel >= 100) return;
        setWaterLevel(prev => Math.min(prev + 10, 100));
    };

    useEffect(() => {
        if (waterLevel >= 100 && !hasKeepsake('rose_key')) {
            setIsBlooming(true);
            setTimeout(() => addKeepsake('rose_key', 'Rose Key', '🗝️'), 1000);
        }
    }, [waterLevel, hasKeepsake, addKeepsake]);

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md relative">
             <audio 
                ref={audioRef}
                src={config.music.rose}
                autoPlay
                loop
                onError={(e) => {
                    console.error("Audio Error:", e);
                    setError("File load failed. Check src/assets/audio.");
                }}
             />

             {error && (
                 <div className="absolute -top-20 bg-red-500 text-white text-[10px] p-2 rounded animate-bounce z-50">
                     ⚠️ {error}
                 </div>
             )}

             {/* Retro Text Box */}
             <div className="w-full bg-[#26233a] border-4 border-white p-4 relative shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                 <h3 className="text-xl text-[#eb6f92] mb-2">{config.messages.rose.title}</h3>
                 <p className="text-xs text-[#e0def4] leading-relaxed">
                     {waterLevel < 100 
                        ? "This rose is withered. TAP the water button repeatedly to bring it back to life!" 
                        : "It's alive! The data-stream is flowing again."}
                 </p>
                 {/* Blinking Cursor */}
                 <div className="absolute bottom-2 right-2 w-2 h-4 bg-white animate-pulse"></div>
             </div>

             {/* Game Screen */}
             <div className="relative w-64 h-64 bg-[#1f1d2e] border-4 border-[#908caa] flex items-center justify-center overflow-hidden">
                 
                 {/* Scanlines Overlay for screen */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                 <motion.div 
                    className="text-9xl filter drop-shadow-[0_0_10px_rgba(235,111,146,0.5)] z-0 text-center"
                    animate={waterLevel >= 100 ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                    transition={{ repeat: waterLevel >= 100 ? Infinity : 0, duration: 2 }}
                 >
                     {currentStage.text}
                 </motion.div>

                 {/* Water Bar */}
                 <div className="absolute left-2 top-2 bottom-2 w-4 bg-[#26233a] border-2 border-[#908caa]">
                     <div 
                        className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-300"
                        style={{ height: `${waterLevel}%` }}
                     />
                 </div>
             </div>

             {/* Controls */}
             {!isBlooming && (
                 <button 
                    onClick={handleWater}
                    className="group relative inline-flex items-center justify-center p-4 px-8 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#3e8fb0] shadow-[4px_4px_0_#3e8fb0] active:shadow-none active:translate-y-1 bg-[#191724]"
                 >
                     <span className="text-2xl mr-2">💧</span>
                     <span className="text-[#3e8fb0] font-bold text-sm">WATER</span>
                 </button>
             )}

             {/* Reward Modal */}
             {isBlooming && (
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 p-4 bg-[#eb6f92] border-4 border-white text-white text-center shadow-[6px_6px_0_rgba(0,0,0,0.3)]"
                 >
                     <p className="text-sm font-bold mb-2">YOU FOUND A KEY!</p>
                     <div className="text-4xl animate-bounce my-2">🗝️</div>
                     <p className="text-[10px]">"{config.messages.rose.success}"</p>
                 </motion.div>
             )}
        </div>
    );
};

export default RoseDay;
