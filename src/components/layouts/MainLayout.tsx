import React from 'react'

const MainLayout: React.FC = ({ children }) => {
  return <div className="relative h-screen w-full bg-gray-800">{children}</div>
}

export default MainLayout
