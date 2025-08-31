import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import ChatInput from './components/ChatInput.jsx'

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, I’m MindNet AI 👋' },
  ])

  function handleSend(userText) {
    const userMessage = { role: 'user', content: userText }
    const aiMessage = { role: 'assistant', content: 'Hello, I’m MindNet AI 👋' }
    setMessages((prev) => [...prev, userMessage, aiMessage])
  }

  return (
    <div className="flex h-full flex-col bg-white text-gray-900">
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col border-x bg-white">
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  )
}

export default App
