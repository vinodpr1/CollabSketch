"use client"
import React, { useState } from 'react';
import { Moon, Sun, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {HTTP_BACKEND_URL} from "@repo/common/HTTP_BACKEND_URL";

function Auth({comp}:{comp:string}) {

    const router = useRouter();
   const [userData, setUserData] = useState({
                                  name:"",
                                  email:"",
                                  password:""
                               })
     
 
     const handleSubmit = async ()=>{
        const response = await axios.post(`${HTTP_BACKEND_URL}/user/${comp == "signin"? "signin" : "signup"}`, userData);
        if(response.data){
          console.log(response);
          localStorage.setItem("token", response.data.token);
          router.push("/draw/123")
        };
     }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Container */}
        <div className="bg-white rounded shadow-xl overflow-hidden">
  
          <div className="relative h-12 bg-gradient-to-r from-indigo-500 to-purple-600">
          </div>

          {/* Form Container */}
          <div className="p-8">
            <div className="space-y-6">
              { comp !="signin" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    onChange={(e)=>setUserData({...userData, name: e.target.value})}
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e)=>setUserData({...userData, email: e.target.value})}
                  type="email"
                  placeholder="Email Address"
                   className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e)=>setUserData({...userData, password: e.target.value})}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                />
              </div>

              <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                {comp =="signin" ? 'Sign In' : 'Create Account'}
              </button>

              <p className="text-center text-sm text-gray-500">
                {comp =="signin" ? (
                  <>Don't have an account? <Link href="/signup"><button className="text-indigo-600 font-medium hover:underline">Sign Up</button> </Link></>
                ) : (
                  <>Already have an account? <Link href="/signin"><button className="text-indigo-600 font-medium hover:underline">Sign In</button> </Link> </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;