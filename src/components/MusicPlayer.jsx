import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX, Music } from 'lucide-react';

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    
    // Placeholder - Replace with actual Romanic/Cute music URL
    // Suggestion: "Perfect" instrumental or any Lo-Fi Love beat
    const [sound] = useState(new Howl({
        src: ['https://actions.google.com/sounds/v1/ambiences/warm_atmosphere.ogg'], // Temporary placeholder
        loop: true,
        volume: 0.5,
        autoplay: false,
        html5: true, // Force HTML5 Audio to allow streaming large files
    }));

    useEffect(() => {
        // Auto-play might be blocked by browsers until interaction
        // So we start as paused and let user toggle, or try to play on first click
        
        return () => {
            sound.unload();
        };
    }, [sound]);

    const togglePlay = () => {
        if (playing) {
            sound.pause();
        } else {
            sound.play();
        }
        setPlaying(!playing);
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-md border border-rose-500/30 p-3 rounded-full flex items-center gap-3 shadow-lg shadow-rose-900/20">
            <button 
                onClick={togglePlay}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${playing ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300'}`}
            >
                <Music size={18} className={playing ? 'animate-spin-slow' : ''} />
            </button>
            
            <div className="flex flex-col pr-2">
                <span className="text-xs font-bold text-rose-200">Our Song</span>
                <span className="text-[10px] text-rose-400">Background Music</span>
            </div>
            
            {/* Volume Toggle could go here if needed */}
        </div>
    );
};

export default MusicPlayer;
