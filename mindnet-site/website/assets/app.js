const chatLog = document.getElementById("chatLog");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "text-right my-2" : "text-left my-2";
  div.innerHTML = `<span class="inline-block px-3 py-2 rounded-lg ${sender === "user" ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-200 text-gray-800'}">${text}</span>`;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  chatInput.value = "";
  sendBtn.disabled = true;

  try {
    const response = await fetch("http://localhost:5000/generateResponse", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: text })
    });
    const data = await response.json();
    appendMessage("ai", data.response);
    if (data.crisis) {
      appendMessage("ai", "🚨 Crisis detected. Please reach out to 1800-599-0019 (AASRA Helpline).");
    }
  } catch (err) {
    appendMessage("ai", "⚠️ Server error. Please try again later.");
  }
  sendBtn.disabled = false;
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());