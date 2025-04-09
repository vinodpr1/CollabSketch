import React from 'react'
import Button from './Button'
import { Brain, Share2 } from 'lucide-react'

const ShareAI = () => {
  return (
    <div className="fixed right-0 m-2">
      <div className="flex gap-2 p-2">
         <Button title={"Gen AI"}/>
         <Button title={"Share"}/>
      </div>
    </div>
  )
}

export default ShareAI