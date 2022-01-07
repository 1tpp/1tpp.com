import React from 'react'

const Dialogue = (props: any) => {
  return (
    <div className="w-full bottom-24 absolute z-10">
      <div
        className="flex flex-col mx-auto  max-w-4xl shadow-lg rounded-md p-4 bg-gray-200 select-none relative"
        style={{
          boxShadow: '0 0 10px #29d6, 0 0 5px #29d',
        }}
      >
        <div>
          <h3 className="text-3xl text-blue-500 font-bold font-body">
            {props.actor}
          </h3>
          <div className="text-gray-700 my-2 text-2xl font-light font-body">
            {props.dialogue}
          </div>
        </div>
        <span className="bottom-2 right-4 font-light text-gray-500 text-right font-body">
          Click to continue...
        </span>
      </div>
    </div>
  )
}

export default Dialogue
