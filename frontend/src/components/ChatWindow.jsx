import { useEffect, useRef } from 'react'

export default function ChatWindow({ messages }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <div
      ref={containerRef}
      role="log"
      aria-live="polite"
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 overscroll-contain"
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500 text-sm">
          Start the conversation with MindNet AI.
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] break-words rounded-2xl px-4 py-2 text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

