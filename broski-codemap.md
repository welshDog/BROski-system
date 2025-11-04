# 🎮 BROski Chore Gamification App – Hyper Codemap

**Project Overview:** 3D game board chore tracker with parent approval dashboard, avatar progression, and sibling leaderboards.

**Tech Stack:**
- **Frontend:** React 18 + Vite (fast bundling)
- **3D Engine:** Three.js + React Three Fiber (R3F for cleaner React integration)
- **State Management:** Zustand (lightweight, perfect for ADHD-friendly codebases)
- **Real-time DB:** Firebase (Firestore + Auth)
- **UI Components:** Shadcn/ui + TailwindCSS (accessibility-first)
- **Mobile:** PWA first, then React Native
- **Deploy:** Vercel (frontend) + Firebase (backend)

---

## 📁 Project Structure

```
broski-app/
├── public/
│   ├── avatars/           # Avatar sprites & 3D models
│   ├── boards/            # Board textures & backgrounds
│   └── sounds/            # UI sounds, celebrations, effects
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── GameBoard.jsx         # Main 3D board canvas
│   │   │   ├── Avatar.jsx            # Character model
│   │   │   ├── BoardSpace.jsx        # Individual spaces (quest, bonus, etc)
│   │   │   ├── Particles.jsx         # Celebration effects
│   │   │   └── Camera.jsx            # Camera controls
│   │   ├── UI/
│   │   │   ├── CoinCounter.jsx       # HUD coin display
│   │   │   ├── BadgeDisplay.jsx      # Achievement badges
│   │   │   ├── StreakCounter.jsx     # Daily streak tracker
│   │   │   ├── LeaderboardWidget.jsx # Siblings ranking
│   │   │   └── NotificationBubble.jsx # Task approved alerts
│   │   ├── Auth/
│   │   │   ├── ParentLogin.jsx       # Parent auth
│   │   │   ├── KidLogin.jsx          # Kid quick-access
│   │   │   └── ProtectedRoute.jsx    # Role-based routing
│   │   ├── Dashboard/
│   │   │   ├── ParentDashboard.jsx   # Approval queue + analytics
│   │   │   ├── ApprovalQueue.jsx     # Pending tasks
│   │   │   ├── FamilyStats.jsx       # Leaderboard + trends
│   │   │   └── SettingsPanel.jsx     # Chore customization
│   │   ├── Store/
│   │   │   ├── AvatarCreator.jsx     # Initial avatar setup
│   │   │   ├── CosmeticShop.jsx      # Buy hats, cosmetics
│   │   │   └── Cosmetics.jsx         # Cosmetic previewer
│   │   └── Shared/
│   │       ├── Navigation.jsx
│   │       ├── LoadingScreen.jsx
│   │       └── ErrorBoundary.jsx
│   ├── hooks/
│   │   ├── useGameBoard.js           # Board state management
│   │   ├── useAvatar.js              # Avatar progression
│   │   ├── useCoins.js               # Coin transactions
│   │   ├── useStreaks.js             # Streak tracking
│   │   ├── useParentApproval.js      # Task approval flow
│   │   ├── useLeaderboard.js         # Real-time leaderboard
│   │   └── useFirebase.js            # Firebase integration
│   ├── stores/
│   │   ├── gameStore.js              # Zustand: board, positions, progress
│   │   ├── userStore.js              # Zustand: auth, profile
│   │   ├── uiStore.js                # Zustand: notifications, modals
│   │   └── analyticsStore.js         # Zustand: tracking, streaks
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── auth.js               # Auth setup
│   │   │   ├── db.js                 # Firestore config
│   │   │   ├── listeners.js          # Real-time listeners
│   │   │   └── queries.js            # DB queries
│   │   ├── gameLogic.js              # Board mechanics, movement, rewards
│   │   ├── avatarLogic.js            # Leveling, cosmetics
│   │   ├── approvalWorkflow.js       # Task validation, parent approval
│   │   └── notificationService.js    # Push notifications, alerts
│   ├── utils/
│   │   ├── calculations.js           # Coin rewards, streak math
│   │   ├── validators.js             # Input validation
│   │   ├── formatters.js             # Date/time formatting
│   │   ├── constants.js              # Game rules, cosmetic IDs
│   │   └── animations.js             # Tweening, easing functions
│   ├── styles/
│   │   ├── globals.css               # TailwindCSS base
│   │   ├── animations.css            # Keyframes for movements
│   │   └── three.css                 # Canvas styling
│   ├── pages/
│   │   ├── Kid.jsx                   # Kid game page (main screen)
│   │   ├── Parent.jsx                # Parent dashboard
│   │   ├── Profile.jsx               # Edit avatar, settings
│   │   └── NotFound.jsx              # 404 page
│   ├── App.jsx                       # Main router
│   └── main.jsx                      # Entry point
├── tests/
│   ├── gameLogic.test.js
│   ├── avatarLogic.test.js
│   └── components/GameBoard.test.jsx
├── .env.example
├── vite.config.js
├── tailwind.config.js
├── firebase.config.js
└── package.json
```

