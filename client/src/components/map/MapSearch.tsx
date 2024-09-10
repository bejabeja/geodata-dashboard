import React from 'react';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MAP_INITIAL_POSITION, MAP_ZOOM_LEVEL } from '../../constants';
import { useCsvData } from '../../hooks/useCsvData';
import './MapSearch.css'

function MapSearch() {
    const { csvData } = useCsvData();

    const customIcon = new Icon({
        iconUrl: require("../../icons/marker-icon.png"),
        iconSize: [38, 38]
    });

    const createClusterCustomIcon = (cluster: any) => {
        return divIcon({
            html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
            className: "cluster-icon",
            iconSize: point(33, 33, true)
        });
    };
    return (<MapContainer center={MAP_INITIAL_POSITION} zoom={MAP_ZOOM_LEVEL}>
        <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
        >
            {csvData?.map((marker, index) => (
                <Marker key={index} position={marker.geocode} icon={customIcon}>
                    <Popup>
                        <ul className='map-popup'>
                            {Object.entries(marker).map(([key, value]) => (
                                key !== 'geocode' && key !== 'latitude' && key !== 'longitude' ? (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    </MapContainer>);
}

export default MapSearch;
