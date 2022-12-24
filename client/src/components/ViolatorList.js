import React from 'react'
import "./styles/ViolatorList.css"

export const ViolatorList = (props) => {

  const Spinner = () => <div className="loader"></div>;

  return (
    <div className='violators'>
        <h2>Recent Violators</h2>
        {(props.violators.length < 2)
        ? <div className='spinner'><Spinner/></div>
        :
        <ul>
            {props.violators.map((violator) => {

                // Convert date to time
                let date = new Date(violator.timestamp);
                let timestamp = date.toLocaleTimeString('fi-FI').replace(".", ":").replace(".", ":")
                
                return(
                <li key={violator.droneSerialNumber}>
                    <h3 className="serialNumber">{violator.FirstName} {violator.LastName} - {violator.droneSerialNumber}</h3>
                    <p className="snippet">Last sighting inside ndz - {timestamp}</p>
                    <p className="snippet">Closest distance from birdnest - {violator.distance}m</p>
                    <p className="snippet">Phone Number - {violator.PhoneNumber} </p>
                    <p className="snippet">Email - {violator.Email} </p>
                </li>
                )
            })}          
        </ul>
        }
    </div>
  )
}
