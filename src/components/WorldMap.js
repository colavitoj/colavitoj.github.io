import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DraggableMarker from './DraggableMarker'
import { Box } from '@material-ui/core'



const WorldMap = () => {

    const offlineURL = './tiles/{z}/{x}/{y}.png';
    const position = [50, -35];

    return (
        <Box style={{ width: '78vw', height: '65vw' }}>
            <MapContainer center={position} zoom={2}>
                <TileLayer url={offlineURL} noWrap={true} maxZoom={4} minZoom={3} />
                <DraggableMarker />
            </MapContainer>
        </Box >
    )
}

export default WorldMap