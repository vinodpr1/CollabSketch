import React from 'react'
import Button from './Button'
import { Brain, Share2 } from 'lucide-react'

const ShareAI = () => {
  return (
    <div className="fixed right-0 m-2">
      <div className="flex gap-2 p-2">
         <Button variant="primary" title="AI Gen" icon={<Brain className='h-3 w-3'/>}/>
         <Button variant="default" title="Share" icon={<Share2 className='h-3 w-3'/>}/>
      </div>
    </div>
  )
}

export default ShareAI