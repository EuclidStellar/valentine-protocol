# 💖 The Valentine's Protocol
> *"A 7-Day Digital Journey to Win Player 2's Heart"*

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![License](https://img.shields.io/badge/license-MIT-pink.svg?style=for-the-badge)

**The Valentine's Protocol** is a retro-themed, interactive web experience designed to be the ultimate digital gift. It features a 7-day unlockable journey, pixel-art mini-games, and a deeply customizable core that lets *anyone* deploy their own version for their special someone.

---

### 🎮 Live Demo
*(Replace this with your Vercel/Netlify link after deploying!)*  
[**👉 View Demo**](https://your-demo-link.vercel.app)

---

## ✨ Features

*   **📅 7-Day Unlock System:** Content unlocks automatically based on the real-world date (Feb 7 - Feb 14).
*   **🕹️ 7 Unique Mini-Games:**
    *   **Feb 7 (Rose):** Water a pixel rose until it blooms 🌹.
    *   **Feb 8 (Propose):** A "glitched" proposal UI where they *can't* say no 💍.
    *   **Feb 9 (Chocolate):** Drag-and-drop dessert builder 🍫.
    *   **Feb 10 (Teddy):** A fully functional claw machine 🧸.
    *   **Feb 11 (Promise):** Navigate a constellation maze ⭐.
    *   **Feb 12 (Hug):** "Hold to Embrace" haptic-style button 🫂.
    *   **Feb 13 (Kiss):** Rhythm game to catch falling kisses 💋.
    *   **Feb 14 (Valentine):** The Key Vault. Collect all 7 keys to unlock the final letter 💝.
*   **🎨 Dreamy Retro Aesthetic:** CRT scanlines, nebula backgrounds, and floating particles.
*   **📸 Camera Integration:** Captures their reaction during the proposal (stored locally!).
*   **⚙️ 100% Configurable:** Change names, music, messages, and dates in seconds.

---

## 🚀 How to Make This Yours

You don't need to be a coding wizard. I built this to be easily customizable for *everyone*.

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/valentine-protocol.git
cd valentine-protocol
npm install
```

### 2. Customize `src/config.js`
Open `src/config.js` and edit the values. It's that simple.

```javascript
const config = {
    person: {
        name: "Her Name", 
        nickname: "Player 2",
    },
    audio: {
        // Drop your mp3s in src/assets/audio and link them here!
        rose: roseAudio, 
    },
    messages: {
        rose: {
            success: "You make my heart bloom!" // Your custom text
        }
    }
};
```

### 3. Deploy
Run `npm run build` and upload the `dist` folder to [Netlify Drop](https://app.netlify.com/drop). Or use Vercel for one-click deployment.

---

## 🛠️ Tech Stack

*   **Core:** React (Vite)
*   **Styling:** Tailwind CSS (Pixel Art & Glassmorphism)
*   **Animation:** Framer Motion (Transitions & Physics)
*   **Icons:** Lucide React
*   **Vibes:** Immaculate ✨

---

## 🤝 Contributing

Have a cooler mini-game idea? Found a bug?  
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with ❤️, ☕, and too many commits by [EuclidStellar]*
