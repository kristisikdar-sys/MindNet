const chatLog = document.getElementById("chatLog");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "text-right my-2" : "text-left my-2";
  div.innerHTML = `
    <span class="inline-block px-3 py-2 rounded-xl ${
      sender === "user"
        ? "bg-indigo-100 text-indigo-900"
        : "bg-gray-200 text-gray-800"
    }">${text}</span>`;
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
    const res = await fetch("http://localhost:5000/generateResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    appendMessage("ai", data.response);
    if (data.crisis) {
      appendMessage("ai", "🚨 Crisis detected — please reach out to AASRA 1800-599-0019.");
    }
  } catch (e) {
    appendMessage("ai", "⚠️ Unable to reach the server. Please try again later.");
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
