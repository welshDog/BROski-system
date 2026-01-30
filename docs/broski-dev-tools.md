# 🚀 BROski Dev Tools & Workflow Guide – Code Faster, Stay Focused

## Why This Matters for You (ADHD Dev Real Talk)

You work hyperfocus sessions. You need tools that **don't interrupt flow**, get out of your way, and give you **immediate wins**. This guide picks tools specifically for that.

---

## 🎯 Part 1: AI Coding Assistants (Your Secret Weapon)

### **Windsurf + Cascade (HIGHLY RECOMMENDED FOR YOU)**[62][65][68]

This is your MVP booster. Windsurf's Cascade agent is built exactly for the kind of rapid development you do.

**Why Windsurf:**

- **Cascade Agent** – Can chain up to 20 tool calls in one flow (install deps → configure → write feature → test → fix errors) without you touching anything[65]
- **Real-time adaptation** – If you manually edit code during Cascade's flow, it **notices and auto-adjusts** all dependent code[65]
- **AI Rules + Memories** – Set once, reuse forever. Your coding style, patterns, and project rules stay consistent[62]
- **Self-correcting loops** – If code has errors, Cascade spots it and fixes it automatically[65]
- **Write Mode vs Chat Mode** – Direct edits across multiple files (Write) or advisory guidance (Chat)

**For Your BROski Project:**

1. Set AI Rules:
   - "Always use React Three Fiber for 3D components"
   - "Zustand stores for all state management"
   - "TailwindCSS + Shadcn/ui for UI"
   - "Firebase Firestore for database"

2. Use Memories to save:
   - Project folder structure
   - BROski coin reward math (25 coins = 1 XP)
   - Avatar leveling formulas
   - Your file naming conventions

3. Prompt Cascade for full features:
   "Build the GameBoard component with Three.js, Avatar movement animation, coin counter HUD"
   → Windsurf generates all files, links imports, runs tests
   
**Setup:**

- Download from windsurf.com
- Install VS Code extension
- Open your BROski project
- Set AI Rules (left sidebar)
- Add Memories for your project constants

---

### **Perplexity AI (For Research + Quick Answers)**

You're already using this. Keep using it for:

- "How do I animate avatar movement in Three.js?"
- "Best practices for Firebase Firestore structure"
- "Zustand best patterns for game state"

This keeps your Windsurf session focused on **code writing**, not searching.

---

## 🧰 Part 2: Development Tools (Make Work Visible)

### **1. Vite (Your Build Tool)**[60][63]

Faster than Create React App. Zero-config, instant reload.

```bash
npm create vite@latest broski-app -- --template react
cd broski-app
npm install
npm run dev
```

**Why:** Hot reload (changes appear instantly) keeps momentum up for hyperfocus.

---

### **2. React DevTools Browser Extension**[60][63]

**Must have.** Shows your component tree, props, state live.

- Chrome Web Store: Search "React Developer Tools"
- Lets you inspect any component without logs
- Watch state change in real-time

**Quick win:** Open DevTools (F12) → Components tab → see your Zustand store state update live as tasks complete.

---

### **3. Storybook (Component Isolation)**[60][69]

Build UI components in isolation. **Game-changer for ADHD workflow** because you can build + test ONE component without context switching.

```bash
npx sb@latest init
npm run storybook
```

**For BROski:**

```javascript
// components/UI/CoinCounter.stories.jsx
export default {
  title: 'UI/CoinCounter',
  component: CoinCounter,
};

export const Default = {
  args: { coins: 500, newCoins: 50 },
};

export const LevelUp = {
  args: { coins: 1000, newCoins: 100, isLevelUp: true },
};
```

Then run `npm run storybook` and see components live at `localhost:6006`. Build without running entire app.

---

### **4. Jest + React Testing Library (Testing Made Easy)**[60][63]

Test as you build. Not after.

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Quick test for GameBoard:**

```javascript
// components/3D/GameBoard.test.jsx
import { render, screen } from '@testing-library/react';
import GameBoard from './GameBoard';

test('GameBoard renders canvas', () => {
  render(<GameBoard />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
```

