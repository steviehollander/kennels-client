import React, { useEffect, useState } from "react"
import { getAnimals } from "../animal/AnimalManager";
import { getCustomers } from "./CustomerManager";
import "./Customers.css"

export const CustomerList = () => {
    const [ animals, setAnimals ] = useState([])
    const [ customers, setCustomers ] = useState([])

    useEffect(() => {
        getCustomers().then(customersData => setCustomers(customersData))
        getAnimals().then(animalsData => setAnimals(animalsData))
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>Customers</h1>
            <article className="customers">
                {
                    customers.map(customer => {
                        customer.animals = animals.filter(a => customer.id === a.customer_id) || []
                        return <section key={customer.id} className="customer">
                            <h2>{customer.name}</h2>
                            <div>{customer.address}</div>

                            <h4>Animals</h4>
                            { customer.animals && customer.animals.map(a => <div key={`animal--${a.id}`}>{a.name} ({a.breed})</div>)}
                        </section>
                    })
                }
            </article>
        </div>
    )
}
