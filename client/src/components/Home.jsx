import React from 'react'
import { useState } from 'react'
import { Clustering } from './Clustering'
import { CrimeMap } from './CrimeMap'
import { HeatMap } from './HeatMap'

export const Home = () => {
  const [mapType, setMapType]=useState("pin")
  function getMap(type){
    switch(type){
      case "pin": 
        return <CrimeMap/>
      case "Heat Map": 
        return <HeatMap/>
      case "Clustering": 
        return <Clustering/>
      default: 
        return <CrimeMap/>
      
    }
  }
  return (
    <div>
      <button onClick={()=>{setMapType("pin")}}>
            Pin Map
        </button>
       <button onClick={()=>{setMapType("Heat Map")}}>
            Heat Map
        </button>
        <button onClick={()=>{setMapType("Clustering")}}>
            Clustering
        </button>
        
    {
      getMap(mapType)
    }

    </div>
  )
}