import React, { useState, useEffect } from "react"
import { addAnimal, updateAnimal, getAnimalById } from "./AnimalManager"
import { getLocations } from "../location/LocationManager"
import { useParams, useHistory } from 'react-router-dom'

export const AnimalForm = () => {
    // Use the required context providers for data
    const [locations, setLocations] = useState([])
    const { animalId } = useParams()
    // Component state
    const [animal, setAnimal] = useState({})
    const history = useHistory()

    // Is there a a URL parameter??
    const editMode = animalId ? true : false  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newAnimal = Object.assign({}, animal)          // Create copy
        newAnimal[event.target.name] = event.target.value    // Modify copy
        setAnimal(newAnimal)                                 // Set copy as new state
    }

    // Get animals from API when component initializes
    useEffect(() => {
        if (editMode) {
            getAnimalById(animalId).then((res) => {
                setAnimal(res)
            })
        }
        getLocations().then(locationsData => setLocations(locationsData))
    }, [])

    const constructNewAnimal = () => {
        const locationId = parseInt(animal.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                // PUT
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    status: animal.status,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => history.push("/animals"))
            } else {
                // POST
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    status: animal.status,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => history.push("/animals"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{editMode ? "Update Animal" : "Admit Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Animal name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Animal name"
                        defaultValue={animal.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed: </label>
                    <input type="text" name="breed" required className="form-control"
                        placeholder="Animal breed"
                        defaultValue={animal.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: </label>
                    <select name="locationId" className="form-control"
                        value={animal.location_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {
                            locations.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Status: </label>
                    <textarea type="text" name="status" className="form-control"
                        value={animal.status}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    )
}
