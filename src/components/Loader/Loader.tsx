import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loader: React.FC = () => {
    return (
        <div className="flex mt-50 justify-center h-full overflow-hidden relative bg-transparent">
            <DotLottieReact
      src="https://lottie.host/009a6a40-22d9-4bf7-a655-d92cb5c810d1/K1K4OdTfmJ.lottie"
      loop
      autoplay
      className='w-18 h-18 object-contain'
    />
        </div>
    );
};

export default Loader;
