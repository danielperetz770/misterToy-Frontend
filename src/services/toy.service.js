import { httpService } from './http.service.js'
import { utilService } from './util.service.js'


const BASE_URL = 'toy/'

const LABELS = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Daniel',
    'Outdoor',
    'Battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getToyLabels,
    getLabelCounts,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getLabelCounts() {
    return httpService.get(BASE_URL + 'label-counts')
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: '',
    }
}

function getRandomToy() {
    const names = [
        'Remote Control Car',
        'Paint Set Deluxe',
        'Baby Einstein Piano',
        'Wooden Puzzle Set',
        '1000pc World Map Puzzle',
        '3D Jigsaw Puzzle',
        'Racing Skateboard',
        'Electronic Drum Kit',
        'Dancing Robot',
        'Musical Crib Mobile',
    ]

    const name = names[Math.floor(Math.random() * names.length)]

    return {
        _id: '',
        name,
        price: utilService.getRandomIntInclusive(20, 200),
        labels: _getRandomLabels(),
        imgUrl: '',
        inStock: Math.random() < 0.5,
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        sortBy: { type: '', sortDir: 1 },
    }
}

function getToyLabels() {
    return [...LABELS]
}


function _getRandomLabels() {
    const shuffledLabels = [...LABELS].sort(() => Math.random() - 0.5)
    const randomLabels = shuffledLabels.slice(0, 2)
    return randomLabels
}

