"use client"
import Canvas from './Canvas';
import useSocket from '@/hooks/useSocket';

const CanvasRoom = (roomid:any) => {

  const {loading, socket} = useSocket();

  if(!socket) return <h1 className='text-black'>Loading the content......</h1>

  return <Canvas socket={socket}/>
}

export default CanvasRoom