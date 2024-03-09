import React from 'react';

const Card = (props) => {
  return (
    <div className='flex flex-row items-center rounded-lg p-4 gap-8 shadow-md' style={{ }}>
      <div className='revenue flex flex-col justify-end w-80'>
        <span className='font-lato font-normal text-base mb-1'>{props.title}</span>
        <span className='font-open-sans text-3xl'>{props.revenue}</span>
      </div>
      <div className='icon'>
        <img src={props.icon} alt='icon' className='w-6 h-6' />
      </div>
    </div>
  );
};

export default Card;