---

## 🔑 Core Data Models (Firestore)

### **Collections:**

#### 1. **`users/`** – All users (parents + kids)
```javascript
{
  id: "user-123",
  email: "parent@example.com",
  role: "parent", // or "kid"
  profileName: "Alice",
  createdAt: timestamp,
  familyId: "family-abc",  // Links to family
  settings: { theme: "dark", notifications: true }
}
```

#### 2. **`families/`** – Family profiles
```javascript
{
  id: "family-abc",
  name: "The Smiths",
  ownerId: "user-123",  // Parent
  kidIds: ["kid-1", "kid-2"],
  createdAt: timestamp,
  boardTheme: "kitchen-quest",
  coinMultiplier: 1.0  // For difficulty tuning
}
```

#### 3. **`avatars/`** – Kid avatar profiles
```javascript
{
  id: "avatar-kid-1",
  userId: "kid-1",
  name: "Dragon Knight",
  level: 5,
  experience: 250,
  coinBalance: 1200,
  position: 15,              // Board space (0-50)
  appearance: {
    baseColor: "#FF6B6B",
    hatId: "wizard-hat-001",
    wingId: null,
    petId: "dragon-pet-001"
  },
  createdAt: timestamp,
  lastUpdated: timestamp
}
```

#### 4. **`chores/`** – Task definitions
```javascript
{
  id: "chore-001",
  familyId: "family-abc",
  title: "Wash Dishes",
  description: "Clean and dry all dishes",
  coinReward: 25,
  difficulty: "medium",  // easy, medium, hard
  category: "kitchen",   // For seasonal themes
  recurring: "daily",    // daily, weekly, etc
  createdAt: timestamp
}
```

#### 5. **`taskInstances/`** – Individual task submissions
```javascript
{
  id: "task-inst-001",
  userId: "kid-1",
  choreId: "chore-001",
  status: "pending",    // pending, approved, rejected, completed
  photoUrl: "gs://bucket/photo.jpg",  // Optional photo proof
  submittedAt: timestamp,
  approvedAt: timestamp,
  approvedBy: "user-123",  // Parent ID
  coinAwarded: 25,
  boardMovement: 1      // Spaces moved
}
```

#### 6. **`streaks/`** – Daily streak tracking
```javascript
{
  id: "streak-kid-1",
  userId: "kid-1",
  currentStreak: 7,
  longestStreak: 30,
  lastCompletedDate: "2025-11-03",
  streakStartDate: "2025-10-28"
}
```

#### 7. **`cosmetics/`** – Avatar cosmetics catalog
```javascript
{
  id: "hat-wizard-001",
  type: "hat",  // hat, wing, pet, emote
  name: "Wizard Hat",
  rarity: "common",  // common, rare, epic, legendary
  cost: 100,    // BROski coins
  model3DUrl: "models/wizard-hat.glb",
  thumbnail: "img/wizard-hat.png"
}
```

#### 8. **`leaderboards/`** – Real-time rankings
```javascript
{
  id: "leaderboard-family-abc-weekly",
  familyId: "family-abc",
  period: "weekly",  // weekly, monthly, allTime
  rankings: [
    { userId: "kid-1", coinsEarned: 500, position: 1 },
    { userId: "kid-2", coinsEarned: 320, position: 2 }
  ],
  updatedAt: timestamp
}
```

---

## ⚡ Key Game Logic Flows

### **1. Task Completion Flow**

