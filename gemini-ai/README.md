# Gemini AI Application

A full-stack AI-powered application built with React (frontend) and Express.js (backend) that integrates with OpenAI's API to provide intelligent responses and assistance.

## 🚀 Features

- **React Frontend**: Modern UI built with React, TypeScript, and Vite
- **Express Backend**: RESTful API server with OpenAI integration
- **AI Integration**: Powered by OpenAI's GPT models
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Communication**: Frontend and backend communicate seamlessly

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** (get one from [OpenAI Platform](https://platform.openai.com/api-keys))

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Anjali8875/Anjali-tech---assignment-i-am-beside-u.git
cd Anjali-tech---assignment-i-am-beside-u
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Environment Configuration
**Important**: You must set up environment variables for the application to work.

```bash
# In the server directory, copy the example file
cp .env.example .env
```

Then edit the `.env` file and add your actual OpenAI API key:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3000
```

⚠️ **Security Note**: Never commit your actual API keys to version control. The `.env` file is already added to `.gitignore`.

## 🏃‍♂️ Running the Application

### Start the Backend Server
```bash
cd server
node server.js
```
The server will start on `http://localhost:3000`

### Start the Frontend (in a new terminal)
```bash
# From the project root
npm run dev
```
The frontend will start on `http://localhost:5173`

## 🔧 Build for Production

### Build Frontend
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
