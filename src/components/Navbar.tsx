import React, { useState } from 'react'

const Navbar: React.FC = () => {
  const [isToggle, setIsToggle] = useState(false)

  const handleToggle = () => {
    setIsToggle(!isToggle)
    console.log(isToggle)
  }

  return (
    <div onClick={handleToggle}>
      <div className="p-4 space-y-2 bg-gray-600 rounded-md shadow top-2 right-2 absolute z-10">
        <span className="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
        <span className="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
        <span className="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
      </div>
    </div>
  )
}

export default Navbar
