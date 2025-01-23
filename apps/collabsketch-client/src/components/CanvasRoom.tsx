"use client"
import Canvas from './Canvas';
import useSocket from '@/app/hooks/useSocket';

const CanvasRoom = (roomid:any) => {

  const {loading, socket} = useSocket();

  if(!socket) return <h1 className='text-white'>Loading the content......</h1>

  return <Canvas socket={socket}/>
}

export default CanvasRoom