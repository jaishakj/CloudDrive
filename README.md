# CloudDrive

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui" alt="shadcn/ui">
</p>

<p align="center">
  <b>Your Files, Everywhere. Unified.</b>
</p>

<p align="center">
  Transform YouTube, Telegram, and GitHub into your personal cloud storage. 
  One dashboard, unlimited possibilities.
</p>

---

## ✨ Features

### 🌐 Multi-Platform Integration
- **YouTube** - Store and manage video content
- **Telegram** - Upload files via private channels
- **GitHub** - Version control and code storage
- **Local Storage** - Traditional cloud storage

### 📁 File Management
- **Unified Dashboard** - View all files from connected platforms in one place
- **Smart Upload** - Drag, drop, or paste files with intelligent routing
- **Folder Organization** - Create folders and organize files efficiently
- **Search & Filter** - Quickly find files by name, platform, or type

### 🔗 Sharing & Collaboration
- **Instant Share Links** - Generate shareable links in seconds
- **Access Control** - Set permissions and password protection
- **Download Tracking** - Monitor how many times files are downloaded
- **Expiration Dates** - Set links to expire after a specific time

### 🎨 Modern UI/UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode** - Comfortable viewing in any environment
- **Smooth Animations** - Polished interactions and transitions
- **Glass Morphism** - Modern visual aesthetics

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clouddrive.git
   cd clouddrive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

---

## 📁 Project Structure

```
clouddrive/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles & Tailwind
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

---

## 🔌 Platform Integrations

### Telegram
- Connect via Bot API
- Upload files to private channels
- Automatic file indexing
- Maximum file size: 2GB

### YouTube
- OAuth 2.0 authentication
- Video upload and management
- Thumbnail generation
- Privacy settings control

### GitHub
- GitHub App integration
- Repository-based storage
- Version history tracking
- Branch management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Animations** | CSS + GSAP ready |
| **Notifications** | Sonner |

---

## 📱 Screenshots

### Landing Page
Beautiful, animated landing page with feature highlights and pricing information.

### Dashboard
Intuitive file management interface with platform filtering and folder navigation.

### Upload Dialog
Multiple upload options: local files, URL import, or platform-specific imports.

### Share Dialog
Generate shareable links with customizable permissions and expiration settings.

---

## 🎯 Roadmap

- [ ] **Backend API** - Node.js/Express server for file operations
- [ ] **Database** - PostgreSQL for metadata and user management
- [ ] **Authentication** - JWT-based auth with social login
- [ ] **Real-time Sync** - WebSocket for live updates
- [ ] **Mobile App** - React Native companion app
- [ ] **File Previews** - In-browser document and media viewing
- [ ] **Collaboration** - Real-time editing and comments
- [ ] **API Access** - RESTful API for third-party integrations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact us at support@clouddrive.app

---

<p align="center">
  Made with ❤️ by the CloudDrive Team
</p>
