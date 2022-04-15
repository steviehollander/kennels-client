import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getAnimals, getAnimalsBySearchTerm } from "./AnimalManager"
import Animal from "./Animal"
import "./Animals.css"
import { AnimalSearch } from "./AnimalSearch"

export const AnimalList = () => {

    const [ animals, setAnimals ] = useState([])
    const [ searchTerm, setSearchTerm ] = useState('')
    const history = useHistory()

    // Initialization effect hook -> Go get animal data
    useEffect(()=> {
        if (searchTerm.length > 1) {
            getAnimalsBySearchTerm(searchTerm).then((animalsData) => setAnimals(animalsData))
        } else {
            getAnimals().then((animalsData) => setAnimals(animalsData))
        }
    }, [searchTerm])

    const onSearchTermChange = (value) => {
        setSearchTerm(value)
    }

    return (
        <>
            <AnimalSearch onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} />
            <div style={{ marginTop: "2rem"}}>
                <button onClick={() => history.push("/animals/create")}>
                    Make Reservation
                </button>
                <div className="animals">
                    {
                        animals.map(animal => <Animal key={animal.id} animal={animal} />)
                    }
                </div>
            </div>
        </>
    )
}
