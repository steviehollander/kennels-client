import React from "react"
import { useLocation } from 'react-router-dom'
import "./Locations.css"

export const LocationDetail = () => {
    const location = useLocation()

    return (
        <section className="location">
            <h2 className="location__name">{location.state.chosenLocation.name}</h2>
            <address className="location__address">{location.state.chosenLocation.address}</address>
            <div>
                <h4>Employees</h4>
                {
                    location.state.chosenLocation.employees?.map(e => e.name).join(", ")
                }
            </div>
            <div>
                <h4>Current Residents</h4>
                {
                    location.state.chosenLocation.animals?.map(a => a.name).join(", ")
                }
            </div>
        </section>
    )
}
