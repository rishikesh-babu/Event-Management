import React from 'react'

export default function AdminSideBar() {

    const content = [
        {
            name: 'Home' 
        },
        {
            name: 'Events'
        },
        {
            name: 'Create Event'
        }, 
        {
            name: 'Collages'
        },
        {
            name: 'Create Collage'
        },
        {
            name: 'Users'
        }
    ]

    return (
        <div className=' h-[100dvh] border '>
            <div>
                Dashboard
            </div>
            <div>
                {content.map((item, index) => (
                    <div key={index}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
