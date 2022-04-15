import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { getEmployees } from "./EmployeeManager"
import "./Employees.css"

export const EmployeeList = () => {
    const [ employees, setEmployees ] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        getEmployees().then(employeesData => setEmployees(employeesData))
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>Employees</h1>

            <button onClick={() => history.push("/employees/create")}>
                Add Employee
            </button>

            <article className="employees">
                {
                    employees.map(employee => {
                        return <section className="employee" key={employee.id}>
                            <Link to={`/employees/${employee.id}`}>
                                <h3>{employee.name}</h3>
                            </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}
