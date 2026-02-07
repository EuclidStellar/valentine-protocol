import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const TeddyDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [clawPos, setClawPos] = useState(50); // 0 to 100%
    const [dropping, setDropping] = useState(false);
    const [caught, setCaught] = useState(false);
    const [missed, setMissed] = useState(false);

    // Determines if the claw is over the prize
    const PRIZE_POS = 70; // 70% to right
    const TOLERANCE = 15; // Widened tolerance

    const moveClaw = (dir) => {
        if (dropping) return;
        setClawPos(prev => Math.max(0, Math.min(100, prev + (dir === 'left' ? -10 : 10))));
        setMissed(false);
    };

    const dropClaw = () => {
        if (dropping) return;
        setDropping(true);
        setMissed(false);

        setTimeout(() => {
            // Check win
            if (Math.abs(clawPos - PRIZE_POS) <= TOLERANCE) {
                setCaught(true);
                if (!hasKeepsake('teddy_key')) {
                    setTimeout(() => addKeepsake('teddy_key', 'Teddy Key', '🗝️'), 1500);
                }
            } else {
                setMissed(true);
            }
            // Reset after animation
            setTimeout(() => setDropping(false), 2000);
        }, 1000); // Time to reach bottom
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md">
            <audio src={config.music.teddy} autoPlay loop hidden />
            {/* Arcade Cabinet Header */}
            <div className="w-full bg-[#f43f5e] text-white text-center p-2 rounded-t-lg border-x-4 border-t-4 border-[#881337] shadow-lg">
                <h2 className="text-xl font-bold tracking-widest drop-shadow-md">{config.messages.teddy.title}</h2>
            </div>
            
            {/* Machine Window */}
            <div className="relative w-full h-[300px] bg-[#26233a] border-x-4 border-[#881337] overflow-hidden">
                {/* Claw */}
                <motion.div 
                    className="absolute top-0 w-8 h-8 bg-gray-400 flex justify-center z-10"
                    animate={{ 
                        left: `${clawPos}%`,
                        y: dropping ? (caught ? 150 : 200) : 0 
                    }}
                    transition={{ duration: dropping ? 1 : 0.2 }}
                >
                    <div className="w-1 h-[200px] bg-gray-600 absolute -top-[190px]"></div>
                    <div className="text-2xl absolute -bottom-4">🧲</div>
                    
                    {/* Caught Prize */}
                    {caught && <div className="absolute top-6 text-4xl">🧸</div>}
                </motion.div>

                {/* Prizes at bottom */}
                <div className="absolute bottom-4 flex justify-around w-full px-4">
                    <div className="text-4xl opacity-50">🤖</div>
                    <div className="text-4xl opacity-50">👾</div>
                    {/* The Target */}
                    {!caught && (
                        <div className="absolute bottom-0 text-4xl animate-bounce" style={{ left: `${PRIZE_POS}%` }}>
                            🧸
                        </div>
                    )}
                    <div className="text-4xl opacity-50">🎮</div>
                </div>
            </div>

            {/* Controls Dashboard */}
            <div className="w-full bg-[#881337] p-6 rounded-b-lg border-b-8 border-[#bef264]/20 flex justify-center gap-8 items-center border-x-4 border-[#881337]">
                
                {/* Joystick D-Pad */}
                <div className="flex gap-2">
                    <button 
                        onClick={() => moveClaw('left')}
                        className="w-12 h-12 bg-[#bef264] border-b-4 border-green-700 rounded flex items-center justify-center active:border-b-0 active:translate-y-1 shadow-md"
                    >
                        ⬅️
                    </button>
                    <button 
                         onClick={() => moveClaw('right')}
                        className="w-12 h-12 bg-[#bef264] border-b-4 border-green-700 rounded flex items-center justify-center active:border-b-0 active:translate-y-1 shadow-md"
                    >
                        ➡️
                    </button>
                </div>

                {/* Action Button */}
                <button 
                    onClick={dropClaw}
                    disabled={dropping}
                    className="w-20 h-20 rounded-full bg-red-600 border-b-8 border-red-900 active:border-b-0 active:translate-y-2 flex items-center justify-center text-white font-bold shadow-xl"
                >
                    DROP
                </button>
            </div>

            {/* Win Message */}
            {caught && !dropping && (
                 <div className="mt-4 text-[#eb6f92] text-xs text-center border-2 border-[#eb6f92] p-2 bg-[#191724]">
                     KEY ACQUIRED! <br/>
                     "{config.messages.teddy.success}"
                 </div>
            )}
            
            {/* Missed Message */}
            {missed && !dropping && !caught && (
                <div className="mt-4 text-[#908caa] text-xs text-center animate-pulse">
                    MISSED! TRY AGAIN.
                </div>
            )}
        </div>
    );
};

export default TeddyDay;
