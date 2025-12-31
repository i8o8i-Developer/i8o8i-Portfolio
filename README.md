```
 ____   ___  ____ _____ _____ ___  _     ___ ___  
|  _ \ / _ \|  _ \_   _|  ___/ _ \| |   |_ _/ _ \ 
| |_) | | | | |_) || | | |_ | | | | |    | | | | |
|  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
|_|    \___/|_| \_\|_| |_|   \___/|_____|___\___/ 
                                                   
```

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-i8o8i-10B981?style=for-the-badge&logo=react&logoColor=white)
![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0.12-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

**A Modern, Responsive Portfolio Showcasing Full-Stack Development, AI/ML Projects, And Cybersecurity Expertise**

</div>

---

## 📋 Table Of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
  - [Email Template Preview](#email-template-preview)
- [Performance Optimizations](#performance-optimizations)
- [Email System](#email-system)
- [Deployment](#deployment)
- [Responsive Design](#responsive-design)
- [Projects Showcase](#projects-showcase)
- [Contact](#contact)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

This Portfolio Is A Comprehensive Showcase Of My Journey As A **Multi-Disciplinary Software Engineer** Specializing In **AI/ML Systems**, **Backend Development**, **Cybersecurity**, And **Full-Stack Applications**. Built With Modern Web Technologies, It Demonstrates Expertise In Creating Performant, Accessible, And Visually Stunning Web Experiences.

### Why This Portfolio?

- **Performance First**: Optimized Animations, Lazy Loading, And Efficient Rendering For Smooth User Experience
- **Fully Responsive**: Seamless Experience Across All Devices From Mobile (320px) To Large Displays (2560x1600)
- **Accessibility**: WCAG 2.1 Compliant With Keyboard Navigation, ARIA Labels, And Screen Reader Support
- **Modern Stack**: Leveraging React 18, TypeScript, Tailwind CSS, And Cutting-Edge Libraries
- **Real Projects**: Showcasing 14+ Production-Ready Projects With Measurable Impact

---

## ✨ Key Features

### 🎨 Design & UX
- **Custom Cursor Effects**: Interactive Trail Cursor With Smooth Animations
- **Scroll Reveal Animations**: Directional Fade-In Effects For Engaging Content Discovery
- **Dark Theme**: Modern Dark Mode Optimized For Reduced Eye Strain
- **Smooth Scrolling**: Buttery Smooth Navigation With Custom Easing Functions
- **3D Elements**: Three.js Integration For Immersive Visual Experiences

### 📱 Responsive Breakpoints
- **Mobile**: 320px - 640px (Compact Layouts)
- **Tablet**: 640px - 1024px (Medium Spacing)
- **Laptop**: 1024px - 1366px (Optimized For Common Displays)
- **Desktop**: 1366px - 1920px (Standard Desktop Experience)
- **Large Display**: 2560x1600+ (Enhanced Spacing And Typography)

### 🚀 Performance
- **Optimized Animations**: Reduced Trail Points (8 Instead Of 15) And Throttled Scroll Events
- **Lazy Loading**: Components And Images Load On-Demand
- **Code Splitting**: Automatic Chunking For Faster Initial Load
- **Efficient Re-Renders**: Memoization And Proper React Hooks Usage

### 📊 Sections
1. **Hero**: Dynamic Introduction With Animated Statistics
2. **About**: Personal Story And Expertise Overview
3. **Experience**: Interactive Timeline With 6+ Professional Roles
4. **Projects**: 14 Projects Across AI/ML, Security, Blockchain, Full-Stack, DevOps, And Automation
5. **Skills**: 9 Categories With 40+ Technologies And Proficiency Levels
6. **Certifications**: 9 Industry Certifications From Google, Anthropic, Forage
7. **Testimonials**: Client Feedback Carousel
8. **Contact**: Professional Email System With Dual Templates (Admin + User Confirmation)

---

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI Library With Concurrent Features
- **TypeScript 5.6** - Type-Safe Development
- **Vite 7.3.0** - Next-Generation Frontend Tooling
- **Tailwind CSS** - Utility-First CSS Framework
- **React Router DOM 6.30.1** - Client-Side Routing
- **Nodemailer 7.0.12** - Email Sending Library
- **date-fns 3.6.0** - Modern Date Utility Library

### UI Components
- **Radix UI** - Accessible Component Primitives
  - Accordion, Alert Dialog, Collapsible, Dialog, Dropdown Menu
  - Navigation Menu, Popover, Scroll Area, Select, Tabs, Toast, Tooltip
  - Context Menu, Hover Card, Menubar, Progress, Radio Group, Slider, Switch
- **Embla Carousel** - Smooth Carousel Component
- **Recharts** - Chart Library For Data Visualization
- **Sonner** - Toast Notifications
- **Lucide React** - Modern Icon Library (460+ Icons)
- **Class Variance Authority** - Component Variant Management
- **clsx + tailwind-merge** - Conditional Class Utilities

### 3D & Animation
- **Three.js + @react-three/fiber** - 3D Graphics Rendering
- **@react-three/drei** - Three.js Helpers And Abstractions
- **Framer Motion** - Production-Ready Animation Library

### Forms & Validation
- **React Hook Form** - Performant Form Library
- **Zod** - TypeScript-First Schema Validation
- **@hookform/resolvers** - Validation Integration

### Backend Integration
- **Nodemailer** - Professional Email Sending With SMTP Support
- **@vercel/node** - Vercel Serverless Functions Support
- **@tanstack/react-query** - Server State Management

### Development Tools
- **ESLint** - Code Linting
- **PostCSS + Autoprefixer** - CSS Processing
- **TypeScript ESLint** - TypeScript Linting
- **@vitejs/plugin-react-swc** - Fast Refresh With SWC
- **Lovable Tagger** - Component Development Tool
- **@tailwindcss/typography** - Typography Plugin For Prose Content

---

## 📁 Project Structure

```
i8o8i-Portfolio/
├── api/                         # Vercel Serverless Functions
│   └── send-email.ts            # Email API Endpoint (Nodemailer)
├── Public/                      # Static Assets
│   └── Email-Preview.html       # Email Templates Preview
├── Src/
│   ├── Assets/                  # Images, Fonts, And Media Files
│   ├── Components/              # React Components
│   │   ├── About.tsx            # About Section
│   │   ├── AnimatedCounter.tsx  # Number Animation Component
│   │   ├── BackToTop.tsx        # Scroll-To-Top Button
│   │   ├── Certificates.tsx     # Certification Showcase
│   │   ├── Contact.tsx          # Contact Section
│   │   ├── ContactForm.tsx      # Form With Validation
│   │   ├── CustomCursor.tsx     # Interactive Cursor
│   │   ├── Experience.tsx       # Career Timeline
│   │   ├── FixedSocialLinks.tsx # Social Media Sidebar
│   │   ├── Footer.tsx           # Footer With Canvas Animation
│   │   ├── Hero.tsx             # Landing Section
│   │   ├── LoadingScreen.tsx    # Initial Loading Animation
│   │   ├── Navbar.tsx           # Navigation Header
│   │   ├── Projects.tsx         # Project Showcase
│   │   ├── ScrollReveal.tsx     # Scroll Animation Wrapper
│   │   ├── Skills.tsx           # Skills Grid
│   │   ├── TerminalShowcase.tsx # Terminal Animation
│   │   ├── Testimonials.tsx     # Client Testimonials
│   │   └── UI/                  # Reusable UI Components
│   ├── Hooks/                   # Custom React Hooks
│   │   ├── UseInView.tsx        # Intersection Observer Hook
│   │   ├── UseSmoothScroll.tsx  # Smooth Scroll Hook
│   │   └── UseCountUp.tsx       # Number Animation Hook
│   ├── Integrations/            # (Empty - Reserved For Future Integrations)
│   ├── Lib/
│   │   └── Utils.ts             # Utility Functions
│   ├── Pages/
│   │   ├── Index.tsx            # Home Page
│   │   └── NotFound.tsx         # 404 Page
│   ├── App.tsx                  # Main App Component
│   ├── Main.tsx                 # React Entry Point
│   └── index.css                # Global Styles
├── .env                         # Environment Variables (Not Tracked - Copy From .env.example)
├── .env.example                 # Environment Variables Template (SMTP Configuration)
├── .gitignore                   # Git Ignore Rules
├── bun.lockb                    # Bun Lock File
├── Components.json              # Shadcn UI Configuration
├── eslint.config.js             # ESLint Configuration
├── index.html                   # HTML Template
├── LICENSE                      # MIT License
├── package.json                 # Dependencies And Scripts
├── postcss.config.js            # PostCSS Configuration
├── README.md                    # This File
├── tailwind.config.ts           # Tailwind Configuration With Custom Theme
├── tsconfig.app.json            # TypeScript App Configuration
├── tsconfig.json                # TypeScript Base Configuration
├── tsconfig.node.json           # TypeScript Node Configuration
└── vite.config.ts               # Vite Configuration (Port 8080, Aliases)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure You Have The Following Installed:
- **Node.js** (v18+ Recommended)
- **npm** Or **yarn** Or **pnpm** Or **bun**

### Installation

1. **Clone The Repository**
   ```bash
   git clone https://github.com/i8o8i-Developer/i8o8i-Portfolio.git
   cd i8o8i-Portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Create A `.env` File In The Root Directory (or copy from `.env.example`):
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=Your_Email@gmail.com
   SMTP_PASSWORD=Your_App_Password
   SMTP_FROM=Your_Email@gmail.com
   SMTP_FROM_NAME=Anubhav Chaurasia Portfolio
   SMTP_TO=Recipient_Email@example.com
   ```
   
   **Note For Gmail Users:**
   - Use App Passwords Instead Of Regular Passwords
   - Enable 2-Factor Authentication
   - Generate App Password: Google Account → Security → 2-Step Verification → App Passwords

### Development

Start The Development Server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The Application Will Be Available At `http://localhost:8080` (Configured In `vite.config.ts`)

### Build

Create A Production Build:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Create A Development Build (With Source Maps):
```bash
npm run build:dev
# or
yarn build:dev
# or
pnpm build:dev
# or
bun build:dev
```

Preview The Production Build:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun preview
```

### Email Template Preview

View And Test The Email Templates Before Sending:

**Option 1: Direct File Opening**
```bash
# Open In Default Browser (Windows)
start Public/Email-Preview.html

# Open In Default Browser (Mac)
open Public/Email-Preview.html

# Open In Default Browser (Linux)
xdg-open Public/Email-Preview.html
```

**Option 2: Using Dev Server**
```bash
# Start Development Server
npm run dev

# Navigate To: http://localhost:8080/Email-Preview.html
```

**Option 3: Using PowerShell (Windows)**
```powershell
Invoke-Item Public\Email-Preview.html
```

The Preview Shows Both Email Templates:
- **Admin Notification Email** - What You Receive When Someone Contacts You
- **User Confirmation Email** - What The Sender Receives As Confirmation

---

## ⚡ Performance Optimizations

### Implemented Optimizations

1. **Throttled Scroll Events**
   - BackToTop Button Uses 100ms Throttle Instead Of requestAnimationFrame
   - Prevents Excessive Re-Renders During Scroll

2. **Reduced Cursor Trail**
   - Trail Points Reduced From 15 To 8
   - Distance Threshold Increased From 8px To 15px
   - Fade Interval Increased From 30ms To 50ms

3. **Faster Animations**
   - ScrollReveal Duration Reduced From 600ms To 400ms
   - Smoother Perceived Performance

4. **Code Splitting**
   - Automatic Route-Based Splitting Via Vite
   - Lazy Loading Of Non-Critical Components

5. **Image Optimization**
   - Lazy Loading Images Below The Fold
   - Optimized Asset Sizes

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 95+ (Performance)

---

## 📧 Email System

The Portfolio Features A Professional Email System Built With **Nodemailer** And **SMTP** Integration.

### Features

1. **Dual Email System**
   - Admin Notification: Receive Contact Form Submissions
   - User Confirmation: Automatic Confirmation Email To Sender

2. **Professional Email Templates**
   - Dark Theme Matching Portfolio Design
   - Responsive HTML Emails
   - Custom Fonts (Iceberg & Silkscreen)
   - Inline CSS For Maximum Compatibility
   - Beautiful Gradient Borders And Layouts

3. **Email Preview System**
   - Live Preview HTML File (`Public/Email-Preview.html`)
   - Side-By-Side Template Comparison
   - Mock Data For Testing
   - No Backend Required For Preview

4. **Security Features**
   - Input Sanitization
   - Email Format Validation
   - Environment Variable Protection
   - Secure SMTP Connection

5. **Vercel Serverless Deployment**
   - Deployed As Vercel Serverless Function
   - `/api/send-email` Endpoint
   - Auto-Scaling And High Availability

### Email Template Structure

**Admin Email Includes:**
- Sender Name And Email (Clickable)
- Full Message Content
- Quick Reply Button
- Timestamp
- Professional Dark Theme Layout

**Confirmation Email Includes:**
- Personalized Greeting
- Message Echo For Reference
- Expected Response Time (24-48 Hours)
- Social Media Links (LinkedIn, GitHub)
- Professional Signature
- Do Not Reply Notice

### SMTP Configuration

Supports Any SMTP Provider:
- Gmail (Recommended)
- Outlook/Office 365
- SendGrid
- Mailgun
- Custom SMTP Servers

**Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password In `SMTP_PASSWORD`
4. Set `SMTP_HOST=smtp.gmail.com` And `SMTP_PORT=587`

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

The Project Is Optimized For Vercel Deployment With Serverless Functions.

1. **Push To GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Deploy To Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure Environment Variables**
   - Go To Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add All SMTP Variables From `.env`
   - Redeploy After Adding Variables

4. **API Endpoint**
   - Your API Will Be Available At: `https://your-domain.vercel.app/api/send-email`
   - Update Contact Form To Use This Endpoint

### Alternative Deployment

**Static Hosting (Netlify, Cloudflare Pages, GitHub Pages)**
- Contact Form Will Need External API
- Build: `npm run build`
- Deploy `dist` Folder

---

## �📱 Responsive Design

The Portfolio Adapts Seamlessly Across 5 Breakpoints:

| Breakpoint | Width | Target Devices | Key Changes |
|------------|-------|----------------|-------------|
| `xs` | 320px+ | Small Phones | Single Column, Compact Spacing |
| `sm` | 640px+ | Phones | 2-Column Grids, Medium Spacing |
| `md` | 768px+ | Tablets | Multi-Column Layouts, Larger Text |
| `lg` | 1024px+ | Laptops (1366x768) | Optimized Compact Layouts |
| `xl` | 1280px+ | Desktops | Standard Desktop Spacing |
| `2xl` | 1536px+ | Large Displays (2560x1600) | Enhanced Spacing And Typography |

---

## 🎨 Projects Showcase

### Featured Projects (4)

1. **AgriSense Guardian** - Multi-Agent AI System For Agriculture
   - 12,000+ Users, ₹2.3Cr Losses Prevented, 1.2s Response Time

2. **ENIGMA AI Assistant** - Sophisticated Personal AI
   - 7 AI Modules, 97.5% Security, Advanced Memory

3. **SYNRIX Version Control** - Git Alternative
   - 70% Space Savings, 100% Recovery, Quantum-Safe

4. **Pranjal Portfolio** - Full-Stack Portfolio With 3D
   - Three.js Graphics, Full CMS Admin, JWT Authentication

### Other Noteworthy Projects (10)
- Hospital Management System
- QuantumChat (Post-Quantum Messaging)
- I8o8iCoin Blockchain
- GitTracker Bot
- Telegram Identity Bot
- Django & Python Courses
- Safe Windows Repair
- WakaTime Stats
- And More...

---

## 📬 Contact

**Anubhav Chaurasia** (i8o8i Developer)

- **Email**: [dev.anubhavchaurasia@gmail.com](mailto:dev.anubhavchaurasia@gmail.com)
- **GitHub**: [@i8o8i-Developer](https://github.com/i8o8i-Developer)
- **LinkedIn**: [anubhav16o8](https://linkedin.com/in/anubhav16o8)
- **Kaggle**: [anubhav16o8](https://kaggle.com/anubhav16o8)

---

## 📄 License

This Project Is Licensed Under The **MIT License** - See The [LICENSE](LICENSE) File For Details.

---

## 🙏 Acknowledgments

- **Radix UI** - For Accessible Component Primitives
- **Shadcn UI** - For Beautiful Component Designs
- **Tailwind CSS** - For Rapid Styling
- **Three.js** - For 3D Graphics Capabilities
- **Lucide** - For Elegant Icons
- **Nodemailer** - For Professional Email Functionality
- **Vercel** - For Seamless Deployment And Serverless API Hosting

---

<div align="center">

**⭐ Star This Repository If You Found It Helpful!**

Made with ❤️ by [i8o8i Developer](https://github.com/i8o8i-Developer)

</div>