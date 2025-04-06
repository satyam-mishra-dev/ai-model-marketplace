import React, { useContext } from 'react'
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext'
function Header() {
    const {user}=useContext(AuthContext)
  return (
    <div className='p-3 shadow-sm'>

    <Image
    src="/logo.svg"
    alt="logo"
    width={50}
    height={50}
    />
    
    <Image
    src={user?.picture}
    alt="dp"
    width={40}
    height={40}
    className='rounded-full'
    />
    </div>
  )
}

export default Header