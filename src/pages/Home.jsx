import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Heart, Map } from 'lucide-react';
import { isDayUnlocked } from '../utils/dateLogic';

import config from '../config';

const REALMS = [
  { id: 0, title: "Rose Realm", icon: "🌹", color: "text-rose-400", desc: "The Digital Greenhouse" },
  { id: 1, title: "Glitch City", icon: "💍", color: "text-amber-400", desc: "A Lovestruck Error" },
  { id: 2, title: "Choco Factory", icon: "🍫", color: "text-amber-700", desc: "Sweet Sorting Station" },
  { id: 3, title: "Teddy Arcade", icon: "🧸", color: "text-pink-400", desc: "The Claw Machine" },
  { id: 4, title: "Star Fields", icon: "⭐", color: "text-indigo-400", desc: "Constellation Path" },
  { id: 5, title: "Sync Station", icon: "💓", color: "text-red-500", desc: "Heartbeat Monitor" },
  { id: 6, title: "Cloud 9", icon: "💋", color: "text-rose-500", desc: "Raining Kisses" },
  { id: 7, title: "Heart Vault", icon: "💝", color: "text-rose-600", desc: "The Final Gift" },
];

const Home = () => {
  const [lockedMessage, setLockedMessage] = useState(null);

  const handleLockedClick = (dayTitle) => {
      setLockedMessage(`LOCKED! Wait for ${dayTitle}.`);
      setTimeout(() => setLockedMessage(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 pb-24 w-full">
      <header className="mt-8 text-center space-y-4">
        <h1 className="text-2xl md:text-4xl text-[#eb6f92] animate-pulse drop-shadow-[2px_2px_0_rgba(0,0,0,1)] font-romantic">
            CHRONICLES OF {config.person.name.toUpperCase()}
        </h1>
        <div className="inline-block bg-[#26233a] border-2 border-[#e0def4] px-4 py-2 text-xs md:text-sm text-[#908caa]">
             LEVEL: VALENTINE'S WEEK
        </div>
      </header>

      {/* Map Container */}
      <div className="relative bg-[#1f1d2e] border-4 border-[#e0def4] p-4 md:p-8 rounded-sm shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          {/* Grid Layout for Realms */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {REALMS.map((realm, index) => {
                  const unlocked = isDayUnlocked(index);
                  
                  return (
                      <div key={index} className="flex flex-col items-center gap-2 relative group">
                          {unlocked ? (
                              <Link 
                                to={`/day/${index}`}
                                className={`
                                    w-20 h-20 md:w-24 md:h-24 bg-[#26233a] border-4 border-[#eb6f92] flex items-center justify-center text-4xl
                                    hover:scale-110 transition-transform cursor-pointer shadow-[4px_4px_0_#eb6f92] active:translate-y-1 active:shadow-none
                                `}
                              >
                                  <span className="animate-bounce">{realm.icon}</span>
                              </Link>
                          ) : (
                              <button 
                                onClick={() => handleLockedClick(realm.title)}
                                className="w-20 h-20 md:w-24 md:h-24 bg-[#191724] border-4 border-[#6e6a86] flex items-center justify-center text-4xl opacity-50 cursor-not-allowed"
                              >
                                  <Lock size={32} className="text-[#6e6a86]" />
                              </button>
                          )}

                          {/* Label */}
                          <div className={`text-[10px] md:text-xs text-center font-bold mt-2 ${unlocked ? realm.color : 'text-[#6e6a86]'}`}>
                              {realm.title}
                          </div>
                      </div>
                  )
              })}
          </div>

          {/* Decorative Map Elements */}
          <div className="absolute top-2 left-2 text-[#e0def4]/20 text-xs">MAP_V1.0</div>
          <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 animate-pulse delay-75"></div>
          </div>
      </div>

      {/* Retro Toast Message */}
      {lockedMessage && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-red-900 text-white px-6 py-4 border-4 border-white z-50 text-xs shadow-[4px_4px_0_black]"
          >
              ⚠️ {lockedMessage}
          </motion.div>
      )}

      {/* Start Button / Call to Action */}
      <div className="text-center mt-4">
           <p className="text-[#908caa] text-xs mb-4">COLLECT ALL 7 KEYS TO UNLOCK THE VAULT</p>
      </div>
    </div>
  );
};

export default Home;
