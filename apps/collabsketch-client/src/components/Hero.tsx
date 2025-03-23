import {
  Circle,
  LineChart,
  MousePointer2,
  Palette,
  Pencil,
  Shapes,
  Square,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import "../app/globals.css";

const Hero = () => {
  return (
    <section className="px-6 py-8 border-gray-300">
      <div className="flex gap-6 items-center mx-auto max-w-6xl w-full">
        <div className="flex-1 mx-auto hero-bg flex-grow flex items-center justify-center relative">
          <div className="absolute inset-0 dot-pattern"></div>
          <div className="glow top-1/4 left-1/4"></div>
          <div className="glow bottom-1/4 right-1/3"></div>
          <div className="glow top-1/3 right-1/4"></div>

          <div className="container mx-auto relative py-20">
            <h1 className="text-xl md:text-3xl font-semibold mb-6 leading-tight">
              Draw Your Ideas with{" "}
              <span className="text-green-500">Collab Sketch</span>
            </h1>
            <p className="text-xs md:text-sm max-w-3xl mx-auto mb-10">
              Create beautiful diagrams, flowcharts, and illustrations with our
              intuitive drawing tool. Perfect for teams, designers, and creative
              minds.
            </p>
            <Link href={"/problems/hiiiiiii"}>
              <button className="bg-neutral-300 rounded px-3 py-1">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="aspect-square bg-white rounded shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-5"></div>
            <div className="relative z-10 h-full">
              <div className="absolute top-12 left-12 animate-bounce-slow">
                <div className="bg-purple-500/20 backdrop-blur-sm p-3 rounded shadow-lg">
                  <Circle className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div className="absolute top-1/2 right-12 animate-float">
                <div className="bg-blue-500/20 backdrop-blur-sm p-3 rounded shadow-lg">
                  <Square className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="absolute bottom-12 left-1/3 animate-pulse">
                <div className="bg-green-500/20 backdrop-blur-sm p-3 rounded shadow-lg">
                  <LineChart className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="absolute top-1/4 right-1/4 animate-ping-slow">
                <MousePointer2 className="w-8 h-8 text-purple-600" />
              </div>
              <div className="absolute left-1/2 top-6 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded shadow-lg p-3 flex gap-4">
                <div className="p-2 bg-purple-100 rounded">
                  <Shapes className="w-4 h-4 text-purple-600" />
                </div>
                <div className="p-2 bg-blue-100 rounded">
                  <Palette className="w-4 h-4 text-blue-600" />
                </div>
                <div className="p-2 bg-green-100 rounded">
                  <Pencil className="w-4 h-4 text-green-600" />
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="25%"
                  y1="30%"
                  x2="75%"
                  y2="70%"
                  className="stroke-purple-300 stroke-2 animate-draw"
                />
                <line
                  x1="70%"
                  y1="20%"
                  x2="30%"
                  y2="80%"
                  className="stroke-blue-300 stroke-2 animate-draw-delay"
                />
              </svg>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full opacity-60 blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-60 blur-2xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
