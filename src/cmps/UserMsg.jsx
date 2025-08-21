import { useEffect, useRef, useState } from "react"
import { eventBusService } from "../services/event-bus.service.js"
// const { useState, useEffect, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            // window.scrollTo({top: 0, behavior: 'smooth'});
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}


// import { eventBus, showSuccessMsg } from '../services/event-bus.service'
// import { useState, useEffect, useRef } from 'react'
// import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

// export function UserMsg() {
//     const [msg, setMsg] = useState(null)
//     const timeoutIdRef = useRef()

//     useEffect(() => {
//         const unsubscribe = eventBus.on('show-msg', msg => {
//             setMsg(msg)
//             if (timeoutIdRef.current) {
//                 timeoutIdRef.current = null
//                 clearTimeout(timeoutIdRef.current)
//             }
//             timeoutIdRef.current = setTimeout(closeMsg, 3000)
//         })

//         socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
//             showSuccessMsg(`New review about me ${review.txt}`)
//         })

//         return () => {
//             unsubscribe()
//             socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
//         }
//     }, [])

//     function closeMsg() {
//         setMsg(null)
//     }

//     function msgClass() {
//         return msg ? 'visible' : ''
//     }
//     return (
//         <section className={`user-msg ${msg?.type} ${msgClass()}`}>
//             <button onClick={closeMsg}>x</button>
//             {msg?.txt}
//         </section>
//     )
// }
