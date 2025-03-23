"use client";
import { Github, LogOut, UserCheck } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session  = useSession();

  return (
    <div className="h-12 py-2 flex items-center px-6 border-b border-gray-300">
      <nav className="flex items-center mx-auto max-w-6xl w-full">
        <div className="flex w-full  py-2 justify-between">
          <div className="flex items-center gap-x-[90px]">
            <div className="text-xl font-bold bg-gradient-to-tr from-[#2affec] to-green-700 bg-clip-text text-transparent">
              <Link href={"/"}>Collab Sketch</Link>
            </div>
            <div className="hidden md:flex">
              <ul className="flex text-sm items-center gap-x-6">
                <li>
                  <Link href={"/rooms"}>Start Drawing</Link>
                </li>
                <li>
                  <Link href={"/rooms"}>Rooms</Link>
                </li>
                {JSON.stringify(session)}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <div className="hidden md:flex items-center gap-x-6 ">
              <Link
                target="blank"
                href="https://github.com/vinodpr1"
                className="flex items-center gap-x-1 text-sm "
              >
                <Github className="h-5 w-5 mr-1" />
              </Link>
              <Link href="/auth" className="text-sm">
                <button className="px-2 py-1 bg-gray-200 rounded">
                  Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
