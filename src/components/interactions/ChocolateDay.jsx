import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import config from '../../config';

const ChocolateDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [ingredients, setIngredients] = useState([]);
    const [baked, setBaked] = useState(false);

    // Available Ingredients (Pixel Icons)
    const ITEMS = [
        { id: 'sugar', icon: '🍬', label: 'Sugar', bad: false },
        { id: 'cocoa', icon: '🍫', label: 'Cocoa', bad: false },
        { id: 'love', icon: '❤️', label: 'Love', bad: false },
        { id: 'salt', icon: '🧂', label: 'Salt', bad: true },
        { id: 'milk', icon: '🥛', label: 'Milk', bad: false },
        { id: 'onion', icon: '🧅', label: 'Onion', bad: true },
    ];

    const handleDrop = (e) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData("itemId");
        const item = ITEMS.find(i => i.id === itemId);
        
        if (item) {
            setIngredients(prev => [...prev, item]);
        }
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("itemId", id);
    };

    const handleBake = () => {
        const hasBad = ingredients.some(i => i.bad);
        const hasGood = ingredients.some(i => !i.bad);
        
        if (hasGood && !hasBad) {
            setBaked(true);
            if (!hasKeepsake('choco_key')) {
                setTimeout(() => addKeepsake('choco_key', 'Choco Key', '🗝️'), 1000);
            }
        } else {
            // Shake effect or error message
            alert("Yuck! Something smells wrong... (Only sweet things!)");
            setIngredients([]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg gap-6">
            <audio src={config.music.chocolate} autoPlay loop hidden />
            <div className="p-4 bg-[#26233a] border-4 border-[#d97706] text-center shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
                <h2 className="text-[#d97706] text-lg mb-2">{config.person.name.toUpperCase()}'S PATISSERIE</h2>
                <p className="text-[10px] text-[#908caa]">Drag sweet ingredients into the bowl!</p>
            </div>

            <div className="flex gap-8 items-end">
                {/* The Bowl */}
                <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="w-40 h-32 bg-[#e0def4] border-4 border-[#908caa] rounded-b-full flex items-center justify-center flex-col relative"
                >
                    <div className="text-[10px] text-[#908caa] absolute top-2">MIXING BOWL</div>
                    <div className="flex flex-wrap gap-1 justify-center max-w-[80%]">
                        {ingredients.map((ing, i) => (
                            <span key={i} className="text-lg">{ing.icon}</span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleBake}
                    className="bg-[#d97706] text-white px-4 py-2 border-b-4 border-[#92400e] active:border-b-0 active:translate-y-1 font-bold h-12"
                >
                    BAKE!
                </button>
            </div>

            {/* Ingredient Shelf */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 bg-[#1f1d2e] p-4 rounded border-2 border-[#6e6a86]">
                {ITEMS.map(item => (
                    <div 
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        className="w-12 h-12 bg-[#26233a] border-2 border-[#eb6f92] flex items-center justify-center text-2xl cursor-grab hover:bg-[#eb6f92] hover:text-[#191724] transition-colors"
                    >
                        {item.icon}
                    </div>
                ))}
            </div>

            {/* Success Reveal */}
            {baked && (
                 <motion.div 
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                 >
                     <div className="bg-[#191724] border-4 border-[#d97706] p-8 text-center max-w-sm">
                         <div className="text-6xl mb-4">🎂</div>
                         <h3 className="text-[#d97706] text-xl mb-4">PERFECTLY BAKED!</h3>
                         <div className="animate-bounce text-4xl mb-4">🗝️</div>
                         <p className="text-xs text-[#908caa]">"{config.messages.chocolate.success}"</p>
                         <button onClick={() => setBaked(false)} className="mt-4 text-xs underline text-white">Close</button>
                     </div>
                 </motion.div>
            )}
        </div>
    );
};

export default ChocolateDay;
