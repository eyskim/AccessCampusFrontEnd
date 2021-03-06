import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import dotenv from 'dotenv';

const CampusMap = ({ coords, buildingName, buildings }) => {
    dotenv.config();
    const [entrances, setEntrances] = useState([]);

    useEffect(() => {
        setEntrances([]);
        setEntrances(getEntrances());
    }, [buildings, buildingName]);

    const mapStyles = {
        height: "50vh",
        width: "87%",
        maxWidth: 900,
        marginBottom: 30,
        border: "solid #CCCCCC 6px",
        borderRadius: 15
    }

    function getEntrances() {
        for (let building of buildings) {
            if (building.name === buildingName) {
                return getConvertedEntrances(building.entrances);
            }
        }
        return [];
    }

    function getConvertedEntrances(apiEntrances) {
        let result = apiEntrances.map((entrance) => (
            { lat: entrance.coords.lat, lng: entrance.coords.lng }
        ));
        return result;
    }

    function calculateCenter() {
        let lat = 0;
        let lng = 0;
        entrances.forEach(coord => {
            lat += coord.lat;
            lng += coord.lng;
        });
        lat = lat / entrances.length;
        lng = lng / entrances.length;
        return { lat: lat, lng: lng }
    }

    const mapCenter = entrances.length === 0 ?
        coords :
        calculateCenter();

    const mapZoom = entrances.length === 0 ?
        14 :
        17.5;

    const onMarkerClick = (lat, lng) => {
        window.open(`http://maps.google.com/maps?q=loc:${lat},${lng}`, "_blank")
    }

    const mapOptions = {
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false
    }

    return (
        <div className="campus-map">
            <LoadScript
                googleMapsApiKey={process.env.API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={mapCenter}
                    zoom={mapZoom}
                    options={mapOptions}
                >
                    {entrances.map((entrance, index) => (
                        <Marker
                            key={index}
                            position={{ lat: entrance.lat, lng: entrance.lng }}
                            onClick={() => onMarkerClick(entrance.lat, entrance.lng)} >
                        </Marker>
                    ))}
                </GoogleMap>
            </LoadScript >
        </div >
    );
};

export default CampusMap;