import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'

export default function AdminEvent() {
    const [event, setEvent] = useState([])

    useEffect(() => {
        fetchEvent()
    }, [])

    console.log('event :>> ', event);

    function fetchEvent() {
        axiosInstance({
            method: 'GET',
            url: '/event'
        })
            .then((res) => {
                setEvent(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
                setEvent([])
            })
    }
    return (
        <div>
            <div className=' font-bold text-2xl'>
                Event page 
            </div>

            <div>
                {event.length === 0 ? (
                    <div>
                        <span className=' loading loading-spinner loading-xl text-primary' />
                    </div>
                ) : (
                    <div>
                        {event?.map((item, index) => (
                            <div key={item?.gid}>
                                {item?.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
