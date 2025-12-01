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

### GitHub Pages (User Page: bwang257.github.io)

This repository is configured for GitHub Pages deployment. Follow these steps:

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to GitHub Pages:**
```bash
npm run deploy
```

This will:
- Build your React app for production
- Deploy the `dist` folder to the `gh-pages` branch
- Your site will be available at `https://bwang257.github.io`

3. **Configure GitHub Pages (if not already done):**
   - Go to your repository: `https://github.com/bwang257/bwang257.github.io`
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **gh-pages** branch and **/ (root)** folder
   - Click **Save**

4. **Wait for deployment:**
   - GitHub Pages typically takes 1-2 minutes to update
   - Your site will be live at `https://bwang257.github.io`

### Updating Your Site

After making changes:
```bash
npm run build
npm run deploy
```

Your changes will be live in a few minutes!

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
