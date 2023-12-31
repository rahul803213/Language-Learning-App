"use client"
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import { useRouter } from 'next/navigation';
const Sidebar = () => {
   const router = useRouter();

  return (
    <div className="w-1/5 p-4 border-r border-r-emerald-700 cursor-pointer" >
     
      <div className="space-y-4">
        
          <div onClick={()=>router.push('/home/learn')} className="flex items-center space-x-5 text-2xl p-4  hover:bg-green-500 hover:text-white rounded">
            <HomeIcon className='h-10 w-10' />
            <p>Learn</p>
          </div>

          <div onClick={()=>router.push('/home/practice')} className="flex items-center space-x-5 text-2xl p-4  hover:bg-green-500 hover:text-white rounded ">
            <FitnessCenterIcon className='h-10 w-10' />
            <p>Practice</p>
          </div>

          <div onClick={()=>router.push('/home/leaderboard')} className="flex items-center space-x-5 text-2xl p-4  hover:bg-green-500 hover:text-white rounded">
            <LeaderboardIcon className='h-10 w-10' />
            <p>Leaderboard</p>
          </div>

          <div onClick={()=>router.push('/home/profile')}  className="flex items-center space-x-5 text-2xl p-4  hover:bg-green-500 hover:text-white rounded">
            <AccountBoxIcon className='h-10 w-10' />
            <p>Profile</p>
          </div>

          <div onClick={()=>router.push('/home')} className="flex items-center space-x-5 text-2xl p-4  hover:bg-green-500 hover:text-white rounded">
            <AltRouteIcon className='h-10 w-10' />
            <p>Other</p>
          </div>

          
       
      </div>
    </div>
  );
};

export default Sidebar;
