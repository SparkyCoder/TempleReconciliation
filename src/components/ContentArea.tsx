import { Box, Center, HStack, VStack } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import Tile from "./Tile";
import useDimensions from "../hooks/useDimensions";
import { useReducer } from "react";
import tileReducer, { HandleDonationTileOnClick } from "../reducers/ContentReducer";
import Loading from "./Loading";

const ContentArea = () => {
    const {isVertical} = useDimensions();
    const [state, dispatch] = useReducer(tileReducer, {})

    const getTiles = () => {
        return (
            <>
                <Tile title={'Donation'} onClick={() => dispatch({ type: HandleDonationTileOnClick })} />
                <Tile title={'End-of-Day Audit'} isLoading={state.isLoad} onClick={() => dispatch({ type: HandleDonationTileOnClick })} />
            </>
        )
    }

    return (
        <Box style={styles.full}>
            <Loading state={state} dispatch={dispatch} />
            {isVertical ? 
            <VStack space="md" style={styles.stack}>
                    {getTiles()}
            </VStack>
            :
            <Center>
                <HStack space='lg' style={styles.stack}>
                    {getTiles()}
                </HStack>
            </Center>}                          
        </Box>
    );
};

export default ContentArea;