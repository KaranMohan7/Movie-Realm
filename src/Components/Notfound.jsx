import React from 'react';
import notfound from '../assets/Pictures/notfound.jpg'

export default function Notfound() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      
      <img className='w-[80%] h-[90%]' src={notfound} />
 
      
  </div>
  );
}