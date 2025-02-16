"use client";
import React, { useState, useEffect } from "react";
import {
  Pencil,
  Share2,
  Users,
  Sparkles,
  ChevronRight,
  Github,
  Palette,
  Layers,
  Download,
  Lock,
  Star,
  Heart,
  Twitter,
  Linkedin,
  Facebook,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";

function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const darkModeHandler = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Fancy Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md`}>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
  <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
    <div className="flex items-center space-x-2">
      <Pencil className="w-6 h-6 text-black" />
      <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 bg-clip-text text-transparent">
        Collab Sketch
      </span>
    </div>
    <div className="flex items-center space-x-6">
      <button
        onClick={() => darkModeHandler()}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-gray-100" />
        ) : (
          <Moon className="w-5 h-5 text-gray-900" />
        )}
      </button>
      <Link href="/signin">
        <button className="bg-transparent border border-gray-500 light:text-black dark:text-white px-6 py-2 rounded-lg transition-colors">
          Sign In
        </button>
      </Link>
      <Link href="/signup">
        <button className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-2 rounded-lg transition-colors">
          Get Started
        </button>
      </Link>
    </div>
  </nav>
</header>

      {/* Hero Section */}
      <main>
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 bg-clip-text text-transparent">
              Virtual Whiteboard for
              <br />
              Sketching and Planning
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Create beautiful hand-drawn like diagrams, wireframes, and
              illustrations with our intuitive drawing tool.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/rooms">
                <button className="bg-purple-500 hover:bg-purple-400 px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                  <span>Start Drawing</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              <Link target="blank" href="https://github.com/codervinod123/CollabSketch">
              <button className={`border ${isDark ? 'border-gray-700' : 'border-gray-300'} hover:border-purple-500 px-8 py-3 rounded-lg flex items-center space-x-2 transition-colors`}>
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-6 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-purple-500 transition-colors`}>
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Real-time Collaboration
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Work together with your team in real-time, no matter where they
                are.
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-6 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-purple-500 transition-colors`}>
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-User Editing</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Multiple users can edit the same canvas simultaneously without
                conflicts.
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-6 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-purple-500 transition-colors`}>
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beautiful Sketches</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Create stunning hand-drawn diagrams that look professional and
                engaging.
              </p>
            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-20 rounded-xl overflow-hidden border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
              alt="Excalidraw Interface Preview"
              className="w-full h-auto"
            />
          </div>

          {/* How It Works Section */}
          <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
                  alt="Collaboration Example"
                  className="rounded-xl shadow-2xl"
                />
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <Palette className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Intuitive Drawing Tools
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Access a wide range of drawing tools designed for both
                      simplicity and power.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <Layers className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Layers</h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Organize your drawings with intelligent layer management
                      and grouping.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <Download className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Export Options
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Export your work in multiple formats including PNG, SVG,
                      and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 bg-clip-text text-transparent">
              Loved by Creators
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-8 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>UX Designer</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "The perfect tool for quick wireframes and design discussions.
                  Love the collaboration features!"
                </p>
              </div>
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-8 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Product Manager</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "Excalidraw has revolutionized how our team brainstorms and
                  plans new features."
                </p>
              </div>
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} p-8 rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Emma Davis</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Software Engineer</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "The best whiteboarding tool I've used. Clean, simple, and
                  incredibly powerful."
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`mt-32 ${isDark ? 'bg-gray-800/50' : 'bg-white'} rounded-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-12`}>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GitHub Stars</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customer Satisfaction</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <Lock className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Secure & Private</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 bg-clip-text text-transparent">
              Ready to Start Creating?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
              Join millions of creators and teams who use Excalidraw to bring
              their ideas to life.
            </p>
            <Link href="/signup">
              <button className="bg-purple-500 hover:bg-purple-400 px-8 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors">
                <span>Get Started for Free</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-32`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Pencil className="w-6 h-6" />
                <span className="text-xl font-bold">Collab Sketch</span>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                The virtual whiteboard for sketching hand-drawn like diagrams.
              </p>
              <div className="flex space-x-4">
                <Link
                  target="blank"
                  href="https://x.com/vinodpr57196612"
                  className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  target="blank"
                  href="https://www.linkedin.com/in/vinod-prajapati-87604b203/"
                  className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  target="blank"
                  href="https://www.linkedin.com/in/vinod-prajapati-87604b203/"
                  className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link 
                  target="blank" 
                  href="https://github.com/codervinod123/CollabSketch"
                  className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-400 transition-colors`}
                >
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Libraries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-12 pt-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© 2024 Excalidraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;