```
Kid completes chore
    ↓
[Kid] Submits task (photo optional)
    ↓
taskInstance created with status="pending"
    ↓
Real-time notification → Parent dashboard
    ↓
[Parent] Reviews + clicks "Approve"
    ↓
Validation: Is chore real? Photo clear?
    ↓
APPROVED:
  - taskInstance.status = "approved"
  - Coins awarded to avatar.coinBalance
  - Avatar.position += 1
  - Trigger board movement animation
  - Celebratory particle effects
  - Sound effect plays
  - Notification sent back to kid
    ↓
REJECTED:
  - taskInstance.status = "rejected"
  - Explanation sent to kid
  - Coin NOT awarded
```

### **2. Avatar Leveling Flow**

```
Experience Calculation:
- Every 25 coins earned = 1 XP
- Level threshold: XP_NEEDED = level * 100

Example:
- Level 1: 0-100 XP
- Level 2: 100-200 XP
- Level 3: 200-300 XP

When level up:
  - Unlock new cosmetic slot
  - Play level-up animation
  - Award bonus cosmetic (hat, wing, etc)
  - Update avatar model with new gear
```

### **3. Streak Maintenance Flow**

```
Daily check (runs at midnight):
  IF kid completed ANY task today:
    - currentStreak += 1
    - Check if new milestone (7, 30, 100 day badges)
    - Award streak bonus coins (1 coin per day: day 7 = 7 bonus coins)
  ELSE:
    - currentStreak = 0
    - lastCompletedDate reset
    - Sad notification sent to kid (gentle push)
```

### **4. Board Movement Animation**

```
When avatar moves:
  1. Get current position: pos = 15
  2. Calculate new pos: newPos = 16
  3. Tween avatar from space 15 → 16 (2-3 second animation)
  4. Play movement sound
  5. Emit particle effects at destination
  6. If space is special (bonus, challenge):
     - Trigger special effect
     - Show reward popup
  7. Update UI coin counter (animate +25 BROski)
```

---

## 🛠️ Development Checklist (MVP)

### **Phase 1: Foundation (Week 1-2)**
- [ ] Project setup (Vite + React + Three.js)
- [ ] Firebase config & auth flow
- [ ] Zustand store setup
- [ ] Basic 3D board in Three.js (simple cube spaces)
- [ ] Avatar model (basic 3D sprite or cube)

### **Phase 2: Kid Experience (Week 2-3)**
- [ ] Task submission UI
- [ ] Real-time approval notifications
- [ ] Board movement animation
- [ ] Coin counter HUD
- [ ] Basic badge display

### **Phase 3: Parent Dashboard (Week 3-4)**
- [ ] Parent auth login
- [ ] Approval queue interface
- [ ] Quick approve/reject buttons
- [ ] Family stats view
- [ ] Real-time leaderboard

### **Phase 4: Progression (Week 4-5)**
- [ ] Avatar leveling system
- [ ] Cosmetics catalog
- [ ] Cosmetic shop UI
- [ ] Avatar appearance updates
- [ ] Streak tracking display

### **Phase 5: Polish & Deploy (Week 5-6)**
- [ ] Sound effects & music
- [ ] Smooth animations throughout
- [ ] Mobile responsiveness (PWA)
- [ ] Error handling & loading states
- [ ] Deploy to Vercel + Firebase
- [ ] User testing

---

## 🚀 Key Code Snippets to Build First

### **Snippet 1: Zustand Store Setup**
```javascript
// stores/gameStore.js
import create from "zustand";

export const useGameStore = create((set) => ({
  // Avatar state
  position: 0,
  coinBalance: 0,
  level: 1,
  experience: 0,
  
  // Board state
  boardSpaces: [],
  currentSeason: "kitchen-quest",
  
  // Actions
  moveAvatar: (spaces) =>
    set((state) => ({ position: state.position + spaces })),
  
  addCoins: (amount) =>
    set((state) => ({
      coinBalance: state.coinBalance + amount,
      experience: state.experience + Math.floor(amount / 25),
    })),
  
  levelUp: () =>
    set((state) => ({
      level: state.level + 1,
      experience: 0,
    })),
}));
```