Run: `npm test`

**Why:** Red ✗ / Green ✓ feedback hits different. You see wins immediately.

---

### **5. Plop (Code Generator – ADHD GOLD)**[64]

Generate boilerplate fast so you focus on logic, not scaffolding.

```bash
npm install -g plop
```

**Create plopfile.js in root:**

```javascript
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      { type: 'input', name: 'name', message: 'Component name?' },
      { type: 'input', name: 'location', message: 'Folder path?' },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{location}}/{{name}}.jsx',
        template: `export function {{name}}() {\n  return <div>{{name}} Component</div>;\n}\n`,
      },
      {
        type: 'add',
        path: 'src/components/{{location}}/{{name}}.test.jsx',
        template: `import { render } from '@testing-library/react';\nimport { {{name}} } from './{{name}}';\n\ntest('renders', () => {\n  render(<{{name}} />);\n});\n`,
      },
    ],
  });
};
```

**Use it:**

```bash
plop component
# Prompts: "CoinCounter"
# Creates:
#   src/components/UI/CoinCounter.jsx
#   src/components/UI/CoinCounter.test.jsx
```

**Result:** 2 files in 5 seconds instead of 2 minutes.

---

## 📊 Part 3: Real-Time Collaboration & Debugging

### **1. Firebase Emulator Suite (Test Locally)**

Don't deploy to prod to test. Use emulators.

```bash
npm install -D firebase-tools
firebase init emulators
firebase emulators:start
```

**Benefits:**

- Test Firestore rules locally
- Approve/reject tasks without real auth
- Leaderboard queries before shipping
- **Zero latency** (data updates instantly)

---

### **2. Vercel for Hosting (1-Click Deploy)**

No Docker. No servers. Connect your GitHub repo, every push auto-deploys.

```bash
npm i -g vercel
vercel
# Logs in, deploys
```

**Your workflow:**

```
Write code → Commit to GitHub → Vercel auto-deploys → Parents test live
```

---

### **3. GitHub Copilot / IntelliSense (Smart Autocomplete)**

Built into VS Code. As you type, it suggests whole functions.

- Pair with Windsurf for maximum output
- Don't overthink it, accept suggestions you like

---

## 🎮 Part 4: Game Dev Specific Tools

### **1. Three.js Playground**

Before coding, test 3D ideas: <https://threejs.org/editor>

Drag/drop models, tweak cameras, see results live.

---

### **2. Babylon.js Playground (Alternative)**

If Three.js feels heavyweight, Babylon has a web editor too: <https://playground.babylonjs.com/>

---

### **3. Spline (3D Model Design)**

No coding needed. Design avatars/board visually, export as .glb (3D format).

Free tier included. Super ADHD-friendly (visual, no code).

---

## 🔗 Part 5: Local Development Speed Hacks

### **1. Hot Reload + Fast Refresh**

Vite does this by default. Code changes appear **instantly** in browser without full page reload.

**Activate:** Just save your file. That's it.

---

### **2. VSCode Extensions to Install**

```bash
# Install these in VS Code Extensions:
- "Prettier" (code formatter)
- "ESLint" (find bugs before runtime)
- "Thunder Client" (test API calls)
- "REST Client" (make HTTP requests inline)
- "Better Comments" (color your TODOs)
- "Three.js Snippets" (boilerplate code)
- "Firebase Extension" (manage Firestore from IDE)
- "Tailwind CSS IntelliSense" (TailwindCSS hints)
```

---

### **3. .env Configuration (Security + Speed)**

Create `.env.example` (commit to repo):

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
VITE_WINDSURF_API_KEY=xxx
```

Create `.env` (local only, `.gitignore` ignores it):

```
VITE_FIREBASE_API_KEY=your_actual_key
VITE_FIREBASE_PROJECT_ID=broski-app-prod
```

Access in code:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};
```

---

## 📋 Part 6: Your Perfect Dev Session (ADHD Optimized)

### **30-Minute Hyperfocus Sprint**

1. **Setup (2 min)**
   - Open VS Code
   - Run `npm run dev` (Vite dev server)
   - Open Storybook: `npm run storybook`
   - Split screen: code on left, Storybook on right

