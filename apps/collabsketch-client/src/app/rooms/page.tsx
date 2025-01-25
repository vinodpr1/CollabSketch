"use client"
import React, { useState } from 'react';
import { Users, ArrowRightCircle, Search, Plus, X } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  participants: number;
  maxParticipants: number;
  duration: string;
  image: string;
  category: 'gaming' | 'study' | 'music';
}

function page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Gaming Lounge',
      participants: 8,
      maxParticipants: 12,
      duration: '2h',
      category: 'gaming',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940'
    },
    {
      id: '2',
      name: 'Study Group',
      participants: 4,
      maxParticipants: 6,
      duration: '1.5h',
      category: 'study',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2940'
    },
    {
      id: '3',
      name: 'Music Session',
      participants: 5,
      maxParticipants: 8,
      duration: '1h',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2940'
    }
  ]);

  const [newRoom, setNewRoom] = useState({
    name: '',
    maxParticipants: 10,
    duration: '1h',
    category: 'gaming',
  });

  const handleJoinRoom = (roomId: string) => {
    console.log(`Joining room ${roomId}`);
  };

  const handleCreateRoom = () => {
    const room: Room = {
      id: Date.now().toString(),
      name: newRoom.name,
      participants: 0,
      maxParticipants: newRoom.maxParticipants,
      duration: newRoom.duration,
      category: newRoom.category as 'gaming' | 'study' | 'music',
      image: getImageForCategory(newRoom.category as 'gaming' | 'study' | 'music')
    };
    setRooms([...rooms, room]);
    setIsCreateModalOpen(false);
    setNewRoom({ name: '', maxParticipants: 10, duration: '1h', category: 'gaming' });
  };

  const getImageForCategory = (category: 'gaming' | 'study' | 'music') => {
    const images = {
      gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2940',
      study: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2940',
      music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2940'
    };
    return images[category];
  };

 

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
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
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
           All Rooms
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRooms.map((room) => (
            <div 
              key={room.id}
              className="group bg-gray-200  shadow-lg backdrop-blur-sm rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
            >
              <div 
                className="h-32 sm:h-40 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${room.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 group-hover:from-black/70 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                    {room.name}
                  </h2>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 flex-grow">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-sm sm:text-base">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{room.participants} participants</span>
                  </span>
                </div>

                <button
                  onClick={() => handleJoinRoom(room.id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base"
                >
                  Join Room
                  <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Room</h2>
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
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                  placeholder="Enter room name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newRoom.category}
                  onChange={(e) => setNewRoom({...newRoom, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                >
                  <option value="gaming">Gaming</option>
                  <option value="study">Study</option>
                  <option value="music">Music</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={newRoom.maxParticipants}
                  onChange={(e) => setNewRoom({...newRoom, maxParticipants: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
                  min="2"
                  max="50"
                />
              </div>

              <button
                onClick={handleCreateRoom}
                disabled={!newRoom.name}
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