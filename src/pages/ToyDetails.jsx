import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

import { Loader } from '../cmps/Loader.jsx'
import { ToyImg } from '../cmps/ToyImg'
import { Chat } from '../pages/Chat'
import { Popup } from '../cmps/Popup'

export function ToyDetails() {
    const [isOpen, setIsOpen] = useState(false)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    useEffect(() => {
        window.addEventListener('keyup', handleIsOpen)
        return () => {
            window.removeEventListener('keyup', handleIsOpen)
        }
    }, [])

    function handleIsOpen({ key }) {
        if (key === 'Escape') setIsOpen(false)
    }

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            navigate('/toy')
        }
    }

    if (!toy) return <Loader />
    return (
        <section className="toy-details">
            <ToyImg toyName={toy.name} />
            <h1>Toy name: <span>{toy.name}</span></h1>
            <p>Toy price: <span>${toy.price}</span></p>
            {!!toy.labels?.length && (
                <p>Labels: <span>{toy.labels.join(' ,')}</span></p>
            )}
            <p className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </p>
            <div>
                <Link className="btn" to="/toy">Back</Link>
                <button className="btn" onClick={() => { setIsOpen(true) }} >
                    Chat
                </button>
            </div>
            {isOpen && (
                <Popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    heading="Lets chat!"
                    footing={<button className="btn" onClick={() => setIsOpen(false)}>Close</button>}
                >
                    <Chat />
                </Popup>
            )}
        </section>
    )
}