2. **Plan (3 min)**
   - Open your codemap (this file)
   - Pick **ONE component** to build
   - Grab a coffee

3. **Build (20 min)**
   - Use Windsurf Cascade: "Build [ComponentName] with [requirements]"
   - Let it generate
   - Review + approve changes
   - See live updates in Storybook/browser
   - Fix bugs using Cascade in Chat Mode

4. **Test (3 min)**
   - Run `npm test`
   - See green checkmarks
   - Commit to GitHub

5. **Deploy (2 min)**
   - Push to GitHub
   - Vercel auto-deploys
   - Share link with testers

---

## 🎯 Part 7: Windsurf Cascade Prompts (Copy-Paste These)

### **Prompt 1: Generate GameBoard Component**

```
Build a React Three Fiber component called GameBoard that:
- Renders 50 board spaces in a circular path
- Each space is a clickable box with different colors
- Takes a `position` prop and highlights the current space
- Space 0 is start (green), space 49 is end (gold)
- Bonus spaces (every 10th) are glowing red
- Include OrbitControls for camera rotation
- File: src/components/3D/GameBoard.jsx
```

### **Prompt 2: Generate Avatar Component**

```
Build a React Three Fiber avatar component that:
- Loads a simple 3D model (cube with colors for now)
- Animates between board positions smoothly (2 second tween)
- Has customizable appearance: baseColor, hatId, wingId
- Takes props: position (0-50), level (1-10), appearance
- File: src/components/3D/Avatar.jsx
Use gsap for smooth animation tweens.
```

### **Prompt 3: Generate Parent Approval Dashboard**

```
Build a React component ParentDashboard that:
- Shows real-time list of pending tasks from Firebase
- Each task shows: kid name, chore title, photo, submitted time
- Has "Approve" button (green) and "Reject" button (red)
- Approve: updates Firestore, moves kid's avatar, sends notification
- Reject: marks task rejected, sends explanation to kid
- Real-time updates using Firebase listeners
- File: src/components/Dashboard/ParentDashboard.jsx
Use React hooks for state.
```

### **Prompt 4: Generate Zustand Store Setup**

```
Create Zustand stores for BROski app:
1. gameStore: position, coinBalance, level, experience, moveAvatar(), addCoins()
2. userStore: user auth, profile, familyId, role
3. uiStore: notifications, modals, selectedView
Each store in separate file in src/stores/
Add TypeScript support if available.
```

---

## ✅ Quick Checklist: Before First Deployment

- [ ] Windsurf + Cascade installed
- [ ] Vite dev server runs (`npm run dev`)
- [ ] Storybook builds (`npm run storybook`)
- [ ] Firebase emulator running locally
- [ ] Jest tests passing (`npm test`)
- [ ] Prettier formatting set up (`prettier --write .`)
- [ ] GitHub repo connected to Vercel
- [ ] .env file configured with Firebase keys
- [ ] One component built + tested in Storybook
- [ ] Cascade prompt saved to prompt library

---

## 🎮 Pro Tips for Hyperfocus Zones

1. **Mute notifications** – Use "Focus Mode" in OS to kill distractions
2. **Have your codemap open** – This document. Reference it constantly.
3. **Cascade is your pair programmer** – Ask it questions, test ideas fast
4. **Commit frequently** – Every 30 min, push to GitHub (feels like wins)
5. **Test in Storybook, not full app** – Faster feedback loop
6. **Use hot reload** – Never manually refresh. Changes auto-appear.
7. **Split screen workflow** – IDE left, preview right, docs center monitor

---

## 🚀 Next: Ready to Code?

1. **Grab the codemap file** – `broski-codemap.md`
2. **Copy a Windsurf prompt** – Pick Component 1: GameBoard
3. **Open Windsurf** → Paste prompt → Run Cascade
4. **See code generate** → Approve changes
5. **Check Storybook** → Component renders live
6. **Commit + celebrate** 🎉

You've got everything you need to ship this. The system is set up for **speed + focus**.

Let's go, mate. 🚀
