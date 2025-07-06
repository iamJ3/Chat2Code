# AI Chat App

A real-time collaborative code editor and AI-powered development environment built with React, Node.js, and WebContainers. Features a modern, component-based architecture with enhanced output display and comprehensive language support.

## 🚀 Features

### Core Features
- **Real-time Chat**: Collaborate with team members in real-time with AI-powered assistance
- **AI Code Generation**: Generate code using Google Gemini AI integration
- **Live Code Editor**: Edit code with syntax highlighting and real-time collaboration
- **WebContainer Integration**: Run and test code directly in the browser
- **File Management**: Create, edit, and manage multiple files with tabbed interface
- **Live Server Output**: View running applications in an embedded browser with modal display
- **Project Collaboration**: Add team members and work together seamlessly

### Technical Features
- **Multi-Language Support**: Full support for JavaScript/Node.js, with clear guidance for other languages
- **Enhanced Output Display**: Clean, filtered console output with visual indicators
- **Component-Based Architecture**: Modular, maintainable code structure
- **Real-time Updates**: Live code synchronization across team members
- **WebContainer Runtime**: Execute Node.js applications in the browser
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Socket.io Integration**: Real-time communication between users
- **Visual Language Indicators**: Clear indication of supported vs unsupported languages

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time communication
- **Highlight.js** - Syntax highlighting
- **Markdown-to-jsx** - Markdown rendering
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Google Gemini AI** - AI code generation
- **Redis** - Caching and session management

### Infrastructure
- **WebContainers** - Browser-based Node.js runtime
- **StackBlitz API** - WebContainer hosting

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Redis (optional, for caching)

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd Frontend
npm install
```

Start the development server:
```bash
npm run dev
```

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in
2. **Create Project**: Start a new project or join an existing one
3. **Chat with AI**: Ask the AI to generate code for your project
4. **Edit Code**: Use the built-in code editor with syntax highlighting
5. **Run Code**: Click the "Run" button to execute your code in WebContainer
6. **View Output**: See your application running in the embedded browser
7. **Collaborate**: Add team members and work together in real-time

### Code Generation
- Ask the AI to create specific files or applications
- The AI will generate code with proper syntax highlighting
- Generated files are automatically added to your project
- Edit the generated code directly in the browser

### Running Applications
- **JavaScript/Node.js**: Full support with npm package management
- **Visual Indicators**: Green button for supported languages, red for unsupported
- **Enhanced Output**: Clean, filtered console output with installation progress
- **Modal Display**: Full-screen output view with browser and console tabs
- **Real-time Updates**: Live output streaming with proper error handling

### Language Support
#### ✅ Fully Supported
- **JavaScript** (.js, .jsx, .ts, .tsx)
- **JSON** files
- **npm** packages and dependencies
- **Node.js** applications

#### ❌ Not Supported (with alternatives)
- **Python**: Use online interpreters like repl.it
- **Java**: Use online compilers like replit.com
- **C/C++**: Use online compilers like onlinegdb.com
- **Local Development**: Install languages locally for full support

## 📁 Project Structure

```
AI Chat App/
├── Backend/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── controllers/           # Route controllers
│   │   ├── AI.controller.js   # AI code generation
│   │   ├── project.controller.js
│   │   └── user.controller.js
│   ├── models/                # Database models
│   │   ├── project.model.js
│   │   └── user.model.js
│   ├── routes/                # API routes
│   │   ├── AI.routes.js
│   │   ├── project.routes.js
│   │   └── user.route.js
│   ├── services/              # Business logic
│   │   ├── Gemini.services.js # AI integration
│   │   ├── project.service.js
│   │   ├── redis.service.js
│   │   └── user.service.js
│   └── middleware/            # Custom middleware
│       └── auth.middleware.js
├── Frontend/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── ChatSection.jsx        # Chat interface
│   │   │   ├── FileExplorer.jsx       # File tree sidebar
│   │   │   ├── CodeEditor.jsx         # Code editor with tabs
│   │   │   ├── OutputModal.jsx        # Output display modal
│   │   │   └── AddCollaboratorModal.jsx # User management modal
│   │   ├── utils/             # Utility functions
│   │   │   ├── codeUtils.js           # Code execution helpers
│   │   │   └── aiMessageUtils.jsx     # AI message formatting
│   │   ├── Pages/             # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── Projects.jsx   # Main project interface
│   │   │   └── Register.jsx
│   │   ├── auth/              # Authentication components
│   │   ├── context/           # React context
│   │   ├── config/            # Configuration files
│   │   │   ├── axios.js       # HTTP client
│   │   │   ├── socket.js      # Socket.io setup
│   │   │   └── WebContainer.js # WebContainer integration
│   │   └── routes/            # React routing
│   └── public/                # Static assets
└── README.md
```

## 🏗️ Architecture

### Component Structure
- **Modular Design**: Separated concerns with reusable components
- **State Management**: React Context for global state
- **Real-time Communication**: Socket.io for live collaboration
- **Code Execution**: WebContainer integration for browser-based runtime

### Key Components
- **ChatSection**: Handles real-time messaging and AI interactions
- **FileExplorer**: Manages file tree and navigation
- **CodeEditor**: Provides syntax highlighting and code editing
- **OutputModal**: Displays execution results and live server output
- **AddCollaboratorModal**: Manages team member invitations

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ai-chat-app
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
PORT=5000
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify environment variables are set correctly
4. Check that MongoDB and Redis are running

## 🔧 Troubleshooting

### Common Issues
- **Modal not showing**: Check browser console for debug logs
- **Language not supported**: Use JavaScript for full WebContainer support
- **Output not displaying**: Ensure code has been executed first
- **Real-time sync issues**: Check Socket.io connection status

### Language Support
- **JavaScript**: Full support with npm and Node.js
- **Other languages**: Use online compilers or install locally
- **Visual indicators**: Green = supported, Red = unsupported

## 🚀 Recent Updates

### v2.0.0 - Component Refactoring & Enhanced Output
- **Modular Architecture**: Refactored into reusable components
- **Enhanced Output Display**: Clean, filtered console output
- **Language Support Clarity**: Clear indicators for supported languages
- **Improved Modal System**: Better output display with debugging
- **Visual Language Indicators**: Color-coded run buttons
- **Better Error Handling**: Helpful error messages with alternatives

### Key Improvements
- Reduced main component size by 54% (833 → 381 lines)
- Added comprehensive language support guidance
- Enhanced user experience with visual feedback
- Improved code maintainability and reusability

## 🔮 Future Enhancements

- [ ] Support for more programming languages
- [ ] Advanced code analysis and linting
- [ ] Git integration
- [ ] Deployment to cloud platforms
- [ ] Advanced collaboration features
- [ ] Code templates and snippets
- [ ] Performance optimizations

---

**Built with ❤️ using React, Node.js, and WebContainers** 