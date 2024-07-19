import React from 'react'

export default function Forbidden() {
  return (
    <div className="h-screen flex justify-center flex-col items-center px-3 text-center">
        <h3 className="text-red-600 font-light text-3xl uppercase">Missing credentials</h3>
        <div>You are not allowed to see it.... Contact the following person: </div>
        <code className='py-2'>
            ymn.dev.coder@gmail.com
        </code>
    </div>
  )
}
