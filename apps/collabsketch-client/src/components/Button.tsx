import React, { useState } from 'react';

import AIGenerateModal from './AIGenerateModal';

function Button({title}:{title:string}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  console.log(prompt);

  return (
    <div className="">
    <button onClick={() => setIsModalOpen(true)} className={`${title=="Share"? "bg-blue-500 text-white" : "bg-gray-200 text-black"}  border  flex gap-2 items-center rounded px-2 py-1 text-sm`}>
        {title}
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