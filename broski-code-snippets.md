# 🎯 BROski Implementation Quick Start – Copy-Paste Ready Code

This file has **boilerplate code snippets** you can copy directly into your project. Use with Windsurf's Cascade for auto-generation.

---

## 1️⃣ Project Initialization (Do This First)

### **Step 1: Create Vite Project**
```bash
npm create vite@latest broski-app -- --template react
cd broski-app
npm install
```

### **Step 2: Install Dependencies**
```bash
# Core
npm install zustand firebase react-router-dom axios

# 3D & Graphics
npm install three @react-three/fiber @react-three/drei gsap

# UI & Styling
npm install tailwindcss postcss autoprefixer @shadcn/ui lucide-react
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Dev Tools
npm install -D vite storybook jest @testing-library/react @testing-library/jest-dom plop prettier eslint

# Animations & Notifications
npm install framer-motion react-hot-toast date-fns
```

### **Step 3: Initialize Tailwind**
```bash
npx tailwindcss init -p
```

---

## 2️⃣ Firebase Setup (Real-Time Backend)

### **File: `src/services/firebase/db.js`**
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Multiple tabs open, persistence disabled");
  }
});
```

### **File: `.env` (Local – Don't Commit)**
```
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

---

## 3️⃣ Zustand Store Setup (State Management)

### **File: `src/stores/gameStore.js`**
```javascript
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    // Avatar state
    position: 0,
    level: 1,
    experience: 0,
    coinBalance: 0,
    maxExperience: 100,

    // Appearance
    appearance: {
      baseColor: "#FF6B6B",
      hatId: null,
      wingId: null,
      petId: null,
    },

    // Actions
    moveAvatar: (spaces) =>
      set((state) => ({
        position: Math.min(state.position + spaces, 50),
      })),

    addCoins: (amount) =>
      set((state) => {
        const newExp = state.experience + Math.floor(amount / 25);
        const newLevel = Math.floor(newExp / 100) + 1;

        return {
          coinBalance: state.coinBalance + amount,
          experience: newExp % 100,
          level: newLevel,
        };
      }),

    levelUp: () =>
      set((state) => ({
        level: state.level + 1,
        experience: 0,
      })),

    resetPosition: () => set({ position: 0 }),

    setAppearance: (newAppearance) =>
      set((state) => ({
        appearance: { ...state.appearance, ...newAppearance },
      })),
  }))
);
```

### **File: `src/stores/userStore.js`**
```javascript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      familyId: null,
      role: null, // "parent" | "kid"

      setUser: (user) => set({ user }),
      setFamilyId: (familyId) => set({ familyId }),
      setRole: (role) => set({ role }),
      logout: () => set({ user: null, familyId: null, role: null }),
    }),
    { name: "user-store" }
  )
);
```

### **File: `src/stores/uiStore.js`**
```javascript
import { create } from "zustand";

export const useUIStore = create((set) => ({
  notifications: [],
  showModal: null,

  addNotification: (message, type = "info") => {
    const id = Date.now();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 3000);
  },

  openModal: (modalName) => set({ showModal: modalName }),
  closeModal: () => set({ showModal: null }),
}));
```

---

## 4️⃣ 3D Game Board Component

### **File: `src/components/3D/GameBoard.jsx`**
```javascript
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useGameStore } from "@/stores/gameStore";
import BoardSpace from "./BoardSpace";
import Avatar from "./Avatar";

export default function GameBoard() {
  const position = useGameStore((s) => s.position);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-200">
      <Canvas camera={{ position: [0, 20, 20], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 20, 10]} intensity={1} />
        <pointLight position={[-10, 20, -10]} intensity={0.5} />

        {/* Board Spaces */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2;
          const x = Math.cos(angle) * 12;
          const z = Math.sin(angle) * 12;

          let spaceType = "normal";
          if (i === 0) spaceType = "start";
          if (i === 49) spaceType = "end";
          if (i % 10 === 0 && i !== 0) spaceType = "bonus";

          return (
            <BoardSpace
              key={i}
              position={[x, 0, z]}
              index={i}
              type={spaceType}
            />
          );
        })}

        {/* Avatar */}
        <Avatar boardPosition={position} />

        {/* Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom
          enablePan
        />
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 bg-black/50 p-4 rounded text-white font-bold">
        <div>Position: {position}/50</div>
      </div>
    </div>
  );
}
```

### **File: `src/components/3D/Avatar.jsx`**
```javascript
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/stores/gameStore";
import gsap from "gsap";

export default function Avatar({ boardPosition }) {
  const groupRef = useRef();
  const positionRef = useRef(boardPosition);

  // Calculate position on board circle
  const getWorldPosition = (boardPos) => {
    const angle = (boardPos / 50) * Math.PI * 2;
    return {
      x: Math.cos(angle) * 12,
      z: Math.sin(angle) * 12,
    };
  };

  // Animate when boardPosition changes
  useEffect(() => {
    if (groupRef.current) {
      const newPos = getWorldPosition(boardPosition);
      gsap.to(groupRef.current.position, {
        x: newPos.x,
        z: newPos.z,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [boardPosition]);

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* Avatar body (cube for now) */}
      <mesh>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.2, 0.4, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.2, 0.4, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}
```

