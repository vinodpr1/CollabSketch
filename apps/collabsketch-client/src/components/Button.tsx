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