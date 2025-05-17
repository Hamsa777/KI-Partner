import { useState, useRef, useEffect } from "react";
import React from "react";
import logo from "../assets/KI-Partner Vektorlogo.png"; // dein Logo
import pb from "../assets/KI Vektorlogo.png";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

export default function ModernChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null); // Für Click-Outside
  const toggleButtonRef = useRef(null);

  const config = {
    endpoint: "http://91.99.76.52:8000/bot",
    welcomeMessage: "Willkommen! Wie kann ich dir helfen?",
    botAvatar: logo,
    userAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    primaryColor: "#ffffff"
  };
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-chatbot", handleOpen);
    return () => window.removeEventListener("open-chatbot", handleOpen);
  }, []);
  
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      widgetRef.current &&
      !widgetRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };
  if (open) document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [open]);

useEffect(() => {
  if (open) {
    setMessages((prev) =>
      prev.length === 0 ? [{ from: "bot", text: config.welcomeMessage }] : prev
    );
  }
}, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setLoading(true);

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
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Toggle-Button */}
      <div
        ref={toggleButtonRef}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-full p-3 shadow-md cursor-pointer z-50 hover:scale-105 transition"
      >
        <img src={config.botAvatar} className="w-14 h-14 rounded-full object-contain" alt="Bot" />
      </div>

      {/* Chatfenster */}
      {open && (
        <div
        ref={widgetRef}
        className="fixed bottom-32 right-6 w-80 max-h-[75vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 border border-gray-200"
      >
      
      <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
  <div className="flex items-center space-x-2">
    <span className="text-sm font-semibold text-gray-800">KI-Partner Support</span>
  </div>
  <button
    onClick={() =>
      setMessages([{ from: "bot", text: config.welcomeMessage }])
    }
    className="text-gray-500 hover:text-black transition"
    title="Chat zurücksetzen"
  >
    <HiOutlineRefresh className="w-5 h-5 text-black" />
  </button>
</div>


          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
              key={i}
              className={`flex items-start space-x-2 ${msg.from === "user" ? "justify-end" : ""}`}
            >
              {msg.from === "bot" && <img src={config.botAvatar} className="w-12 h-12 rounded-full" />}
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              {msg.from === "user" && (
              <FiUser className="w-8 h-8 text-black bg-white rounded-full p-1 border" />
          )}
            </div>
            ))}

            {loading && (
              <div className="flex items-start space-x-2">
                <img src={config.botAvatar} className="w-6 h-6 rounded-full" />
                <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 italic text-sm">
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
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={sendMessage}
              className="bg-black hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-full"
            >
              Senden
            </button>
          </div>
        </div>
      )}
    </>
  );
}
