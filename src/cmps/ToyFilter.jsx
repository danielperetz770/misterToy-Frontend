import { useRef, useState } from "react"
import { useEffectUpdate } from '../hooks/useEffectUpdate'
import { toyService } from '../services/toy.service'
import { utilService } from "../services/util.service.js"
import { ToySort } from './ToySort'


import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}


function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    }
}

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const toyLabels = toyService.getToyLabels()


    const theme = useTheme()
    const [personLable, setPersonLable] = useState([])


    useEffectUpdate(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleInputChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }

    function handleSelectChange(event) {
        const value = event.target.value
        setPersonLable(typeof value === 'string' ? value.split(',') : value)

        setFilterByToEdit(prev => ({ ...prev, selectedLabels: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter / Sort</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    onChange={handleInputChange}
                    value={filterByToEdit.txt || ''}
                    type="text"
                    placeholder="Search"
                    name="txt"
                    id="name"
                />

                <label htmlFor="inStock">In Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock ?? ''}
                    onChange={handleInputChange}
                >
                    <option value=''>All</option>
                    <option value='true'>In Stock</option>
                    <option value='false'>Not of Stock</option>
                </select>

                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="select-multiple">Select Labels</InputLabel>
                        <Select
                            labelId="select-multiple"
                            id="multi-lable"
                            multiple
                            value={personLable}
                            onChange={handleSelectChange}
                            input={<OutlinedInput label="Select Labels" />}
                            MenuProps={MenuProps}
                        >
                            {toyLabels.map((lable) => (
                                <MenuItem
                                    key={lable}
                                    value={lable}
                                    style={getStyles(lable, personLable, theme)}
                                >
                                    {lable}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </form>
            <ToySort sortBy={filterBy.sortBy} onSetFilter={onSetFilter} />
        </section>
    )
}

