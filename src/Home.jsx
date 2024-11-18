import React from 'react'
import WorldMap from './components/WorldMap'
import { ProgressBar } from './components/ProgressBar'

export const Home = () => {
  return (
    <div className='flex flex-col justify-center w-full h-full'>
        <WorldMap/>
        <ProgressBar/>
    </div>
  )
}
