import React from "react";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Loader.css'


const Loader: React.FC = () => {

    return (
        <div>
            <svg viewBox="0 0 240 240" height="240" width="240" className="loader">
                <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className="loader-ring loader-ring-a"></circle>
                <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className="loader-ring loader-ring-b"></circle>
                <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className="loader-ring loader-ring-c"></circle>
                <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className="loader-ring loader-ring-d"></circle>
            </svg>
        </div>
    )
    // return (
    //     <div className="flex mt-50 justify-center h-full overflow-hidden relative bg-transparent">
    //         <DotLottieReact
    //   src="https://lottie.host/009a6a40-22d9-4bf7-a655-d92cb5c810d1/K1K4OdTfmJ.lottie"
    //   loop
    //   autoplay
    //   className='w-18 h-18 object-contain'
    // />
    //     </div>
    // );
};

export default Loader;
