import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSideBar() {

    const content = [
        {
            name: 'Home',
            link: '/admin'
        },
        {
            name: 'Events',
            link: '/admin/event'
        },
        {
            name: 'Create Event', 
            link: '/admin/create-event'
        },
        {
            name: 'Collages', 
            link: '/admin/collage'
        },
        {
            name: 'Create Collage', 
            link: '/admin/create-collage' 
        },
        {
            name: 'Users', 
            link: '/admin/user'
        }
    ]

    return (
        <div className=' h-[100dvh] border '>
            <div>
                Dashboard
            </div>
            <div className=' flex flex-col'>
                {content.map((item, index) => (
                    <Link to={item.link} key={index}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
