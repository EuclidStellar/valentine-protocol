import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const PromiseDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [pos, setPos] = useState({ x: 0, y: 0 }); // Grid position
    const [won, setWon] = useState(false);

    // 7x7 Grid for better layout
    const GRID_SIZE = 7;
    const GRID_MAP = [
        2, 0, 0, 1, 0, 0, 3,
        0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 0, 1,
        0, 0, 0, 0, 0, 0, 0
    ];

    const getCell = (x, y) => GRID_MAP[y * GRID_SIZE + x];

    const handleMove = (dx, dy) => {
        if (won) return;

        setPos(prev => {
            const nextX = prev.x + dx;
            const nextY = prev.y + dy;

            if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) return prev;
            if (getCell(nextX, nextY) === 1) return prev; 

            if (getCell(nextX, nextY) === 3) {
                if (!won) {
                    setWon(true);
                    if (!hasKeepsake('star_key')) {
                         setTimeout(() => addKeepsake('star_key', 'Star Key', '🗝️'), 1000);
                    }
                }
            }
            return { x: nextX, y: nextY };
        });
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
             <audio src={config.music.promise} autoPlay loop hidden />
             <div className="bg-[#26233a] px-6 py-2 border-2 border-[#eb6f92] shadow-lg">
                 <h3 className="text-sm text-[#eb6f92] tracking-widest">{config.messages.promise.title.toUpperCase()}</h3>
             </div>

             {/* Game Board */}
             <div className="relative bg-[#0f172a] border-4 border-[#312e81] p-2 shadow-2xl rounded-sm">
                 <div className="grid grid-cols-7 gap-1">
                     {GRID_MAP.map((type, i) => (
                         <div 
                            key={i} 
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm
                                ${type === 1 ? 'bg-[#334155] rounded-sm' : 'bg-[#1e293b]/30'}
                                ${type === 2 ? 'bg-green-900/50' : ''}
                                ${type === 3 ? 'bg-indigo-900/50' : ''}
                            `}
                         >
                             {type === 1 && ''} 
                             {type === 2 && '🏁'}
                             {type === 3 && <span className="animate-pulse">⭐</span>}
                         </div>
                     ))}
                 </div>

                 {/* Player */}
                 <motion.div 
                    className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center pointer-events-none"
                    animate={{ 
                        x: pos.x * (window.innerWidth < 768 ? 36 : 44), // Approximate spacing
                        y: pos.y * (window.innerWidth < 768 ? 36 : 44)
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 >
                     <div className="text-xl drop-shadow-[0_0_8px_cyan]">🚀</div>
                 </motion.div>
             </div>

             {/* Controls */}
             <div className="grid grid-cols-3 gap-2">
                 <div />
                 <button onClick={() => handleMove(0, -1)} className="w-12 h-12 bg-[#334155] border-b-4 border-slate-700 rounded active:border-b-0 active:translate-y-1 text-xl shadow-md">⬆️</button>
                 <div />
                 <button onClick={() => handleMove(-1, 0)} className="w-12 h-12 bg-[#334155] border-b-4 border-slate-700 rounded active:border-b-0 active:translate-y-1 text-xl shadow-md">⬅️</button>
                 <button onClick={() => handleMove(0, 1)} className="w-12 h-12 bg-[#334155] border-b-4 border-slate-700 rounded active:border-b-0 active:translate-y-1 text-xl shadow-md">⬇️</button>
                 <button onClick={() => handleMove(1, 0)} className="w-12 h-12 bg-[#334155] border-b-4 border-slate-700 rounded active:border-b-0 active:translate-y-1 text-xl shadow-md">➡️</button>
             </div>

             {won && (
                 <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                 > 
                     <div className="bg-[#191724] border-4 border-[#6366f1] p-8 text-center shadow-[0_0_50px_rgba(99,102,241,0.5)]">
                         <div className="text-6xl mb-4">✨</div>
                         <h2 className="text-[#6366f1] mb-2 font-bold text-xl">CONNECTED!</h2>
                         <div className="text-5xl animate-bounce my-4">🗝️</div>
                         <p className="text-xs text-[#e0def4]">"{config.messages.promise.success}"</p>
                         <button onClick={() => setWon(false)} className="mt-6 text-xs text-gray-400 underline">Close</button>
                     </div>
                 </motion.div>
             )}
        </div>
    );
};

export default PromiseDay;
