import React from "react";

// components/ChatMessage.js
interface ChatMessageProps{
  message: React.ReactNode 
  type?: "error" | "link" | ""
  isUser?: boolean
}

export default function ChatMessage({ message, type, isUser=false}: ChatMessageProps) {
  const messageStyle =
    type === 'error'
      ? 'text-zinc-700 rounded-lg p-3 mb-2 self-start'
      : type === 'link'
      ? ' text-blue-700 rounded-lg p-3 mb-2 self-end'
      : 'text-zinc-700 rounded-lg p-3 mb-2 self-end';
      
      const justify = isUser ? 'justify-end' : 'justify-start'

  return (
    <div className={`flex w-full ${justify}`}>
    <div className={`${messageStyle} max-w-[75%] ${isUser ? 'bg-green-200' : 'bg-white'}`}>
      <p className="msg">{message}</p>
    </div>
    </div>
  );
}