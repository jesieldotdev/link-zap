// components/ChatHeader.js

import Image from "next/image";

export default function ChatHeader() {
  return (
    <header className="flex items-center bg-green-600 text-white w-full p-2 rounded-lg shadow-md ">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/185/185988.png"
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full ml-2"
      />
      <div className="ml-2">
        <p className="text-lg font-bold">LINKZAP</p>
        <p className="text-sm">Desenvolvido pela <span className="font-semibold">JesielLabs</span></p>
      </div>
    </header>
  );
}