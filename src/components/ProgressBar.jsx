import React from 'react';

export const ProgressBar = () => {
    return (
        <div className="w-full mt-2 text-xs">
            <div className="flex">
       
                <div className="flex justify-start">
                    <span>$Usage</span>
                </div>

                <div className="flex flex-col ml-1" style={{width: "85%"}}>
                    <div className="bg-blue-900 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-900 mt-1"></div>
                        <span>&gt;$5K</span>
                    </div>
                </div>

              
                <div className="flex flex-col" style={{width: "25%"}}>
                    <div className="bg-blue-500 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-500 items-center mt-1"></div>
                        <span>$1K - $5K</span>
                    </div>
                </div>

           
                <div className="flex flex-col" style={{width: "25%"}}>
                    <div className="bg-blue-300 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-300 mt-1"></div>
                        <span>$500 - $1K</span>
                    </div>
                </div>

            
                <div className="flex flex-col" style={{width: "25%"}}>
                    <div className="bg-blue-100 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-100 mt-1"></div>
                        <span>&lt;$500</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
