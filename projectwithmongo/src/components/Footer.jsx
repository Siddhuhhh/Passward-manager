import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="flex flex-col bg-purple-200 justify-center items-center fixed bottom-0 w-full">
     <div className="logo font-bold">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h3>
      </div>
    <div className='flex justify-center items-center'>
created with  <img className="w-7 mx-2"src="icons/heart.png "/>  by Siddhartha
    </div>
</div>
      </>
  )
}

export default Footer
