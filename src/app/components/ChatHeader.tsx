// components/ChatHeader.js

import Image from "next/image";
import Logo from '../logo.png'
export default function ChatHeader() {
  return (
    <header className="flex items-center bg-white text-zinc-800  w-full p-2  shadow-md ">
      <Image
        src={Logo}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full ml-2"
      />
      <div className="ml-2">
        <p className="text-lg font-medium">Link para WhatsApp</p>
        <p className="text-sm font-light">Desenvolvido pela <span className="font-medium">JesielLabs</span></p>
      </div>
    </header>
  );
}