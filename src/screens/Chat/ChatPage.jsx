import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../HomeScreen/Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../redux/features/currentTab";

const ChatPage = () => {
  const dispatch = useDispatch();
  const allData = useSelector(e => e.item.allItems)
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Z-Chat. How can I assist you today?",
      isUser: false,
    },
  ]);

  useEffect(() => {
    console.log(allData)
    dispatch(setTab("chat"));
  }, []);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  async function run(prompt) {
    console.log(import.meta.env.VITE_API_KEY);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`These are the data set. ${JSON.stringify(allData)}. Now answer based on the data set, ${prompt}`);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, isUser = false) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser }]);
  };

  const handleSendMessage = async () => {
    if (newMessage) {
      addMessage(newMessage, true);
      scrollToBottom();
      const result = await run(newMessage);
      addMessage(result, false);

      setNewMessage("");
    }
  };

  // Handle "Enter" key press in the input field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex-1  overflow-auto flex flex-col bg-white">
        <div className="flex-grow overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${message.isUser ? "ml-auto" : "mr-auto"} p-2`}
            >
              <div
                className={`${
                  message.isUser
                    ? "bg-yellow-300 text-yellow-900"
                    : "bg-yellow-100 text-yellow-900"
                } rounded-lg p-2 inline-block`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="flex p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here"
            className="flex-grow bg-yellow-100 text-yellow-900 p-2 rounded-l-lg focus:outline-none"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className="bg-yellow-500 text-white p-2 rounded-r-lg hover:bg-yellow-700 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
