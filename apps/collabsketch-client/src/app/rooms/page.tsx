"use client";
import React, { useEffect, useState } from "react";
import { Users, ArrowRightCircle, Search, Plus, X } from "lucide-react";
import { HTTP_BACKEND_URL } from "@repo/common/HTTP_BACKEND_URL";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuthToken, removeAuthToken } from "@/auth/auth";
import {LogOut} from "lucide-react"

interface Room {
  id: number;
  slug: string;
  userid: number;
}

function page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${HTTP_BACKEND_URL}/room/create`,
      { slug: newRoom },
      { headers: { token: token } },
    );
    if (response.data.success) {
      setNewRoom("");
      setIsCreateModalOpen(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    const response = await axios.get(`${HTTP_BACKEND_URL}/room/rooms`);
    setRooms(response.data.response);
    console.log(response.data.response);
  };

  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken(); // Check for token in localStorage

    if (!token) {
      router.push('/signin'); // Redirect to login if not authenticated
    }
  }, [router]);


  const handleLogout = () => {
    removeAuthToken(); // Remove token from localStorage
    window.location.href = '/signin'; // Redirect to login page
  };

  if (!rooms.length) return <h1>Loading .....</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 flex items-center gap-2">
            <span>Virtual Rooms</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create Room</span>
            </button>

            <button onClick={handleLogout} className="p-1 bg-gray-300 rounded text-gray-800">
              <LogOut />
            </button>
            

          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          All Rooms
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="group bg-gray-200  shadow-lg backdrop-blur-sm rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
            >
              <div
                className="h-24 sm:h-28 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(https://plus.unsplash.com/premium_photo-1701590725824-3d0482721544?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 group-hover:from-black/70 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                    {room.slug}
                  </h2>
                </div>
              </div>

              <div className="p-3 sm:p-4 flex-grow">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">participants</span>
                  </span>
                </div>

                <Link href={`/draw/${room.slug}`}>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-1 sm:py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base">
                    Join Room
                    <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Room Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Create New Room
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                  placeholder="Enter room name"
                />
              </div>

              <button
                onClick={handleCreateRoom}
                disabled={!newRoom}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-4 text-base"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