### **File: `src/components/3D/BoardSpace.jsx`**
```javascript
import { useRef, useState } from "react";

export default function BoardSpace({ position, index, type = "normal" }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const colors = {
    normal: "#4F46E5",
    bonus: "#EF4444",
    start: "#22C55E",
    end: "#FBBF24",
  };

  const scale = hovered ? 1.2 : 1;

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={scale}
    >
      <boxGeometry args={[0.8, 0.2, 0.8]} />
      <meshStandardMaterial
        color={colors[type]}
        emissive={hovered ? colors[type] : "#000"}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
      <meshStandardMaterial attach="material-1" color="#999" />
    </mesh>
  );
}
```

---

## 5️⃣ Coin Counter HUD Component

### **File: `src/components/UI/CoinCounter.jsx`**
```javascript
import { useGameStore } from "@/stores/gameStore";
import { useEffect, useState } from "react";

export default function CoinCounter() {
  const { coinBalance, level, experience } = useGameStore();
  const [displayCoins, setDisplayCoins] = useState(coinBalance);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (displayCoins !== coinBalance) {
      setBounce(true);
      setDisplayCoins(coinBalance);
      setTimeout(() => setBounce(false), 500);
    }
  }, [coinBalance]);

  const expPercent = (experience / 100) * 100;

  return (
    <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border-2 border-yellow-400">
      {/* Coins */}
      <div className={`text-3xl font-bold text-yellow-500 transition-transform ${bounce ? "scale-110" : "scale-100"}`}>
        🪙 {displayCoins}
      </div>

      {/* Level */}
      <div className="text-sm text-gray-600 mt-2">
        Level <span className="font-bold text-blue-500">{level}</span>
      </div>

      {/* Experience Bar */}
      <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${expPercent}%` }}
        />
      </div>

      {/* XP Text */}
      <div className="text-xs text-gray-500 mt-1">
        {experience}/100 XP
      </div>
    </div>
  );
}
```

---

## 6️⃣ Task Approval Queue (Parent Dashboard)

### **File: `src/components/Dashboard/ApprovalQueue.jsx`**
```javascript
import { useState, useEffect } from "react";
import { db } from "@/services/firebase/db";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { useUserStore } from "@/stores/userStore";

export default function ApprovalQueue() {
  const [tasks, setTasks] = useState([]);
  const familyId = useUserStore((s) => s.familyId);

  useEffect(() => {
    if (!familyId) return;

    const q = query(
      collection(db, "taskInstances"),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pendingTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(pendingTasks);
    });

    return unsubscribe;
  }, [familyId]);

  const approveTask = async (taskId) => {
    await updateDoc(doc(db, "taskInstances", taskId), {
      status: "approved",
      approvedAt: new Date(),
    });
  };

  const rejectTask = async (taskId) => {
    await updateDoc(doc(db, "taskInstances", taskId), {
      status: "rejected",
    });
  };

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-2xl font-bold">Pending Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No pending tasks 🎉</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border-l-4 border-yellow-400 p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{task.choreId}</h3>
              <p className="text-sm text-gray-600">
                Submitted: {new Date(task.submittedAt.seconds * 1000).toLocaleTimeString()}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => approveTask(task.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => rejectTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                ✗ Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
```

---

## 7️⃣ Sibling Leaderboard

### **File: `src/components/UI/Leaderboard.jsx`**
```javascript
import { useState, useEffect } from "react";
import { db } from "@/services/firebase/db";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "avatars"),
      orderBy("coinBalance", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc, idx) => ({
        rank: idx + 1,
        ...doc.data(),
      }));
      setLeaderboard(data);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-bold mb-3">🏆 Weekly Leaders</h3>

      {leaderboard.map((kid) => (
        <div key={kid.id} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-yellow-500">#{kid.rank}</span>
            <span className="font-bold">{kid.name}</span>
          </div>
          <span className="text-lg">🪙 {kid.coinBalance}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ Storybook Stories

### **File: `src/components/UI/CoinCounter.stories.jsx`**
```javascript
import CoinCounter from "./CoinCounter";
import { useGameStore } from "@/stores/gameStore";

export default {
  title: "UI/CoinCounter",
  component: CoinCounter,
};

export const Default = {
  decorators: [
    (Story) => {
      useGameStore.setState({
        coinBalance: 500,
        level: 3,
        experience: 45,
      });
      return <Story />;
    },
  ],
};

export const LevelUp = {
  decorators: [
    (Story) => {
      useGameStore.setState({
        coinBalance: 1200,
        level: 5,
        experience: 0,
      });
      return <Story />;
    },
  ],
};
```

---

## 🚀 Run Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Storybook (isolated component testing)
npm run storybook

# Testing
npm test

# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

---

**Copy these snippets into your project, fill in Firebase config, and you're ready to ship! 🚀**
