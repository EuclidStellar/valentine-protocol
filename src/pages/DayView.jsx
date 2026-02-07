import React, { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load interactions to keep bundle small
const RoseDay = lazy(() => import('../components/interactions/RoseDay'));
const ProposeDay = lazy(() => import('../components/interactions/ProposeDay'));
const ChocolateDay = lazy(() => import('../components/interactions/ChocolateDay'));
const TeddyDay = lazy(() => import('../components/interactions/TeddyDay'));
const PromiseDay = lazy(() => import('../components/interactions/PromiseDay'));
const HugDay = lazy(() => import('../components/interactions/HugDay'));
const KissDay = lazy(() => import('../components/interactions/KissDay'));
const ValentineDay = lazy(() => import('../components/interactions/ValentineDay'));

const DayView = () => {
  const { dayId } = useParams();
  const dayIndex = parseInt(dayId);

  // Map index to component
  const renderInteraction = () => {
      switch(dayIndex) {
          case 0: return <RoseDay />;
          case 1: return <ProposeDay />;
          case 2: return <ChocolateDay />;
          case 3: return <TeddyDay />;
          case 4: return <PromiseDay />;
          case 5: return <HugDay />;
          case 6: return <KissDay />;
          case 7: return <ValentineDay />;
          default: return <div className="text-rose-300">Coming soon...</div>;
      }
  };

  // Placeholder for loading status or invalid day
  if (isNaN(dayIndex)) return <div>Day not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <div className="p-6 pb-2">
        <Link to="/" className="inline-flex items-center gap-2 text-rose-300 hover:text-rose-100 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Timeline</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
           <h2 className="text-2xl font-bold font-cursive text-rose-400 mb-6">Day {dayIndex + 1}</h2>
           
           <Suspense fallback={<div className="text-rose-400">Loading...</div>}>
               {renderInteraction()}
           </Suspense>
        </motion.div>
      </div>
    </div>
  );
};

export default DayView;
