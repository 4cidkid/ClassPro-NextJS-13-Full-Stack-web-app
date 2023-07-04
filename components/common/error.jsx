import React from 'react'
import { AlertTriangle } from 'react-feather'

export const Error = ({error}) => {
    return(
        <div className='capitalize flex items-center text-2xl font-bold text-white justify-center gap-5 appearError fixed right-[20px] bottom-[20px] bg-main w-[450px] h-[90px] shadow-xl border border-[rgba(0,0,0,0.2)]'>
            <AlertTriangle>
            </AlertTriangle>
            {error || 'unexpected error occurred'}
        </div>
    )
}