import React from 'react'
import Image from 'next/image'
import Button from '@/components/button'
function page() {
  return (
   <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
     <div className=' gap-10 rounded-2xl p-10 shadow-md bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center'>
      <Image 
        src="/logo.svg"
        alt="logo"
        width={50}
        height={50}
        />
      <h2 className='text-2xl'>Start your AI journey by Signing In</h2>
      <Button sub="Sign-in"></Button>
      </div>
   </div>
  )
}

export default page