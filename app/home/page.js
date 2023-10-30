"use client"
import React from 'react'
import Sidebar from '@/components/sidebar/SideBar'
import { usePathname } from 'next/navigation'
function page() {
    const pathname = usePathname();
  return (
    <div className='flex flex-row w-full'>
    hellow
    </div>
  )
}

export default page
