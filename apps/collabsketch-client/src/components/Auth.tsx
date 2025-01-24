import React, { useState } from 'react';
import { Moon, Sun, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';

function Auth({comp}:{comp:string}) {
  const [isLogin, setIsLogin] = useState(true);
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Container */}
        <div className="bg-white rounded shadow-xl overflow-hidden">
          {/* Toggle Header */}
          <div className="relative h-16 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div 
              className={`absolute inset-0 flex transition-transform duration-500 ease-in-out ${
                comp =="signin" ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <div className="space-y-6">
              { comp !="signin" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                   className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 outline-none bg-gray-50 rounded transition-all"
                />
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
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