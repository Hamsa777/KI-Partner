import { useState, useRef, useEffect } from "react";
import React from "react";


export default function ModernChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const config = {
    endpoint: "http://91.99.76.52:8000/bot",
    welcomeMessage: "Willkommen! Wie kann ich dir helfen?",
    botAvatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    userAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    primaryColor: "#0F172A"
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: "bot", text: config.welcomeMessage }]);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setLoading(true); // 👈 Startet „Bot schreibt…“
  
    try {
      const res = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firma: "KI-Partner", input: userText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: "bot", text: data.antwort }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: "bot", text: "❌ Fehler beim Abrufen der Antwort." }]);
    } finally {
      setLoading(false); // 👈 Entfernt „Bot schreibt…“
    }
  };
  

  const handleKeyPress = e => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-white rounded-full p-3 shadow-lg cursor-pointer z-50"
        style={{ backgroundColor: config.primaryColor }}
      >
        <img src={config.botAvatar} className="w-6 h-6" alt="Bot" />
      </div>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[75vh] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden z-50">
          <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800">KI-Partner Support</div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start space-x-2 ${msg.from === "user" ? "justify-end" : ""}`}
              >
                {msg.from === "bot" && <img src={config.botAvatar} className="w-6 h-6 rounded-full" />}
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.from === "user" && <img src={config.userAvatar} className="w-6 h-6 rounded-full" />}
              </div>
            ))}
            {loading && (
  <div className="flex items-start space-x-2">
    <img src={config.botAvatar} className="w-6 h-6 rounded-full" />
    <div className="px-3 py-2 rounded-lg bg-gray-200 text-gray-600 italic text-sm">
      Schreibt …
    </div>
  </div>
)}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="p-2 border-t flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nachricht eingeben..."
              className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full"
            >
              Senden
            </button>
          </div>
        </div>
      )}
    </>
  );
}
