"use client"

import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext'

function Header() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log("Header user state:", user)
    }, [user])
    
    return (
        <div className='flex justify-between items-center p-3 border-b'>
            <div className='flex items-center gap-2'>
                <Image src='/logo.svg' alt='logo' width={40} height={40} />
                <h2 className='text-xl font-bold'>AI Assistant</h2>
            </div>
            <div>
                {user?.picture ? (
                    <Image 
                        src={user.picture} 
                        alt='user'
                        width={40} 
                        height={40}
                        className='rounded-full' 
                    />
                ) : (
                    <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <span className='text-gray-500'>?</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header