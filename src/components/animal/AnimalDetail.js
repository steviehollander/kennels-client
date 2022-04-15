import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

import { getAnimalById, releaseAnimal } from "./AnimalManager"
import "./Animals.css"

export const AnimalDetails = () => {
    const [animal, setAnimal] = useState({ location: {}, customer: {} })
    const { animalId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getAnimalById(animalId)
            .then(setAnimal)
    }, [])

    return (
        <section className="animal">
            <h3 className="animal__name">{animal.name}</h3>
            <div className="animal__breed">{animal.breed}</div>
            <div className="animal__location">Location: {animal.location?.name}</div>
            <div className="animal__owner">Customer: {animal.customer?.name}</div>
            <div className="animal__status">Status: {animal.status}</div>

            <button onClick={() => releaseAnimal(animal.id).then(() => history.push("/animals"))} >Release Animal</button>

            <button onClick={() => {
                history.push(`/animals/edit/${animal.id}`)
            }}>Edit</button>
        </section>
    )
}
