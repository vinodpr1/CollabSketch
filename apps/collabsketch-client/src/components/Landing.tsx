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
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import Hero from "./Hero";
import Features from "./Features";

function Landing() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default Landing;
