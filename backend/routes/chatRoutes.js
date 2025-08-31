const express = require('express')
const router = express.Router()

// POST /api/chat
router.post('/', (req, res) => {
  const { message } = req.body || {}
  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid message' })
  }

  // Dummy reply for now
  return res.json({ reply: 'Hello from backend' })
})

module.exports = router

