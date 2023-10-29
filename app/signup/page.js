"use client"
import React from 'react'
import SignUp from '@/components/SignUp/SignUp'
function Page() {
  return (
    <div className='flex sm:flex-row flex-col gap-y-2 sm:gap-x-4 sm:w-[60%] justify-between w-[90%] '>
      <SignUp/>
    </div>
  )
}

export default Page
