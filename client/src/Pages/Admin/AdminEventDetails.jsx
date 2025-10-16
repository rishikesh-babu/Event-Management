import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminEventDetails() {
    const { id } = useParams()

    console.log('id :>> ', id);
    
    return (
        <div>
            <div className='font-semibold text-3xl text-center'>
                Event Details page
            </div>

            <div className='text-2xl text-center'>
                {id}
            </div>
        </div>
    )
}
