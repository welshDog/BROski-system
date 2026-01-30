# 🎮 BROski Chore Gamification App – Master Launch Document

**Your complete guide to shipping a 3D chore gamification app in 6 weeks.** Everything you need is here.

---

## 📚 What You Got (3 Files)

1. **`broski-codemap.md`** – Full project structure, architecture, data models, and development roadmap
2. **`broski-dev-tools.md`** – Tools, AI assistants, and ADHD-optimized workflow
3. **`broski-code-snippets.md`** – Copy-paste ready code (Firebase, Zustand, React Three Fiber)

**READ THEM IN ORDER.** Each builds on the previous one.

---

## 🚀 Week-by-Week Launch Plan

### **Week 1-2: Foundation** ⚙️

**Day 1-2:**
- [ ] Read `broski-codemap.md` (project structure section)
- [ ] Create Vite project: `npm create vite@latest broski-app -- --template react`
- [ ] Install all dependencies from `broski-code-snippets.md`
- [ ] Set up Firebase (create free account at firebase.google.com)

**Day 3-5:**
- [ ] Copy Firebase config from `broski-code-snippets.md` → `src/services/firebase/db.js`
- [ ] Create `.env` file with Firebase keys
- [ ] Copy Zustand stores from snippets file
- [ ] Get Windsurf from windsurf.com, install VS Code extension

**Day 6-7:**
- [ ] Set up Windsurf AI Rules (see `broski-dev-tools.md`)
- [ ] Test Vite dev server: `npm run dev`
- [ ] Test Storybook: `npm run storybook`
- [ ] First commit to GitHub

---

### **Week 2-3: Kid Experience** 👾

**Day 8-10:**
- [ ] **Windsurf Cascade Prompt #1:** Build GameBoard component (from `broski-dev-tools.md`)
- [ ] Cascade generates 3D board with 50 spaces
- [ ] Test in Storybook
- [ ] Review + approve Cascade changes

**Day 11-13:**
- [ ] **Windsurf Cascade Prompt #2:** Build Avatar component
- [ ] Avatar animates between board spaces
- [ ] Test movement animation
- [ ] Approval notifications ready

**Day 14:**
- [ ] **Build Coin Counter HUD** (copy from snippets)
- [ ] Test animations
- [ ] Weekly demo to yourself 🎉

---

### **Week 3-4: Parent Dashboard** 👨‍💼

**Day 15-17:**
- [ ] **Windsurf Cascade Prompt #3:** Parent Approval Dashboard
- [ ] Real-time task approval queue from Firebase
- [ ] Test approve/reject flow
- [ ] Approval updates avatar movement

**Day 18-20:**
- [ ] Build Family Leaderboard (copy from snippets)
- [ ] Real-time sibling rankings
- [ ] Stats page
- [ ] Test with 2+ avatars

**Day 21:**
- [ ] End-to-end testing: Task → Approval → Avatar Movement → Leaderboard
- [ ] All core features working ✅

---

### **Week 4-5: Progression System** ⭐

**Day 22-24:**
- [ ] Avatar leveling system (from codemap)
- [ ] Experience bar
- [ ] Level-up notifications
- [ ] Cosmetics unlock on level up

**Day 25-27:**
- [ ] Streak tracking display
- [ ] Streaks page
- [ ] Bonus coins for streaks
- [ ] Fading rewards system (long-term behavior)

**Day 28:**
- [ ] Boss battle mechanic (optional, stretch goal)
- [ ] Test all progression flows

---

### **Week 5-6: Polish & Deploy** 🎯

**Day 29-31:**
- [ ] Sound effects (use Windsurf to add Howler.js)
- [ ] Smooth animations everywhere
- [ ] Fix mobile responsiveness
- [ ] Test on real phones

**Day 32-35:**
- [ ] Jest tests for critical flows (codemap section)
- [ ] Error handling
- [ ] Loading states
- [ ] PWA manifest setup

**Day 36-42:**
- [ ] Deploy to Vercel (one-click from GitHub)
- [ ] Firebase deployment
- [ ] User testing with real kids & parents
- [ ] Bug fixes + iterations
- [ ] **SHIP IT** 🚀

---

## 🎯 Key Success Metrics

- [ ] Kid avatar moves smoothly when task approved ✓
- [ ] Parent approves task in <10 seconds ✓
- [ ] Coins visible, level-up celebrated ✓
- [ ] Leaderboard updates real-time ✓
- [ ] Works on mobile (iPhone + Android) ✓
- [ ] Offline-first (works without internet) ✓
- [ ] No crashes after 10 min of play ✓

---

## 🛠️ Your Daily Workflow (ADHD Optimized)

### **Morning Setup (5 min)**
```
1. Open VS Code
2. Run: npm run dev (Vite dev server)
3. Run: npm run storybook (component preview)
4. Open Windsurf
5. Open broski-codemap.md as reference
6. Grab coffee ☕
```

