import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKeepsakes } from '../../utils/KeepsakeContext';
import { Download } from 'lucide-react';
import config from '../../config';

const ProposeDay = () => {
    const { addKeepsake, hasKeepsake } = useKeepsakes();
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [yesClicked, setYesClicked] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    // 1. Initialize Camera on Mount (Hidden)
    useEffect(() => {
        const initCamera = async () => {
            try {
                // Request stream immediately
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraReady(true);
                }
                streamRef.current = stream;
            } catch (err) {
                console.warn("Camera permission denied or not available:", err);
            }
        };
        initCamera();

        // Cleanup on unmount
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleNoHover = () => {
        const newX = Math.random() * 200 - 100;
        const newY = Math.random() * 200 - 100;
        setNoBtnPos({ x: newX, y: newY });
    };

    const handleYes = () => {
        if (!hasKeepsake('ring_key')) {
            addKeepsake('ring_key', 'Ring Key', '💍');
        }
        setYesClicked(true);
        
        // 2. Capture Immediately
        if (cameraReady) {
            // Slight delay to capture the "reaction" rather than the click face
            setTimeout(() => {
                captureImage();
            }, 500);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Set canvas size to match video stream
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Add Filters & Overlays
            context.globalCompositeOperation = 'overlay';
            context.fillStyle = '#eb6f92'; // Pinkish retro tint
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Text Stamps
            context.globalCompositeOperation = 'source-over';
            context.font = 'bold 24px monospace';
            context.fillStyle = 'white';
            context.shadowColor = 'black';
            context.shadowBlur = 4;
            context.fillText(new Date().toLocaleDateString(), 30, canvas.height - 30);
            context.fillText("SHE SAID YES!", 30, canvas.height - 60);

            // Convert to Image
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImage(dataUrl);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-lg relative pb-24">
            <audio src={config.music.propose} autoPlay loop hidden />
             {/* Hidden Video Element (Always rendered so it's ready) */}
             <div className="absolute top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
                 <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                />
             </div>
             
             {/* Hidden Processing Canvas */}
             <canvas ref={canvasRef} className="hidden" />

             {/* Background Effects */}
             <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-red-500 animate-pulse hidden md:block"></div>

             {/* Camera Status Indicator */}
             <div className="absolute top-2 right-2 text-[10px] uppercase font-mono tracking-widest z-20">
                 {cameraReady ? (
                     <span className="text-green-500 animate-pulse">● VISUAL LINK ACTIVE</span>
                 ) : (
                     <span className="text-amber-500 animate-pulse blink">⚠ ESTABLISHING UPLINK...</span>
                 )}
             </div>

             {/* Main Dialog */}
             <div className="w-full bg-[#191724] border-4 border-amber-400 p-6 shadow-[8px_8px_0_#d97706] relative z-10 transition-all duration-500">
                 <div className="absolute -top-4 -left-4 bg-amber-400 text-black px-2 py-1 text-xs font-bold transform -rotate-3 border-2 border-white">
                     SYSTEM ALERT
                 </div>
                 
                 <h2 className="text-xl md:text-2xl text-white mb-4 text-center leading-loose">
                     WILL YOU BE MY {config.person.nickname} ?<br/>
                     <span className="text-amber-400">ACCEPT REQUEST ?</span>
                 </h2>

                 {/* Interaction Area */}
                 {!yesClicked ? (
                     <div className="flex justify-center gap-8 h-20 items-center relative">
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleYes();
                            }}
                            className="bg-green-500 text-black px-6 py-3 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 font-bold hover:bg-green-400 transition-colors z-20"
                         >
                             YES
                         </button>

                         <motion.button 
                            animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            onMouseEnter={handleNoHover}
                            className="bg-red-500 text-white px-6 py-3 border-b-4 border-red-800 font-bold"
                         >
                             NO
                         </motion.button>
                     </div>
                 ) : (
                     <div className="text-center text-green-400 py-4">
                         <p className="animate-bounce text-xl">{config.messages.propose.success}</p>
                         <div className="text-4xl my-2">💍</div>
                     </div>
                 )}
             </div>

             {/* Result Reveal */}
             {capturedImage && (
                 <motion.div 
                    initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-4 bg-[#26233a] p-4 border-4 border-white shadow-[0_0_20px_rgba(235,111,146,0.5)] z-20"
                 >
                     <p className="text-[#eb6f92] text-xs font-bold w-full text-center border-b-2 border-[#eb6f92] pb-2 mb-2">
                         MOMENT CAPTURED
                     </p>
                     
                     <img src={capturedImage} alt="The Moment" className="w-full max-w-sm border-2 border-gray-600" />
                     
                     <a 
                        href={capturedImage} 
                        download="our_connection_moment.png"
                        className="flex items-center gap-2 bg-[#d97706] text-white px-6 py-3 border-b-4 border-[#92400e] active:border-b-0 active:translate-y-1 font-bold text-sm mt-2 hover:brightness-110"
                     >
                         <Download size={16} /> DOWNLOAD KEEPSAKE
                     </a>
                 </motion.div>
             )}
        </div>
    );
};

export default ProposeDay;
