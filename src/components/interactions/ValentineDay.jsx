import React, { useState } from 'react';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../config';

const ValentineDay = () => {
    const { keepsakes } = useKeepsakes();
    const [vaultOpen, setVaultOpen] = useState(false);

    const TOTAL_KEYS = 7;

    const handleUnlock = () => {
        if (keepsakes.length >= 0) { 
             setVaultOpen(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full relative">
            {/* Audio maintained at top level to persist across state changes */}
            <audio src={config.music.valentine} autoPlay loop hidden />

            <AnimatePresence mode="wait">
                {vaultOpen ? (
                     <motion.div 
                        key="letter"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl bg-[#191724] border-4 border-[#eb6f92] p-6 md:p-12 text-center shadow-[0_0_50px_rgba(235,111,146,0.3)] relative overflow-hidden"
                    >
                        {/* Decorative Corner Flourishes */}
                        <div className="absolute top-2 left-2 text-4xl text-[#eb6f92]/20">❦</div>
                        <div className="absolute top-2 right-2 text-4xl text-[#eb6f92]/20 transform scale-x-[-1]">❦</div>
                        <div className="absolute bottom-2 left-2 text-4xl text-[#eb6f92]/20 transform scale-y-[-1]">❦</div>
                        <div className="absolute bottom-2 right-2 text-4xl text-[#eb6f92]/20 transform scale-[-1]">❦</div>

                        <div className="text-6xl mb-6 animate-pulse">💝</div>
                        
                        <h1 className="text-2xl md:text-3xl text-[#eb6f92] mb-8 font-serif italic">
                            My Dearest {config.person.name},
                        </h1>
                        
                        <div className="space-y-6 text-[#e0def4] text-sm md:text-base leading-loose font-serif italic tracking-wide">
                            <pre className="font-serif whitespace-pre-line text-wrap">
                                {config.messages.valentine.letter}
                            </pre>
                        </div>

                        <div className="mt-12 bg-[#26233a] p-4 border border-[#eb6f92] inline-block transform -rotate-1 shadow-lg">
                            <p className="text-xs text-[#908caa] uppercase tracking-widest mb-2 font-sans">System Message</p>
                            <p className="text-[#eb6f92] text-xl font-bold font-sans">HAPPY VALENTINE'S DAY ❤️</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="vault"
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center gap-8 w-full"
                    >
                        <div className="text-center space-y-2">
                            <h3 className="text-xl text-[#eb6f92]">THE HEART VAULT</h3>
                            <p className="text-xs text-[#908caa]">INSERT 7 KEYS TO UNLOCK</p>
                        </div>

                        {/* The Vault Visual */}
                        <div className="relative w-64 h-64 bg-[#26233a] border-8 border-[#575279] rounded-xl flex items-center justify-center shadow-2xl">
                            {/* Keyhole */}
                            <div className="text-8xl text-black drop-shadow-lg">🔒</div>
                            
                            {/* Status Lights */}
                            <div className="absolute top-2 left-2 right-2 flex justify-between px-2">
                                {Array.from({ length: TOTAL_KEYS }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-3 h-3 rounded-full border border-black ${i < keepsakes.length ? 'bg-green-400 shadow-[0_0_5px_lime]' : 'bg-red-900'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={handleUnlock}
                            disabled={keepsakes.length < 1} 
                            className={`
                                px-8 py-4 text-xl font-bold border-b-8 active:border-b-0 active:translate-y-2 transition-all
                                ${keepsakes.length >= 0 ? 'bg-[#eb6f92] text-[#191724] border-[#9f1239] animate-pulse' : 'bg-gray-600 text-gray-400 border-gray-800 cursor-not-allowed'}
                            `}
                        >
                            {keepsakes.length >= 7 ? "OPEN VAULT" : `${keepsakes.length}/7 KEYS`} 
                        </button>
                        
                        {keepsakes.length < 7 && (
                            <p className="text-[10px] text-red-400">MISSING KEYS! CHECK PREVIOUS DAYS.</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValentineDay;
