import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CampusMap from '../campus-map/CampusMap';
import BuildingSelector from '../building-selector/BuildingSelector';

const CampusPage = ({ campus, color, index }) => {
    const [buildingName, setBuildingName] = useState("");
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        async function getBuildings() {
            const res = await axios.get("https://access-campus-api.herokuapp.com/api/buildings");
            setBuildings(res.data.data);
        }
        getBuildings();
    }, [buildingName]);

    const handleBuildingChoice = e => {
        console.log("I got to here");
        setBuildingName(e.target.value)
    };

    return (
        <div className="campus-page">
            <h1>{buildingName}</h1>
            <Grid container>
                <Grid item xs={12} md={6} item>
                    <CampusMap
                        key={index}
                        index={index}
                        campus={campus}
                        color={color}
                        buildings={buildings}
                        buildingName={buildingName}
                    />
                </Grid>
                <Grid item xs={12} md={6} item>
                    <BuildingSelector
                        campus={campus}
                        buildings={buildings}
                        buildingName={buildingName}
                        handleBuildingChoice={handleBuildingChoice}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CampusPage;