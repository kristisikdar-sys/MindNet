import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import ChatInput from './components/ChatInput.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, I’m MindNet AI 👋' },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSend(userText) {
    const userMessage = { role: 'user', content: userText }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        const message = data && data.error ? data.error : `Request failed with ${response.status}`
        throw new Error(message)
      }

      const data = await response.json()
      const aiMessage = { role: 'assistant', content: data.reply ?? '...' }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="w-full bg-blue-600">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-center text-white text-xl sm:text-2xl font-semibold tracking-tight">MindNet AI</h1>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col border-x bg-white">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSend} />
      </main>
      <Footer />
      {error && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-600 shadow-md">
          {error}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
