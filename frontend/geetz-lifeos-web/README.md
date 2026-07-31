# Geetz-LifeOS 🚀

**Geetz-LifeOS** is a beautiful, production-grade personal productivity and life operating system inspired by the premium Google Stitch visual design. It provides a real-time, local-first engine to organize and gamify habits, planner backlogs, goal systems, focus sessions, and performance analytics.

---

## ✨ Features

### 1. 🎛️ Unified Dashboard
*   **Dynamic Greeting**: Greets you based on your local hour (e.g. *Good Morning*, *Good Evening*, *Good Night*).
*   **Daily Progress**: A combined tracking circle summarizing habits and tasks completed today.
*   **Productivity Score**: A dynamic score from `0` to `100` calculated from your tasks completed, habits checked, goals progressed, focus sessions logged, and consecutive streak bonus.
*   **Active Streak**: An activity-store streak calculator that increments on consecutive days of logged activity.
*   **Top Priorities**: Sorted backlog highlighting high-priority incomplete items first.

### 2. 📅 Habit Tracker
*   **Interactive Calendar Grid**: Log and visualize monthly history at a glance.
*   **Custom Habit Creation**: Modern modal supporting horizontal color swatches, icon selection, and custom category tags.
*   **Streaks & Averages**: Live habit-specific streak metrics and weekly average trends.

### 3. ⏱️ Planner & Pomodoro Timer
*   **Interactive Timeline**: Schedule and assign tasks directly to timeline hour slots.
*   **Integrated Pomodoro Timer**: A 25-minute focus countdown timer that increments your active focus hours dynamically upon completion.
*   **Task Management**: Easy add/edit modal for planning out descriptions, priority badges, and target hours.

### 4. 🎯 Goal System
*   **Bento Card Grid**: Group your vision into distinct categories (Career, Health, Growth, Finance) and priorities.
*   **Detail Edit Modal**: Full responsiveness to adjust goals progress percentages, target dates, descriptions, or mark completion.
*   **System Activity Heatmap**: Visualizes your consistency over the last 21 days.

### 5. 📊 Live Analytics
*   **Contribution Heatmap**: A complete grid reflecting daily activity levels (`0` through `4`) based on your historical checkins.
*   **Life Balance Radar**: A dynamic radial chart mapping progress across four dimensions (Health, Coding, Social, Growth) that collapses to a zero-state if no logs exist.
*   **Productivity Cycles**: Graph charting your output score variance over the last 9 days.

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router, Turbopack)
*   **Language**: TypeScript
*   **State Management**: Zustand (local-first with robust LocalStorage persistence)
*   **Styling**: Tailwind CSS v4, Google Fonts (Outfit, Inter)
*   **Icons**: Material Symbols

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/Geetz-LifeOS.git
    cd Geetz-LifeOS/frontend/geetz-lifeos-web
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to start tracking!

---

## 📋 Production Verification

Run the linter and production build commands to verify build health:

```bash
# Run ESLint check
npm run lint

# Run Next.js production build compiler
npm run build
```

---

## 🔮 Future Roadmap (v1.1+)

*   **Cloud Sync**: Database integration to backup and sync your tasks/habits across multiple browsers.
*   **User Authentication**: Safe and personalized user signup/signin.
*   **Google Calendar Sync**: Pull external events directly into the planner timeline.
*   **AI Daily Planner Suggestions**: Intelligent recommendations to sequence and optimize your daily agenda.
*   **Native Notifications**: Desktop or mobile reminders for habits and focus slots.
