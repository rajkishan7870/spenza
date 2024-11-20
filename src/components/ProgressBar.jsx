import React from 'react';
import { useRecoilValue } from 'recoil';
import { colorData } from '../recoil/atom';

export const ProgressBar = () => {
    const colPerData = useRecoilValue(colorData)

    return (
        <div className="w-full mt-2 text-xs">
            <div className="flex">
       
                <div className="flex justify-start">
                    <span>$Usage</span>
                </div>

                <div className="flex flex-col ml-1" style={{ width: `${colPerData["#1E3A8A"] ?? 0}%` }}>
                    <div className="bg-blue-900 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-900 mt-1"></div>
                        <span>&gt;$1K {colPerData["#1E3A8A"] ?? 0} % </span>
                    </div>
                </div>

              
                <div className="flex flex-col" style={{ width: `${colPerData["#3B82F6"] ?? 0}%` }}>
                    <div className="bg-blue-500 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-500 items-center mt-1"></div>
                        <span>$750 - $1K {colPerData["#3B82F6"] ?? 0}%</span>
                    </div>
                </div>

           
                <div className="flex flex-col" style={{ width: `${colPerData["#93C5FD"] ?? 0}%` }}>
                    <div className="bg-blue-300 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-300 mt-1"></div>
                        <span>$300 - $750 {colPerData["#93C5FD"] ?? 0}%</span>
                    </div>
                </div>

            
                <div className="flex flex-col" style={{ width: `${colPerData["#DBEAFE"] ?? 0}%` }}>
                    <div className="bg-blue-100 h-2"></div>
                    <div className="flex items-start justify-start">
                        <div className="w-2 h-2 bg-blue-100 mt-1"></div>
                        <span>&lt;$300 {colPerData["#DBEAFE"] ?? 0}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
