"use client";
import React, { useEffect, useState } from "react";
import { ArrowRightCircle, Search, Plus, X, SearchX } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import RoomShimmer from "@/components/RoomShimmer";

interface Room {
  id: number;
  slug: string;
  userid: number;
}

function page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [filterRooms, setFilterRooms] = useState<Room[] | null>(null);
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = async () => {
    const response = await axios.post(`http://localhost:3000/api/rooms`, {
      slug: newRoom,
    });
    if (response.data.success) {
      setNewRoom("");
      setIsCreateModalOpen(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/rooms");
      setRooms(response.data.data);
      setFilterRooms(response.data.data);
    } catch (error) {
      toast.error("Can't get rooms");
    }
  };

  useEffect(() => {
    if (rooms) {
      const newRooms = rooms.filter((room) => {
        return room.slug.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilterRooms(newRooms);
    }
  }, [searchQuery]);

  return (
    <div className=" bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value == "") setFilterRooms(rooms);
                }}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded outline-none text-gray-600 backdrop-blur-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-neutral-200  text-black font-medium py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create Room</span>
            </button>
          </div>
        </div>

        {!rooms ? (
          <RoomShimmer />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mx-auto">
            {!filterRooms?.length ? (
              <NoRoomFound />
            ) : (
              filterRooms.map((room, index) => (
                <div
                  key={index}
                  className="group bg-gray-200  shadow-lg backdrop-blur-sm rounded hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
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
                    <Link href={`/draw/${room.slug}`}>
                      <button className="w-full bg-neutral-400 font-medium py-1 sm:py-2 px-4 rounded flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base">
                        Join Room
                        <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
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
                  className="w-full px-3 py-2 text-base text-gray-700 border border-gray-300 rounded outline-none focus:outline-none"
                  placeholder="Enter room name"
                />
              </div>

              <button
                onClick={handleCreateRoom}
                disabled={!newRoom}
                className="w-full bg-purple-500 hover:bg-purple-400 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-4 text-base"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default page;

const NoRoomFound = () => {
  return (
    <div className="max-w-4xl flex flex-col justify-center items-center mx-auto">
      <SearchX className="h-8 w-8 text-gray-500" />
      <p className="text-gray-500 max-w-xl text-center">
        We couldn't find any rooms matching your search. Try adjusting your
        search terms or create a new room.
      </p>
    </div>
  );
};
