import React, { useEffect, useState } from 'react';
import SocketIOClient from 'socket.io-client'
import { ViolatorList } from './components/ViolatorList';
import { DroneMap } from './components/DroneMap'; 
import './App.css';

function App() {

  const [violators, setViolators] = useState([{}])
  const [allDrones, setAllDrones] = useState([{}])

  useEffect(() => {
  const socket = SocketIOClient('https://birdnest-server.onrender.com')
    socket.on('data', (violators, alldrones) => {
      setViolators(violators)
      setAllDrones(alldrones)
      socket.off('off')
    })
  }, [])


  return (

    <div className='App'>
      <h1>NDZ-Perimeter watch</h1>

      <div className="content">

        <div className="map-component">
          <div className='map-title'>
            <h5>Snapshot Area</h5>
          </div>
            <DroneMap allDrones={allDrones}/>
        </div>

        <div className="list-component">
          <ViolatorList violators={violators}/>
        </div>
      </div>
    </div>

  );
}

export default App;
