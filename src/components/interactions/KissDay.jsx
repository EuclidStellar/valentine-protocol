import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const KissDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState([]);
    const [gameRunning, setGameRunning] = useState(false);
    
    // Rhythm Game (Simplified Guitar Hero)
    // 4 Columns
    const LANES = [0, 1, 2, 3];

    useEffect(() => {
        if (gameRunning && score < 20) {
            const interval = setInterval(() => {
                setHearts(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        lane: Math.floor(Math.random() * 4),
                        y: 0
                    }
                ]);
            }, 1200); // BPM (Slower)

            const loop = setInterval(() => {
                setHearts(prev => prev.map(h => ({ ...h, y: h.y + 2 })).filter(h => h.y < 120));
            }, 50);

            return () => {
                clearInterval(interval);
                clearInterval(loop);
            };
        }
    }, [gameRunning, score]);

    useEffect(() => {
        if (score >= 20 && !hasKeepsake('kiss_key')) {
             setGameRunning(false);
             addKeepsake('kiss_key', 'Kiss Key', '🗝️');
        }
    }, [score, hasKeepsake, addKeepsake]);

    const handleTap = (lane) => {
        // Check if any heart in this lane is in the "Hit Zone" (80-95%)
        const hit = hearts.find(h => h.lane === lane && h.y > 80 && h.y < 100);
        
        if (hit) {
            setScore(s => s + 1);
            setHearts(prev => prev.filter(h => h.id !== hit.id)); // Remove hit
            // Visual feedback?
        }
    };

    return (
        <div className="relative w-full max-w-md h-[500px] bg-[#1a1b26] border-x-4 border-[#26233a] overflow-hidden flex flex-col">
            <audio src={config.music.kiss} autoPlay loop hidden />
            <div className="text-center p-2 text-[#eb6f92] font-bold">
                SCORE: {score}/20
            </div>

            {/* Track */}
            <div className="flex-1 flex relative border-t-2 border-[#26233a]">
                {LANES.map(lane => (
                    <div key={lane} className="flex-1 border-r-2 border-[#26233a] relative bg-opacity-10 bg-white">
                        {/* Hit Zone Marker */}
                        <div className="absolute bottom-16 left-0 right-0 h-10 border-y-2 border-white/20 bg-white/5"></div>
                    </div>
                ))}

                {/* Falling Hearts */}
                {hearts.map(h => (
                    <div 
                        key={h.id}
                        className="absolute text-2xl transition-none"
                        style={{ 
                            left: `${h.lane * 25 + 5}%`, // 25% width per lane
                            top: `${h.y}%` 
                        }}
                    >
                        💋
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="h-24 flex items-center justify-around bg-[#26233a] pb-4">
                {LANES.map(lane => (
                    <button 
                        key={lane}
                        onMouseDown={() => handleTap(lane)}
                        onTouchStart={(e) => { e.preventDefault(); handleTap(lane); }}
                        className="w-16 h-16 rounded-full bg-[#191724] border-4 border-[#eb6f92] active:bg-[#eb6f92] flex items-center justify-center text-[#eb6f92] active:text-[#191724] font-bold"
                    >
                        {(lane + 1).toString()}
                    </button>
                ))}
            </div>

            {/* Start Overlay */}
            {!gameRunning && score === 0 && (
                <div className="absolute inset-0 z-10 bg-black/80 flex items-center justify-center">
                    <button 
                        onClick={() => setGameRunning(true)}
                        className="px-8 py-4 bg-[#eb6f92] text-[#191724] font-bold border-4 border-white animate-pulse"
                    >
                        START RHYTHM
                    </button>
                </div>
            )}
            
            {/* Win Overlay */}
            {score >= 20 && (
                <div className="absolute inset-0 z-50 bg-[#1a1b26]/90 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-[#eb6f92] text-xl mb-4">{config.messages.kiss.success.toUpperCase()}</h2>
                        <div className="text-6xl animate-bounce">🗝️</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KissDay;
