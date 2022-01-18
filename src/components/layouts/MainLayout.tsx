import React from 'react'

const MainLayout: React.FC = ({ children }) => {
  return <div className="w-screen h-screen m-0 overflow-y-scroll overflow-x-hidden relative">{children}</div>
}

export default MainLayout
