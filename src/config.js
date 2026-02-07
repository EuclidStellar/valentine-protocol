import roseAudio from './assets/audio/can_i_call_you_rose.mp3';
import proposeAudio from './assets/audio/Taylor_Swift_Paper_Rings_English_Song_Ringtone_(by Fringster.com).mp3';
import chocolateAudio from './assets/audio/butter_bts.mp3';
import teddyAudio from './assets/audio/until_i_found_you.mp3';
import promiseAudio from './assets/audio/golden_hour.mp3';
import hugAudio from './assets/audio/with-you-ap-dhillon-jMgxZ-besttone.mp3';
import kissAudio from './assets/audio/Arz Kiya Hai - Anuv Jain _ Lost Stories _ Hindi.mp3';
import valentineAudio from './assets/audio/a_thousand_years.mp3';

const config = {
    // 👤 Personal Details
    person: {
        name: "Gun",  // Appears in titles and letters
        nickname: "Player 2", 
    },

    // 📅 Key Dates
    startDate: "2025-02-07", // The date Rose Day unlocks

    // 🎶 Audio Paths
    music: {
        rose: roseAudio,
        propose: proposeAudio,
        chocolate: chocolateAudio,
        teddy: teddyAudio,
        promise: promiseAudio,
        hug: hugAudio,
        kiss: kissAudio,
        valentine: valentineAudio,
    },

    // 💌 Custom Messages
    messages: {
        rose: {
            title: "My Digital Garden",
            success: "You make my world bloom!"
        },
        propose: {
            success: "SHE SAID YES!"
        },
        chocolate: {
            success: "Sweetest creation ever!"
        },
        teddy: {
            title: "TEDDY CLAW",
            success: "I'll always catch you!"
        },
        promise: {
            title: "CONSTELLATION PATH",
            success: "Our paths are linked forever."
        },
        hug: {
            title: "HUG STATION",
            success: "Warmth received!"
        },
        kiss: {
            success: "PERFECT RHYTHM!"
        },
        valentine: {
            letter: `To my favorite person,

            Thank you for playing this little game. 
            Every day with you feels like unlocking a new level of happiness.
            
            Happy Valentine's Day! ❤️`
        }
    }
};

export default config;
