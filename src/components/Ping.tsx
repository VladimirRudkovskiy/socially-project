import React from 'react'

const Ping = () => {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
    </span>
  )
}

export default Ping;
