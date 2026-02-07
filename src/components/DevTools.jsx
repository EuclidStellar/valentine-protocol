import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

const DevTools = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [overrideDay, setOverrideDay] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('debug_day_override');
        if (stored) setOverrideDay(parseInt(stored));
    }, []);

    const handleSetDay = (dayIndex) => {
        if (dayIndex === null) {
            localStorage.removeItem('debug_day_override');
            setOverrideDay(null);
        } else {
            localStorage.setItem('debug_day_override', dayIndex);
            setOverrideDay(dayIndex);
        }
        window.location.reload(); // Refresh to apply changes
    };

    // Only show in dev mode or with a specific key combo (optional)
    // For now, hidden behind a small transparent trigger in bottom-left
    
    return (
        <div className="fixed bottom-4 left-4 z-[100] font-mono text-xs">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 bg-slate-800/50 rounded-full flex items-center justify-center text-rose-500 hover:bg-slate-700 transition"
                title="Dev Tools"
            >
                <Wrench size={14} />
            </button>

            {isOpen && (
                <div className="absolute bottom-10 left-0 bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-xl w-64">
                    <h3 className="text-rose-400 font-bold mb-2">Time Travel</h3>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleSetDay(i)}
                                className={`p-1 rounded ${overrideDay >= i ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                            >
                                Day {i}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => handleSetDay(null)}
                        className="w-full bg-slate-700 text-white py-1 rounded mt-2 hover:bg-slate-600"
                    >
                        Reset to Real Time
                    </button>
                </div>
            )}
        </div>
    );
};

export default DevTools;
