"use client";
import { Github, LogOut, UserCheck } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const {status, data}  = useSession();
  const isloading = status=="loading" ? true : false;

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
                <li className="">
                  <Link href="/">{JSON.stringify(data?.user?.email)}</Link>
                </li>
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
              <div>
                
                {
                   !isloading && data?.user &&
                   <button onClick={()=>signOut()} className="px-2 py-1 bg-gray-200 rounded">
                    Logout
                   </button>
                }
                {
                  !isloading && !data?.user &&
                  <button onClick={()=>signIn()} className="px-2 py-1 bg-gray-200 rounded">
                     Log in
                  </button>  
                } 
                { isloading &&  <div className="px-[30px] py-1"> </div> }
               
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
