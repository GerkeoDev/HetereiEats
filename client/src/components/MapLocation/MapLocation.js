import React, { useContext, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { Context } from '../../PageRouter'

//LoadScript no funciona porque al cambiar de apartado el mapa se queda cargando

const MapLocation = () => {
    const {latLng, setLatLng} = useContext(Context)
    const libraries = ['places']
    const [markerPosition, setMarkerPosition] = useState(latLng)
    const handleMapClick = e => {
        setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    });
    useEffect(()=>{
        setLatLng(markerPosition)
    },[markerPosition])
    return  <div className='text-sm'>
        {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}> */}
        {isLoaded?
            <GoogleMap
                mapContainerStyle={{width: '240px', height: '220px'}}
                center = {latLng}
                zoom = {8}
                onClick={handleMapClick}
            >
                {markerPosition && <MarkerF position={markerPosition} />}
            </GoogleMap>
        : <p>Loading...</p>
        }
        {/* </LoadScript> */}
        {/* <p>Lat: {markerPosition?.lat}</p>
        <p>Lng: {markerPosition?.lng}</p> */}
    </div>
    
}

export default MapLocation
