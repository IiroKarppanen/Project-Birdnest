import React from 'react'
import "./styles/ViolatorList.css"

export const ViolatorList = (props) => {

  return (
    <div className='violators'>
        <h2>Recent Violators</h2>
        <ul className="violator-list">
            {props.violators.map((violator) => {

                // Convert date to time
                let date = new Date(violator.timestamp);
                let timestamp = date.toLocaleTimeString('fi-FI').replace(".", ":").replace(".", ":")
                
                return(
                <li>
                    <h3 className="serialNumber">{violator.FirstName} {violator.LastName} </h3>
                    <p className="snippet">Last sighting inside ndz - {timestamp}</p>
                    <p className="snippet">Closest confirmed distance - {violator.distance}m</p>
                    <p className="snippet">Phone Number - {violator.PhoneNumber} </p>
                    <p className="snippet">Email - {violator.Email} </p>
                </li>
                )
            })}
            
        </ul>
    </div>
  )
}
