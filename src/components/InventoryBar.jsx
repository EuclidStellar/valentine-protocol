import React from 'react';
import { useKeepsakes } from '../utils/KeepsakeContext';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryBar = () => {
    const { keepsakes } = useKeepsakes();

    // 7 total slots
    const totalSlots = 7;

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-[#1f1d2e] border-t-4 border-[#eb6f92] p-2 flex justify-center gap-2">
                {Array.from({ length: totalSlots }).map((_, i) => {
                    const item = keepsakes[i] || {}; // Handle potential undefined
                    const collected = i < keepsakes.length;
                    
                    return (
                        <div 
                            key={i} 
                            className={`w-12 h-12 border-2 ${collected ? 'border-[#eb6f92] bg-[#26233a]' : 'border-[#6e6a86] bg-[#191724]'} flex items-center justify-center relative group`}
                        >
                             {collected ? (
                                 <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl cursor-pointer"
                                 >
                                     {item.icon}
                                     {/* Tooltip (Pixel Style) */}
                                     <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-[#191724] text-[#e0def4] text-[10px] px-2 py-1 border-2 border-[#eb6f92] opacity-0 group-hover:opacity-100 transition-none whitespace-nowrap z-50">
                                         {item.name}
                                     </div>
                                 </motion.div>
                             ) : (
                                 <div className="text-[#6e6a86] text-xs font-bold">{i + 1}</div>
                             )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InventoryBar;
