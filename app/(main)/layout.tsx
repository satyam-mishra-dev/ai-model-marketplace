import React from 'react'
import Header from './components/Header';

function Workspacelayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default Workspacelayout