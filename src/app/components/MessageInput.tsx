// components/MessageInput.js

import Image from "next/image";
import MaskedInput from "react-text-mask";

export default function MessageInput({ num, setNum, onSend }) {
  return (
    <div className="w-full flex px-2 bg-transparent py-0">
      <div className="flex items-center mt-4 p-2 rounded-full shadow-md m-2 w-full sticky bottom-0 z-10 bg-white">
        <MaskedInput
          mask={['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
          placeholder="Digite o número"
          type="text"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="flex-grow p-2 text-gray-700 rounded-lg focus:outline-none"
        />
        <Image
          onClick={onSend}
          src="https://cdn-icons-png.flaticon.com/512/736/736161.png"
          alt="send"
          width={24}
          height={24}
          className="ml-2 cursor-pointer"
        />
      </div>
    </div>
  );
}