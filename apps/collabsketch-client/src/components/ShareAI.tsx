"use client";
import React, { useState } from 'react'
import Button from './Button'
import { Brain, Share2 } from 'lucide-react'
import AIGenerateModal from './AIGenerateModal';

const ShareAI = () => {

  return (
    <div className="fixed right-0 m-2">
      <div className="flex gap-2 p-2">
         <Button/>
      </div>
    </div>
  )
}

export default ShareAI