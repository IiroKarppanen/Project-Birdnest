import React, { useEffect, useState, useRef } from 'react';
import "./styles/DroneMap.css"

export const DroneMap = (props) => {
  const [mapWidth, setMapWidth] = useState(0)
  const mapRef = useRef(null); 

  useEffect(() => {
    if (mapRef.current != null) {
      setMapWidth(mapRef.current.offsetWidth)
    }
  }, [mapRef])

  // Keep track of map width
  window.addEventListener('resize', () => {
    if (mapRef.current != null) {
      setMapWidth(mapRef.current.offsetWidth)
  }});

  const defineDotColor = (x, y) => {
    const distanceFromCenter = (Math.sqrt((x - 250000) ** 2 + (y - 250000) ** 2)) / 1000
    if (distanceFromCenter < 100) {return '#ff3838'}
    if (distanceFromCenter < 130) {return '#eafa3c'}
    if (distanceFromCenter > 130) {return '#59ff40'} 
  }

  return (
    <div className="map-container" ref={mapRef}>
        <div id="circle"></div>
        <div id="title">No Drone Zone</div>
        {props.allDrones.map((drone) => {
            return(
              <span className="dot" style={{ 
              "--posX": `${"X -", (mapWidth / 500) * (drone.positionX / 1000)}px`, 
              "--posY": `${"X -", (mapWidth / 500) * (drone.positionY / 1000)}px`, 
              "--dotColor": `${defineDotColor(drone.positionX, drone.positionY)}`}}>
              </span>
            )
        })}
    </div>
  
  )
}
