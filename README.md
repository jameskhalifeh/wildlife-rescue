# Wildlife Rescue Lebanon — Mobile Application

A React Native (Expo) mobile application for managing wildlife rescue missions in Lebanon. The app connects admins who coordinate rescues with volunteers who carry them out in the field.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Screens](#screens)
- [Authentication](#authentication)
- [Navigation Flow](#navigation-flow)
- [Theming & Styles](#theming--styles)
- [Mock Data](#mock-data)
- [Collaboration](#collaboration)
- [Backend Integration Guide](#backend-integration-guide)

---

## Overview

When an injured animal is reported, the admin creates a rescue mission in the app. Volunteers receive it with a live map showing the route to the animal. The admin tracks the rescue in real-time and marks it complete once the animal is safely delivered to the center.

**Two roles:**
- **Admin** — creates missions, monitors volunteers, marks missions complete
- **Volunteer** — views available missions, navigates to the animal, accepts or declines

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.81.5 | Mobile framework |
| Expo | SDK 54 | Development platform |
| React Navigation | v7 | Screen navigation |
| react-native-safe-area-context | 5.6.0 | Safe area handling |
| react-native-screens | 4.16.0 | Navigation optimization |
| @expo/vector-icons | — | Ionicons icon set |
| babel-preset-expo | 13.0.0 | JSX transpilation |

---

## Getting Started

### Prerequisites
- Node.js installed
- Expo Go app on your phone (iOS or Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/jameskhalifeh/wildlife-rescue.git

# Navigate into the project
cd wildlife-rescue

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go on your phone to run the app.

---

## Project Structure

```
wildlife-rescue/
├── App.jsx                          # Entry point, navigation & auth setup
├── babel.config.js                  # Babel configuration
├── package.json                     # Dependencies
├── .gitignore                       # Excludes node_modules, .expo
└── src/
    ├── context/
    │   └── AuthContext.js           # Global auth state (role, login, logout)
    ├── components/
    │   ├── BottomTabBar.jsx         # Role-based bottom navigation
    │   └── StatusBadge.jsx          # Urgency/status badge component
    ├── screens/
    │   ├── LoginScreen.jsx          # Login for admin and volunteer
    │   ├── RegisterScreen.jsx       # Volunteer account registration
    │   ├── HomeScreen.jsx           # Admin dashboard
    │   ├── NewMissionScreen.jsx     # Admin creates a mission
    │   ├── MissionDetailsScreen.jsx # Mission info + live map (volunteer)
    │   ├── MissionTrackingScreen.jsx# Admin tracks volunteer in real-time
    │   ├── MissionCompletedScreen.jsx # Admin marks mission complete
    │   ├── VolunteersScreen.jsx     # Admin views all volunteers
    │   ├── AdminScreen.jsx          # Admin panel with stats and activity
    │   ├── ReportsScreen.jsx        # Reports for volunteer
    │   ├── ReportsAdminScreen.jsx   # Reports for admin
    │   ├── VolunteerHomeScreen.jsx  # Volunteer sees available missions
    │   └── ProfileScreen.jsx        # Volunteer profile and logout
    └── theme/
        ├── colors.js                # Centralized color palette
        └── styles.js                # All StyleSheet styles (one file)
```

---

## Screens

### Admin Screens

| Screen | Description |
|---|---|
| **Login** | Admin signs in with email and password |
| **Home Dashboard** | Overview of active missions, alerts, and stats |
| **New Mission** | Form to create a new rescue mission |
| **Mission Tracking** | Real-time map tracking of volunteer progress |
| **Mission Completed** | Confirms mission is complete with summary |
| **Volunteers** | List of all volunteers with availability status |
| **Admin Panel** | Full overview: stats, quick actions, pending assignments, activity log |
| **Reports** | Mission reports and statistics |

### Volunteer Screens

| Screen | Description |
|---|---|
| **Login** | Volunteer signs in with email and password |
| **Register** | New volunteer creates an account (pending admin approval) |
| **Volunteer Home** | List of available missions to accept |
| **Mission Details** | Full mission info with live map from volunteer to animal |
| **Profile** | Personal info, mission stats, specialties, logout |
| **Reports** | Volunteer's own mission history |

---

## Authentication

### How it works (prototype)
- The login screen has a toggle: **Volunteer** or **Admin**
- Both use **email + password**
- Role is assigned based on which tab is selected
- Any non-empty email and password works in the prototype

### How it will work (production)
- Credentials are sent to the backend server
- Backend validates against the database and returns a **JWT token**
- The token is stored and sent with every API request
- The backend returns the user's **role** (`admin` or `volunteer`)
- The app renders the correct UI based on that role

### Admin Account
The admin account is **created once manually** by the backend developer directly in the database. There is no admin registration in the app.

```
email:    admin@wildlife.lb
password: (set by backend developer, hashed in database)
role:     admin
```

### Volunteer Account
Volunteers register through the app. Their account is **pending approval** until an admin activates it in the backend.

---

## Navigation Flow

### Admin Flow
```
Login → Home Dashboard
  ├── New Mission tab → Create Mission → Home
  ├── Mission card → Mission Tracking → Mark Complete → Mission Completed → Home
  ├── Volunteers tab → Volunteers List
  ├── Reports tab → Reports
  └── Admin tab → Admin Panel (logout here)
```

### Volunteer Flow
```
Login → Volunteer Home (available missions)
  ├── Mission card → Mission Details + Live Map → Accept → Volunteer Home
  │                                             → Decline → back
  └── Profile tab → Profile (logout here)
```

---

## Theming & Styles

All colors are defined in one place:

```
src/theme/colors.js
```

All styles are defined in one place, exported per screen:

```
src/theme/styles.js

Exports:
  statusBadgeStyles
  bottomTabBarStyles
  homeStyles
  newMissionStyles
  missionDetailsStyles
  missionTrackingStyles
  missionCompletedStyles
  volunteersStyles
  adminStyles
  loginStyles
  registerStyles
  volunteerHomeStyles
  profileStyles
```

Each screen imports only its own styles:
```js
import { homeStyles as styles } from '../theme/styles';
```

**Color theme:** White/light background with dark forest green (`#3a6b2e`) as the primary action color.

---

## Mock Data

All data in the app is currently hardcoded as prototype placeholders. Every constant array across all screens needs to be replaced with a real API call when the backend is ready.

| Constant | Screen | Replace with |
|---|---|---|
| `MISSIONS` | HomeScreen | `GET /api/missions?status=active` |
| `ALERTS` | HomeScreen | `GET /api/alerts` |
| `OVERVIEW` | AdminScreen | `GET /api/stats/today` |
| `PENDING` | AdminScreen | `GET /api/missions?status=pending` |
| `ACTIVITY` | AdminScreen | `GET /api/activity` |
| `QUICK_ACTIONS` | AdminScreen | Static (navigation only) |
| `VOLUNTEERS` | VolunteersScreen | `GET /api/volunteers` |
| `AVAILABLE` | VolunteerHomeScreen | `GET /api/missions?status=available` |
| `MY_MISSION` | VolunteerHomeScreen | `GET /api/missions/my-active` |

---

## Collaboration

### Pull latest changes before starting work
```bash
git pull origin main
```

### Push your changes
```bash
git add .
git commit -m "describe what you changed"
git push origin main
```

### Always pull before you push to avoid conflicts.

---

## Backend Integration Guide

When the backend is ready, the frontend needs the following from the API:

### Authentication
- `POST /api/auth/login` — returns `{ token, role, user }`
- Store token, use it in all request headers: `Authorization: Bearer <token>`

### Missions
- `GET /api/missions` — list all missions (with filters: status, urgency)
- `POST /api/missions` — create a new mission (admin only)
- `PUT /api/missions/:id/accept` — volunteer accepts a mission
- `PUT /api/missions/:id/complete` — admin marks mission complete

### Volunteers
- `GET /api/volunteers` — list all volunteers (admin only)
- `POST /api/volunteers/register` — volunteer creates account
- `PUT /api/volunteers/:id/approve` — admin approves volunteer account

### Tracking
- Real-time location updates via **WebSockets** or polling
- `PUT /api/missions/:id/location` — volunteer sends their current location
- Admin receives live updates on MissionTrackingScreen

### Stats & Reports
- `GET /api/stats/today` — dashboard overview numbers
- `GET /api/activity` — recent activity log
- `GET /api/reports` — mission history and reports

---

## Project Info

- **Started:** June 26, 2026
- **Repository:** https://github.com/jameskhalifeh/wildlife-rescue
- **Platform:** iOS and Android (via Expo)
- **Status:** Frontend complete, backend integration pending
