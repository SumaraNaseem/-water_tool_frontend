import React from 'react';
import './WaterToolsLogo.css';

const WaterToolsLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-0">
      <img
        className="w-[150px] h-auto md:w-[200px] lg:w-[280px]"
        src="https://res.cloudinary.com/djlpb1ld5/image/upload/v1761774669/file_j0kcar.svg"
        alt="Water Tools Logo"
        decoding="async"
        loading="eager"
      />
    </div>
  );
};

export default WaterToolsLogo;
