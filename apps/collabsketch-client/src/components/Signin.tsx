"use client";
import { ArrowLeft, FileText, Github, Lock, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface IAuth {
  component: string;
  loginHeading: string;
  authWithEmailText: string;
  userAuthOption: string;
  userAuthAction: string;
}

const Signin = ({
  component,
  loginHeading,
  authWithEmailText,
  userAuthOption,
  userAuthAction,
}: IAuth) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div
          className={`w-full max-w-md transform transition-all duration-1000  `}
        >
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-xl opacity-10 animate-pulse delay-100"></div>

            <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Welcome back
              </h2>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full pb-6"
              >
                {component === "signup" && (
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name">
                      <span className="text-sm text-gray-400">Name</span>
                    </label>
                    <div>
                      <input
                        name="name"
                        className="w-[100%]  border border-gray-600 rounded px-4 py-2"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="email">
                    <span className="text-sm text-gray-400">Email</span>
                  </label>
                  <div>
                    <input
                      name="email"
                      className="w-[100%] border border-gray-600 rounded px-4 py-2"
                      type="email"
                      required
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="password">
                    <span className="text-sm text-gray-400">Password</span>
                  </label>
                  <div>
                    <input
                      name="password"
                      className="w-[100%] border border-gray-600 rounded px-4 py-2"
                      type="password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className=" text-gray-500 py-2 rounded border border-gray-600 w-full flex flex-col gap-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