### **Hyperfocus Session (30-45 min)**
```
1. Pick ONE component from codemap (e.g., "GameBoard")
2. Copy relevant Windsurf prompt from dev-tools.md
3. Paste into Windsurf Cascade
4. Let it generate
5. Review code + approve changes
6. See live preview in Storybook
7. Commit to GitHub
8. Celebrate 🎉
```

### **After Session**
```
1. Run npm test (see green checkmarks)
2. Screenshot or record quick demo
3. Update your progress in README
4. Push to GitHub
5. Take a break
```

---

## 🚨 Common Pitfalls (Avoid These)

❌ **Don't start with all features at once** – MVP first, scale later
❌ **Don't skip testing approval flow** – This is your core mechanic
❌ **Don't hardcode coin values** – Use constants (codemap shows how)
❌ **Don't deploy without Firebase security rules** – Copy from codemap
❌ **Don't forget .env file** – Firebase keys won't load otherwise
❌ **Don't test only desktop** – Mobile is how kids use it

---

## ✅ Pre-Launch Checklist (Day 35)

### **Code Quality**
- [ ] All components in Storybook render without errors
- [ ] Jest tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] Code follows project conventions (AI Rules set in Windsurf)
- [ ] All imports resolve correctly

### **Features**
- [ ] Kid can submit task
- [ ] Parent can approve/reject
- [ ] Avatar moves on approval
- [ ] Coins awarded
- [ ] Level increases after 100 XP
- [ ] Leaderboard updates real-time
- [ ] Streaks tracked
- [ ] Badges display

### **Deployment**
- [ ] GitHub repo created + all commits pushed
- [ ] Vercel project linked to GitHub
- [ ] Firebase project deployed + security rules active
- [ ] Environment variables set (.env.production)
- [ ] Firebase Emulator tested locally
- [ ] 404 page configured
- [ ] Domain alias set (optional)

### **User Experience**
- [ ] App works on iPhone 12 and up
- [ ] App works on Android 10 and up
- [ ] Offline mode works (PWA)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Page loads in < 3 seconds
- [ ] Animations smooth (60 FPS)
- [ ] Dark mode works (optional)

### **Security**
- [ ] API keys in .env (never in code)
- [ ] Firebase rules restrict access
- [ ] No sensitive data in logs
- [ ] HTTPS enabled
- [ ] CORS configured properly

---

## 📞 Quick Troubleshooting

| **Problem** | **Solution** |
|-----------|-----------|
| **Vite won't start** | Delete `node_modules` + `npm install` again |
| **Firebase connection fails** | Check .env file, ensure API key is correct |
| **3D board doesn't render** | Ensure Three.js installed, clear browser cache |
| **Avatar doesn't move** | Check Zustand store subscription, verify position state |
| **Approval task not reflected** | Firebase listener might not be subscribed, check console |
| **Storybook error** | Run `npm run storybook -- --force` to rebuild |
| **Build fails on Vercel** | Check Vercel environment variables match .env.example |

---

## 🎮 Feature Ideas (After MVP)

**Phase 2 (Weeks 6-8):**
- Boss battles
- Seasonal board themes (Kitchen Quest, Garden Adventure, etc)
- More cosmetics (100+ hats, wings, pets)
- Multiplayer quests (siblings team up)

**Phase 3 (Weeks 8-10):**
- Mobile app (React Native)
- Voice logging ("Hey Alexa, I did the dishes!")
- Leaderboard achievements
- Friend invites
- Marketplace (kids trade cosmetics)

---

## 📖 Documentation to Maintain

**Create these files in your repo:**

1. **README.md** – What is BROski? How to run locally?
2. **ARCHITECTURE.md** – How components talk to each other
3. **FIREBASE.md** – Firestore collections & security rules
4. **CONTRIBUTING.md** – If others help code
5. **DEPLOYMENT.md** – How to deploy updates

---

## 🎯 Your North Star (Remember This)

**BROski is NOT just another chore app.**

It's a **dopamine-engineered system** that:
- Makes kids WANT to do chores (not forced)
- Teaches responsibility through progression
- Celebrates small wins (coins, badges, levels)
- Shows real progress (3D board, avatar growth)
- Involves parents (approval + leaderboard)
- Works on any device (web + mobile)

**You're solving a real problem:** Kids struggle with chores. Parents struggle to motivate them. This app bridges that gap through **game design + psychology + real-time feedback**.

This is HUGE potential, mate. Let's ship it.

---

## 🚀 NOW GO BUILD

1. Open `broski-codemap.md`
2. Read Week 1 section
3. Create Vite project
4. Install dependencies
5. Set up Firebase
6. Get Windsurf
7. Pick first Cascade prompt
8. **START BUILDING**

You've got everything you need. The codemap is your blueprint. The tools are battle-tested. The code snippets are copy-paste ready.

**No more planning. Time to ship. Let's go, BROski.** 🎮🚀

---

**Questions?** Re-read the section in whichever doc matches your question. Windsurf can help with code issues. Perplexity can help with concepts.

**You got this.** 💪
