# 📅 PlanIt: Automated Event Management System

An **offline-enhanced, centralized web platform** designed to streamline event registration, attendance tracking, and certificate generation for educational institutions.

## Live Link 🔗
**[Insert Project Live Link Here]**

---

## 🚨 Problem

Event management within educational institutions (colleges, universities) is often inefficient and prone to errors due to a reliance on fragmented, low-feature tools:

- ❌ **Manual Capacity Control:** Tools like Google Forms allow over-registration, forcing administrators to manually monitor and stop sign-ups.
- ❌ **Fragmented Workflow:** Registration, attendance tracking (check-ins), and certificate issuance are handled on separate platforms, leading to massive manual administrative overhead.
- ❌ **Poor User Experience:** Participants lack a central hub to view registered events, track their attendance, or retrieve attendance certificates.

---

## 💡 Our Solution

**PlanIt** provides a seamless, centralized platform to automate the entire event lifecycle for institutional administrators and participants:

- **Real-Time Capacity Enforcement** → Instantly closes registration when seat limits are met, eliminating over-registration.
- **Digital Check-In** → Provides a simple, secure mechanism for participants to mark their attendance.
- **Automated Certification** → Automatically generates personalized digital certificates for all attendees, eliminating manual design and distribution.
- **Centralized Dashboard** → Offers administrators and users clear views of events, registrations, and attendance data.

---

## ✨ Features

- **✅ Real-Time Registration:** Events posted with hard seat limits; registration stops automatically upon reaching capacity.
- **👤 User Event Hub (My Events Page):** Participants can view all their registered, attended, or missed events, with dynamic status displays.
- **🏆 Auto-Certificate Generation:** Instant, personalized certificate generation is triggered upon successful attendance check-in.
- **🎨 Dynamic Visuals:** Event cards are visually tagged (e.g., color-coded borders) based on registration status (`Registered`, `Attended`, `Missed`).

---

## 🛠️ Tech Stack

### Frontend (User Interface & Logic)
- **React** → Component-driven architecture for modular and scalable UI (Used for Home, About Us, My Events pages).
- **Tailwind CSS** → Utility-first framework for rapid, responsive, and consistent styling across all pages.
- **React Router DOM** → Handling client-side routing and navigation between pages (e.g., `/events`, `/about`, `/my-events`).

### Backend (Server Logic & Data)
- **Node.js + Express.js** → Robust REST API to handle user authentication, event posting, and registration logic.
- **[Insert Database Name Here]** → Persistence for event records and registration data.
- **Axios Instance** → Managing API communication (like fetching registration records on the My Events page).

---

## 📦 Installation & Setup

### A. Frontend Setup (Client)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/PlanIt.git](https://github.com/your-username/PlanIt.git)
   cd PlanIt/client