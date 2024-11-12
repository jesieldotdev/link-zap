"use client";

import { useState, useEffect, ReactNode } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";

export default function Home() {
  const [num, setNum] = useState<string>("55");
  const [chat, setChat] = useState<ReactNode[]>([]);

  function gerar() {
    const num_no_space = num.replace(/\s+/g, '').replace('(', '').replace(')', '').replace('-', '')

    if (num_no_space.length !== 0) {
      if (num_no_space.length < 8) {
        setChat((prevChat) => [
          ...prevChat,
          <ChatMessage key={prevChat.length} message="Número Inválido. 🚫" type="error" />,
          <ChatMessage key={prevChat.length + 1} message="Digite um número acima de 8 dígitos." type="error" />
        ]);
      } else if (num_no_space.length > 18) {
        setChat((prevChat) => [
          ...prevChat,
          <ChatMessage key={prevChat.length} message="Digite um número abaixo de 18 dígitos." type="error" />
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          <ChatMessage isUser key={prevChat.length} message={num} />,
          <ChatMessage key={prevChat.length + 1} message={<a target="_blank" className="text-underline" rel="noopener noreferrer" href={`https://wa.me/${num_no_space}`}>https://wa.me/{num_no_space}</a>} type="link" />
        ]);
      }
    } else {
      setChat((prevChat) => [
        ...prevChat,
        <ChatMessage key={prevChat.length} message="Digite o número na caixa de texto abaixo e será gerado um link com o número." type="error" />
      ]);
    }
  }

  useEffect(() => {
    setChat((prevChat) => [
      <ChatMessage key={prevChat.length} message="Digite o número na caixa de texto abaixo e será gerado um link com o número." type="error" />,
      <ChatMessage key={prevChat.length + 1} message="Informamos que os dados que você insere em nosso aplicativo não serão armazenados em nossos servidores. Eles são processados temporariamente para gerar o link desejado e, em seguida, descartados." type="" />
    ]);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center bg-gray-50 bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/Yh5JpYQ.jpeg')" }}>
      <ChatHeader />

      <main className="flex flex-col w-full mt-0 rounded-lg p-4 overflow-y-auto h-full max-h-[75vh]">
        {chat.map((message, index) => (
          <div key={index} className="flex">
            {message}
          </div>
        ))}
      </main>

      <MessageInput num={num} setNum={setNum} onSend={gerar} />
    </div>
  );
}
