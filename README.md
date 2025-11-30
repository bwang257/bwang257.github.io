# Brian Wang - Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern, clean design with dark theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast performance with Vite
- 🎯 Smooth scrolling navigation
- ✨ Animated sections with intersection observer
- 🌐 Particle network background animation
- 🚀 Optimized for production deployment

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GitHub Pages** - Hosting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bwang257/brian-portfolio.git
cd brian-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Custom Base Path

If deploying to a subdirectory (e.g., `username.github.io/repo-name`), set the base path:

1. Create a `.env.production` file:
```
VITE_BASE_PATH=/repo-name/
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── index.css        # Global styles and Tailwind imports
└── components/      # Reusable components (if any)
```

## Customization

- Update personal information in `src/App.jsx`
- Modify colors in `tailwind.config.js`
- Adjust animations and effects in component files
- Update project details in the Projects section

## License

MIT License - feel free to use this template for your own portfolio!
