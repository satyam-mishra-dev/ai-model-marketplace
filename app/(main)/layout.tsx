"use client";

import React from 'react'
import Provider from './provider'

function Workspacelayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}

export default Workspacelayout