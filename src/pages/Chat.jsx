// import React, { useState, useEffect, useRef } from 'react'
// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
// import { useSelector } from 'react-redux'


// export function Chat() {
//     const [msgs, setMsgs] = useState([])
//     const [msgToSend, setMsgToSend] = useState('')

//     function sendMsg(ev) {
//         ev.preventDefault()
//         if (!msgToSend.trim()) return

//         const userMsg = { text: msgToSend, sender: 'user' }
//         setMsgs(prevMsgs => [...prevMsgs, userMsg])
//         setMsgToSend('')

//         setTimeout(() => {
//             const botMsg = { text: `You said: "${msgToSend}"`, sender: 'bot' }
//             setMsgs(prevMsgs => [...prevMsgs, botMsg])
//         }, 1000)
//     }

//     return (
//         <section className="chat-container">
//             <div className="chat-msgs">
//                 {msgs.map((msg, idx) => (
//                     <div key={idx} className={`chat-msg ${msg.sender}`}>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div className="chat-input">
//                 <form onSubmit={sendMsg}>
//                     <input
//                         type="text"
//                         value={msgToSend}
//                         onChange={ev => setMsgToSend(ev.target.value)}
//                         placeholder="Type a message..."
//                         autoComplete="off"
//                     />
//                     <button className="btn">Send</button>
//                 </form>
//             </div>
//         </section>
//     )
// }

import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import '../assets/style/pages/Chat.css'

export function Chat() {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Lets Chat about {topic}</h2>

            <section className="chat-options">
                <label>
                    <input type="radio" name="topic" value="Love"
                        checked={topic === 'Love'} onChange={({ target }) => setTopic(target.value)} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="topic" value="Politics"
                        checked={topic === 'Politics'} onChange={({ target }) => setTopic(target.value)} />
                    Politics
                </label>

                <label>
                    <input type="checkbox" name="isBotMode" checked={isBotMode}
                        onChange={({ target }) => setIsBotMode(target.checked)} />
                    Bot Mode
                </label>
            </section>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => {
                    const myName = loggedInUser?.fullname || 'Me'
                    const isOwn = msg.from === myName
                    return (
                        <li key={idx} className={`msg ${isOwn ? 'msg-out' : 'msg-in'}`}>
                            <span className="msg-meta">{msg.from}</span>
                            <span className="msg-bubble">{msg.txt}</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}