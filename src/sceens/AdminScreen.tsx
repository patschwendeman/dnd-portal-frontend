import { useContext, FunctionComponent, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import { MapOverview } from '../components/MapOverview'
import { ActiveSceneContext } from '../context/context'
import { Map } from '../models/models'
import { getBattlemapsfiltered } from '../service/battlemaps'
import { getSceneDetails } from '../service/scenes'

const Screen = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;S
    align-items: center;
    justify-content: center;
`

const SidebarRight = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: end;
    top: 0;
    right: 0;
    bottom: 50px;
    width: 400px;
    background-color: #242424;
`

const SidebarMapContainer = styled.div`
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4b4b4b;
    padding: 20px 0 20px 0;
`

const BottomBar = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #242424;
`

const AdminScreen: FunctionComponent = (): ReactElement => {
    const {activeScene, setActiveScene } = useContext(ActiveSceneContext)
    const [sceneDetails, setSceneDetails] = useState([])
    const [battlemaps, setBattlemaps] = useState<Map[]>([])

    useEffect(() => {
        getSceneDetails(setSceneDetails)
        getBattlemapsfiltered(setBattlemaps, { players: false })
    }, [])

    useEffect(() => {
        if (battlemaps && battlemaps.length > 0) {
            console.log(battlemaps)
        }
    }, [battlemaps])
    // Propably seperate fight scenes and non fight scenes
    function handleSceneSelection(id: number): number {
        setActiveScene(id)
        // OpenDialogue
        // DialoguOptionHandler   [Take in to Dialog Component and givs back option]
        // If (DialoguOptionHandler === false) return
        // getSceneID
        // handleAcriveScene(sceneID)
        return id
    }

    return(
        <Screen>
            <SidebarRight>
                <SidebarMapContainer>
                    <MapOverview battlemaps={battlemaps} gap='3px' handleSceneSelection={handleSceneSelection}  />
                </SidebarMapContainer>
            </SidebarRight>
            <BottomBar></BottomBar>
        </Screen>
        
    )

}
export { AdminScreen }