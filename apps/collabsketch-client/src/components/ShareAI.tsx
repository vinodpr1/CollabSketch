<<<<<<< HEAD
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
=======
import React from 'react'
import Button from './Button'
import { Brain, Share2 } from 'lucide-react'

const ShareAI = () => {
  return (
    <div className="fixed right-0 m-2">
      <div className="flex gap-2 p-2">
         <Button variant="primary" title="AI Gen" icon={<Brain className='h-3 w-3'/>}/>
         <Button variant="default" title="Share" icon={<Share2 className='h-3 w-3'/>}/>
>>>>>>> f7ebef82d6fa0f5595215cc823daa89da54e5603
      </div>
    </div>
  )
}

export default ShareAI