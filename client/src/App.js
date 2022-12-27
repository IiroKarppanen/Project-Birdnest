import React, { useEffect, useState } from 'react';
import SocketIOClient from 'socket.io-client'
import { ViolatorTable } from './components/ViolatorTable';
import { DroneMap } from './components/DroneMap'; 
import './App.css';

function App() {

  const [violators, setViolators] = useState([{}])
  const [allDrones, setAllDrones] = useState([{}])
  const [mapVisible, setMapVisible] = useState(false)

  const Spinner = () => <div className="loader"></div>;

  useEffect(() => {
  const socket = SocketIOClient('https://birdnest-server.onrender.com')
    socket.on('data', (violators, alldrones) => {
      setAllDrones(alldrones)
      setViolators(violators)
      socket.off('off')
    })
  }, [])

  return (

    <div className='App'>
      

      <div className="content">
          <h1>NDZ-Perimeter watch</h1>
          <div className='toggle-div'>
            <button onClick={() => setMapVisible(!mapVisible)}>{mapVisible ? "View Table" : "View Map"}</button>
          </div>

          {(violators.length < 2)
          ? <div className='loading-div'><Spinner /></div>
          :
          (mapVisible) 
          ? <div className='map-div'> 
              <h3>Snapshot Area</h3>
              <DroneMap allDrones={allDrones} />
            </div>
          : <ViolatorTable violators={violators}/> 
          }
          
      </div>
    </div>

  );
}

export default App;
