import React from 'react'

export default function Main({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className='px-6 max-w-screen-xl box-border w-full mx-auto overflow-hidden flex-1 flex flex-col'>
        {children}
      </main>
    </>
  )
}
