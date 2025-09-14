# Express-0912 Project

A full-stack web application built with React frontend and Express.js backend, using modern ES modules and development tools.

## 🏗️ Architecture

- **Frontend**: React 19.1.1 with Vite build tool
- **Backend**: Express.js 5.1.0 with ES modules
- **Development**: Hot reload and proxy configuration
- **Production**: Static file serving from Express

## 📁 Project Structure

```
express-0912/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # React entry point
│   ├── public/
│   ├── vite.config.js     # Vite configuration with proxy
│   └── package.json
├── server/                 # Express.js backend
│   ├── server.mjs         # Main server file (ES modules)
│   └── package.json
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd express-0912
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Development

Run both frontend and backend in development mode:

```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend development server
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend API: `http://localhost:5000`
- API routes are proxied through Vite in development

### Production Build

1. Build the React application:
```bash
cd client
npm run build
```

2. Start the production server:
```bash
cd server
npm start
```

In production mode, Express serves the built React app from `client/dist` along with API routes.

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api`   | Returns a greeting message |
| POST   | `/api`   | Echoes back the request body |

## 🛠️ Technology Stack

### Frontend
- **React** 19.1.1 - Modern React with latest features
- **Vite** 7.x - Fast build tool and dev server
- **ESLint** - Code linting with modern flat config

### Backend
- **Express.js** 5.1.0 - Web framework
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript module system

## 📝 Development Features

### Environment-Aware Configuration
The server automatically switches behavior based on `NODE_ENV`:

- **Development**: CORS enabled, API-only mode
- **Production**: Serves static React build + API routes

### Proxy Configuration
Vite is configured to proxy `/api` requests to the Express server during development, enabling seamless full-stack development.

### Modern JavaScript
Both client and server use ES modules (`"type": "module"`) and modern JavaScript features.

## 🔧 Configuration Files

- `client/vite.config.js` - Vite configuration with proxy setup
- `client/eslint.config.js` - Modern flat ESLint configuration
- `server/server.mjs` - Main Express server with environment switching

## 📋 Available Scripts

### Client (React)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server (Express)
```bash
npm start        # Start production server
npm run dev      # Start development server
```

## 🌐 Deployment

For production deployment:

1. Build the client application
2. Set `NODE_ENV=production`
3. Start the server - it will serve both the React app and API

The server will automatically serve the built React application from `client/dist` when in production mode.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both client and server
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 5000 (server) and 5173 (client) are available
2. **Dependency issues**: Delete `node_modules` and run `npm install` again
3. **Proxy errors**: Check that the backend server is running on port 5000

### Development Tips

- Use browser developer tools to debug API calls
- Check both terminal outputs for errors
- The Vite proxy configuration handles CORS in development
- In production, make sure the client build exists before starting the server
