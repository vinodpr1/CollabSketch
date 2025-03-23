import { Facebook, Github, Linkedin, Pencil, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="px-6 py-8 border-t border-gray-300">
      <div className="flex items-center mx-auto max-w-6xl w-full">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-xl font-bold bg-gradient-to-tr from-[#2affec] to-green-700 bg-clip-text text-transparent">
                <Link href={"/"}>Collab Sketch</Link>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              The virtual whiteboard for sketching hand-drawn like diagrams.
            </p>
            <div className="flex space-x-4">
              <Link
                target="blank"
                href="https://x.com/vinodpr57196612"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                target="blank"
                href="https://www.linkedin.com/in/vinod-prajapati-87604b203/"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                target="blank"
                href="https://www.linkedin.com/in/vinod-prajapati-87604b203/"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                target="blank"
                href="https://github.com/codervinod123/CollabSketch"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Libraries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2024 Excalidraw. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
