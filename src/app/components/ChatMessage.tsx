// components/ChatMessage.js
interface ChatMessageProps{
  message: any 
  type: "error" | "link" | ""
  isUser?: boolean
}

export default function ChatMessage({ message, type, isUser=false}: ChatMessageProps) {
  const messageStyle =
    type === 'error'
      ? 'bg-red-100 text-red-700 rounded-lg p-3 mb-2 self-start'
      : type === 'link'
      ? 'bg-blue-100 text-blue-700 rounded-lg p-3 mb-2 self-end'
      : 'bg-green-100 text-green-700 rounded-lg p-3 mb-2 self-end';
      
      const justify = isUser ? 'justify-end' : 'justify-start'

  return (
    <div className={`flex w-full ${justify}`}>
    <div className={`${messageStyle} max-w-[75%]`}>
      <p className="msg">{message}</p>
    </div>
    </div>
  );
}