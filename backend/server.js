const express = require('express')
const chatRoutes = require('./routes/chatRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Routes
app.use('/api/chat', chatRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Start server
app.listen(PORT, () => {
  console.log(`MindNet AI backend listening on port ${PORT}`)
})

