import React from 'react'
import Link from 'next/link'
function page() {
  return (
    <div className='flex justify-center items-center h-full'>
     <Link href={'/'} className='p-5 text-center text-3xl border-4 border-green-100 bg-green-500 text-white rounded' >
        Start Quiz
     </Link>
    </div>
  )
}

export default page
