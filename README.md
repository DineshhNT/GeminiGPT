# GeminiGPT

GeminiGPT is a web-based AI chatbot application built using React.js and Google’s Gemini API. It enables users to interact with a generative language model through a modern interface, supporting multi-turn conversation and natural language understanding. The project is structured for easy extensibility and frontend/backend separation.

## Project Features

- Interactive chat interface using React
- Real-time communication with Gemini API
- Handles multi-turn context-aware conversations
- Built with Vite for fast frontend development
- Simple and secure API integration
- Easily customizable frontend components

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- Google Gemini API (Generative Language)
- Zustand (for global state management)
- JavaScript / JSX
- dotenv (for environment variable management)

## Folder Structure

```

GeminiGPT/
├── public/
│   └── assets/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components
│   ├── hooks/               # Custom React hooks
│   ├── App.jsx              # Main application structure
│   └── main.jsx             # Entry point
├── .env                     # Environment variables
├── index.html
├── package.json
├── vite.config.js
└── README.md

````

## How It Works

1. The frontend captures user input through a chat UI.
2. The input is sent to the Gemini API using the fetch method.
3. The API responds with a generated response based on the conversation context.
4. The response is rendered back in the chat window for the user.
5. All interactions happen dynamically without page reloads.

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/DineshhNT/GeminiGPT.git
cd GeminiGPT
````

2. Install dependencies

```bash
npm install
```

3. Set up your Gemini API key in a `.env` file

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server

```bash
npm run dev
```

5. Open the app in your browser

```
http://localhost:5173
```

## API Integration Example

The application sends a POST request to the Gemini API endpoint to fetch generated responses.

```js
fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: "Hello, how are you?" }] }]
  })
})
.then(response => response.json())
.then(data => {
  // Process and display response
});
```

## Use Cases

* AI-based personal assistant chatbot
* Customer support or helpdesk assistant
* Educational tool for learning language models
* Starting point for advanced AI-based web apps

## License

This project is licensed under the MIT License.


