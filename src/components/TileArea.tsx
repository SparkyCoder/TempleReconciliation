import { Center, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import Tile from "./Tile";
import useDimensions from "../hooks/useDimensions";
import { HandleDonationTileOnClick } from "../reducers/ApplicationReducer";
import Loading from "./Loading";
import React from "react";

const TileArea = ({state, dispatch} : any) => {
    const {isVertical} = useDimensions();

    const getTiles = () => {
        return (
            <>
                <Tile title={'Donation'} subText={'捐助'} image={require('../../src/media/Donation.png')} onClick={() => dispatch({ type: HandleDonationTileOnClick })} />
                <Tile title={'Audit Report'} subText={'报告'} image={require('../../src/media/Report.png')} isLoading={state.isLoad} onClick={() => console.log("Report Click!")} />
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