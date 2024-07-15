import { Center, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import Tile from "./Tile";
import useDimensions from "../hooks/useDimensions";
import { ReducerTypes } from "../reducers/ApplicationReducer";
import Loading from "./Loading";
import React from "react";
import { DefaultProps } from "../interfaces/state";

const TileArea = ({state, dispatch} : DefaultProps) => {
    const {isVertical} = useDimensions();

    const getTiles = () => {
        return (
            <>
                { state.accessKey && state.secretKey && 
                    <>
                        <Tile title={'Donation'} subText={'捐助'} image={require('../../src/media/Donation.png')} onClick={() => dispatch({ type: ReducerTypes.HandleDonationTileOnClick })} />
                        <Tile title={'Audit Report'} subText={'报告'} image={require('../../src/media/Report.png')} onClick={() => dispatch({type: ReducerTypes.HandleReportTileOnClick})} />
                    </>
                }
                <Tile title={'Settings'} subText={'设置'} image={require('../../src/media/Settings.png')} onClick={() => dispatch({ type: ReducerTypes.HandleSettingsTileOnClick })} />
            </>
        )
    }

    return (
        <>
                    <Loading state={state} title={'Loading report data...'} />
                    {isVertical ? 
                    <VStack space="md" style={styles.stack}>
                            <ScrollView style={styles.scrollview}>
                                <Center>
                                    {getTiles()}
                                </Center>
                            </ScrollView>
                    </VStack>
                    :                    
                        <HStack space='lg' style={styles.stack}>
                            <ScrollView horizontal={true} style={styles.scrollview}>
                                {getTiles()}
                            </ScrollView>
                        </HStack>
                       
                    } 
               </>
    );
};

export default TileArea;