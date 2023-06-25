import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="pt-10 px-5 relative">
      <div onClick={toggleMenu} className="block text-white">
        {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          isOpen
            ? "fixed right-0 top-0 w-[20%] h-full border-r text-black border-r-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <ul className="pt-24 uppercase p-4">
          <li className="p-4 border-b border-black">
            <a href="/home">Home</a>
          </li>
          <li className="p-4 border-b border-black">
            <a href="/login">Login</a>
          </li>
          <li className="p-4 ">
            <a href="#">Request</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
