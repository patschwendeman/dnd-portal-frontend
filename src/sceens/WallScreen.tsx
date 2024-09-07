import React,{ FunctionComponent, ReactElement, useEffect, useState } from "react"
import { MapOverview } from "../components/MapOverview"
import styled from 'styled-components';
import { getBattlemapsfiltered } from '../service/battlemaps';
import { Map } from '../models/models';


const Screen = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
`;

const MapContainer = styled.div`
    display: flex;
    width: 60%;
    height: 60%;
    align-items: center;
    justify-content: center;
    z-index: 99999;
`;

const BackgroundImage = styled.img`
    width: 100%;
    z-index: 1;
    position: fixed;
`;


const WallScreen: FunctionComponent = (): ReactElement => {
    const [battlemaps, setBattlemaps] = useState<Map[]>([]);
    useEffect(() => {
        getBattlemapsfiltered(setBattlemaps, { filter_element: true });
    }, []);

    useEffect(() => {
        if (battlemaps && battlemaps.length > 0) {
            console.log(battlemaps);
        }
    }, [battlemaps]);

    return(
        <Screen>
            <BackgroundImage src="/test.jpg" alt="" /> 
            <MapContainer> 
                <MapOverview battlemaps={battlemaps} gap="10px"/>
            </MapContainer>
        </Screen>       
    )
}
export { WallScreen }