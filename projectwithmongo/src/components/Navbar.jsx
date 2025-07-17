import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-between items-center px-4 h-14'>
      {/* Logo */}
      <div className="logo font-bold">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h3>
      </div>

      {/* Center navigation links */}
      <div className='flex items-center space-x-8'>
        <ul className='flex gap-5 text-base sm:text-lg'>
          <li><a className='hover:font-bold' href='#'>Home</a></li>
          <li><a className='hover:font-bold' href='#'>About</a></li>
          <li><a className='hover:font-bold' href='#'>Contact</a></li>
        </ul>

        {/* GitHub icon */}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img
            src="icons/github.svg"
            alt="GitHub"
            className="w-6 h-6 sm:w-8 sm:h-8  md:w-10 md:h-10 hover:scale-110 transition-transform duration-200"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;


