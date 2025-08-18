import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { Loader } from '../cmps/Loader'
import {
    loadToys,
    removeToyOptimistic,
    saveToy,
    setFilterBy
} from '../store/actions/toy.actions.js'

export function ToyIndex() {

    // const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }


    // function onAddToy() {
    //     const toyToSave = toyService.getRandomToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy 🧸</Link>
                {/* <button className='add-btn' onClick={onAddToy}>Add Random Toy 🧸</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : isLoading && <Loader />
                }
                <hr />
            </main>
        </div>
    )
}

// console.log('toys from index:', toys)