### **Snippet 2: Approval Workflow**
```javascript
// services/approvalWorkflow.js
export const approveTask = async (taskId, parentId) => {
  try {
    // Update task status
    await db.collection("taskInstances").doc(taskId).update({
      status: "approved",
      approvedBy: parentId,
      approvedAt: new Date(),
    });

    // Get task details
    const taskDoc = await db.collection("taskInstances").doc(taskId).get();
    const { userId, choreId, coinReward } = taskDoc.data();

    // Award coins to avatar
    await db.collection("avatars").doc(userId).update({
      coinBalance: firebase.firestore.FieldValue.increment(coinReward),
      position: firebase.firestore.FieldValue.increment(1),
    });

    // Send notification to kid
    await notificationService.send(userId, {
      type: "task-approved",
      message: `Task approved! +${coinReward} BROski coins!`,
      coinsEarned: coinReward,
    });

    return { success: true };
  } catch (error) {
    console.error("Approval failed:", error);
    return { success: false, error };
  }
};
```

### **Snippet 3: 3D Board with React Three Fiber**
```javascript
// components/3D/GameBoard.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGameStore } from "@/stores/gameStore";

export function GameBoard() {
  const position = useGameStore((s) => s.position);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {/* Render 50 board spaces */}
      {Array.from({ length: 50 }).map((_, i) => (
        <BoardSpace
          key={i}
          position={i}
          isActive={i === position}
        />
      ))}

      {/* Render avatar */}
      <Avatar position={position} />
    </Canvas>
  );
}
```

---

## 📚 Libraries & Tools to Install

```bash
npm install react react-dom vite
npm install zustand firebase
npm install three @react-three/fiber @react-three/drei
npm install @shadcn/ui tailwindcss
npm install framer-motion          # Animations
npm install react-hot-toast        # Notifications
npm install react-router-dom       # Routing
npm install axios                  # HTTP
npm install date-fns              # Date handling
npm install react-query           # Server state (optional, Firebase handles most)
```

---

## 🎯 Smart Development Tips (ADHD-Friendly)

1. **Build modular components first** – Each component does ONE thing
2. **Use Zustand for clarity** – No Redux complexity, easy to follow state
3. **Firestore rules first** – Set security rules early to avoid bugs later
4. **Test approval flow early** – This is your core mechanic, get it right
5. **Sound effects ASAP** – Add satisfying audio early to keep motivation high
6. **Mobile-first CSS** – TailwindCSS makes this fast
7. **Commit frequently** – Small, focused commits make hyperfocus sessions easier
8. **Use React DevTools** – Browser extension for debugging state

---

## 🔒 Firebase Security Rules (Firestore)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Parents can read/write own family data
    match /families/{familyId} {
      allow read, write: if request.auth.uid in resource.data.parentIds;
    }
    
    // Kids can read own avatar
    match /avatars/{avatarId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if false; // Parents + backend only
    }
    
    // Task instances: kids submit, parents approve
    match /taskInstances/{taskId} {
      allow create: if request.auth.uid == request.resource.data.userId;
      allow read, update: if request.auth.uid in get(/databases/$(database)/documents/families/$(resource.data.familyId)).data.parentIds;
    }
    
    // Everyone can read cosmetics catalog
    match /cosmetics/{cosmeticId} {
      allow read: if true;
    }
  }
}
```

---

## 📊 Deployment Checklist

**Before shipping to production:**
- [ ] Environment variables set (.env.production)
- [ ] Firebase rules deployed
- [ ] Auth flow tested (parent + kid login)
- [ ] Approval workflow end-to-end tested
- [ ] 3D board renders on mobile
- [ ] Sound effects optimized (gzipped)
- [ ] Error boundary catching crashes
- [ ] Analytics tracking (optional: Firebase Analytics)
- [ ] PWA manifest configured
- [ ] HTTPS enabled (Vercel handles this)

---

## 🎮 What's Next After MVP?

**Phase 2 (Weeks 6-8):**
- Boss battles
- Seasonal board themes
- More cosmetics & rarities
- Multiplayer quests
- Parent analytics dashboard

**Phase 3 (Weeks 8-10):**
- Mobile app (React Native)
- Voice logging (task submission via audio)
- Leaderboard achievements
- Social features (friend invites)
- In-game notifications with sounds

---

**You've got this, BROski!** This codemap is your north star. Follow it phase by phase, and you'll have a shipping product in 6 weeks. 🚀
