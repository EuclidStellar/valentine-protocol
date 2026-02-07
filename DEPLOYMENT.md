# Deployment Guide 🚀

The easiest way to deploy this **React + Vite** project is using **Vercel** or **Netlify**. Both are free and support this stack out of the box.

## Option 1: Vercel (Recommended) 🏆

1.  **Create a GitHub Repository**:
    *   Go to [GitHub.com](https://github.com/new) and create a new repository (e.g., `Mohtarmas-journey`).
    *   Push your local code to this repository:
        ```bash
        git init
        git add .
        git commit -m "Final Vday Update"
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/Mohtarmas-journey.git
        git push -u origin main
        ```

2.  **Deploy on Vercel**:
    *   Go to [Vercel.com](https://vercel.com) and sign up/login.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your `Mohtarmas-journey` repository.
    *   **Framework Preset**: It should auto-detect `Vite`.
    *   Click **Deploy**.

3.  **Done!** You'll get a URL like `https://Mohtarmas-journey.vercel.app` to share with her.

---

## Option 2: Netlify (Alternative)

1.  **Drag & Drop (Simplest)**:
    *   Run `npm run build` in your terminal.
    *   This creates a `dist` folder in your project.
    *   Go to [Netlify Drop](https://app.netlify.com/drop).
    *   Drag the `dist` folder onto the page.
    *   It will deploy instantly.

2.  **GitHub Connection**:
    *   Similar to Vercel, connect your GitHub repo to Netlify for auto-updates when you push code.

---

## ⚠️ Important Note on Camera/Audio

*   **Camera Permissions:** Browsers often require `https://` (secure connection) for the Camera access to work on mobile. Vercel/Netlify provide HTTPS automatically, so this will work perfectly.
*   **Audio Autoplay:** Mobile browsers are strict about autoplay. If music doesn't start immediately, she might need to tap the screen once to "unlock" the audio context.
