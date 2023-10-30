"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation';
function page() {
    const {username} = useParams();
    const pathName = usePathname();
  return (
    <div>
      Hello world {username} {pathName==='/profile/rahul' ? "1" : "0"}
    </div>
  )
}

export default page
