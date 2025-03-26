<<<<<<< HEAD
import React, { useState } from 'react';

import AIGenerateModal from './AIGenerateModal';

function Button() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  console.log(prompt);

  return (
    <div className="">
    <button onClick={() => setIsModalOpen(true)} className={`bg-gray-200 border text-black flex gap-2 items-center rounded px-2 py-1 text-sm`}>
        Gen AI
    </button>

      <AIGenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="prompt to generate shape"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            <input 
               value={prompt}
               onChange={(e)=>setPrompt(e.target.value)}
               type="text" 
               className='border border-gray-500 rounded px-2 py-1 w-full'
              />
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-700 
                         transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1 bg-blue-600 text-white rounded 
                         hover:bg-blue-700 transition-colors font-medium"
            >
              Generate
            </button>
          </div>
        </div>
      </AIGenerateModal>
    </div>
  );
}

export default Button;
=======
import React, { ReactNode } from 'react'

const Button = ({variant, title, icon}:{variant: string, title: string, icon: ReactNode}) => {
  return (
    <button className={`${variant=="default" ? "bg-gray-200 border text-black" : "bg-blue-600 border text-white"}  flex gap-2 items-center rounded px-2 py-1 text-sm`}>
        <span>{icon}</span>
        {title}
    </button>
  )
}

export default Button
>>>>>>> f7ebef82d6fa0f5595215cc823daa89da54e5603
