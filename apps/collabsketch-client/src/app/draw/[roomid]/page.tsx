import React from 'react'
import CanvasRoom from '@/components/CanvasRoom';

const page = async({params}:any) => {

  const roomid = (await params).roomid;
  
  return <CanvasRoom roomid={roomid}/>
}

export default page