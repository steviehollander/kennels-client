import React from "react"
import { Route } from "react-router-dom"
import { LocationList } from "./location/LocationList"
import { AnimalList } from "./animal/AnimalList"
import { CustomerList } from "./customer/CustomerList.js"
import { EmployeeList } from "./employee/EmployeeList";
import { EmployeeForm } from "./employee/EmployeeForm.js"
import { AnimalForm } from "./animal/AnimalForm.js"
import { EmployeeDetail } from "./employee/EmployeeDetail.js"
import { LocationDetail } from "./location/LocationDetail.js"
import { AnimalDetails } from "./animal/AnimalDetail.js"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <LocationList />
            </Route>

            <Route path="/locations/:locationId(\d+)">
                <LocationDetail />
            </Route>

            <Route exact path="/animals">
                <>
                    <main className="animalContainer">
                        <h1>Animals</h1>

                        <AnimalList />
                    </main>
                </>
            </Route>

            <Route exact path="/animals/create">
                <AnimalForm />
            </Route>

            <Route path="/animals/:animalId(\d+)">
                <AnimalDetails />
            </Route>

            <Route path="/animals/edit/:animalId(\d+)">
                <AnimalForm />
            </Route>

            <Route path="/customers">
                <CustomerList />
            </Route>

            <Route path="/employees/create">
                <EmployeeForm />
            </Route>

            <Route path="/employees/:employeeId(\d+)">
                <EmployeeDetail />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>
        </>
    )
}
