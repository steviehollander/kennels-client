import React, { useState, useEffect } from "react"
import { getEmployees } from "../employee/EmployeeManager"
import { getLocations } from "./LocationManager"
import { getAnimals } from "../animal/AnimalManager"
import { Link } from "react-router-dom"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const [employees, setEmployees] = useState([])
    const [animals, setAnimals] = useState([])

    useEffect(() => {

        getEmployees().then(employeesData => setEmployees(employeesData))
        getAnimals().then(animalsData => setAnimals(animalsData))
    }, [])

    useEffect(() => {
        if (employees && animals) {
            getLocations().then(locationsData => {
                const combined = locationsData.map(location => {
                    location.employees = employees.filter(e => e.location_id === location.id)
                    location.animals = animals.filter(a => a.location_id === location.id)
                    return location
                })
                setLocations(combined)
            })
        }
    }, [employees, animals])

    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Locations</h1>

            <div className="locations">
                {
                    locations.map(location => {
                        return <article key={`location--${location.id}`} className="card location" style={{ width: `18rem` }}>
                            <section className="card-body">

                                <Link className="card-link"
                                    to={{
                                        pathname: `/locations/${location.id}`,
                                        state: { chosenLocation: location }
                                    }}>
                                    <h2 className="card-title">{location.name}</h2>
                                </Link>

                            </section>
                            <section>
                                {`${location.employees.length} ${location.employees.length === 1 ? "employee" : "employees"}`}
                            </section>
                            <section>
                                {`${location.animals.length} ${location.animals.length === 1 ? "animal" : "animals"}`}
                            </section>
                        </article>
                    })
                }
            </div>
        </div>
    )
}
