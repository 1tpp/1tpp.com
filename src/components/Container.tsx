import React from 'react'

const Container: React.FC = (props) => {
  return <div className="container mx-auto relative z-50">{props.children}</div>
}

export default Container
