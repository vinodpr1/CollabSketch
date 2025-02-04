import React, {ChangeEvent, useEffect, useState} from 'react'

type CordsType = {
    x: number;
    y: number;
} | null;

const TextTool = ({cords, text , setText}:{cords:CordsType, text:any, setText: any}) => {

  if(!cords) return;

  const handleSubmit = (e:SubmitEvent) =>{
    e.preventDefault();
     
  }

  return (
  <form onSubmit={(e)=>handleSubmit} className='border border-none z-10' style={{ position: "absolute", left:cords.x, top:cords.y }}>
    <textarea
      value={text}
      className='outline-none border-none'
      onChange={(e) => setText(e.target.value)}
    />
  </form>
  )
}

export default TextTool