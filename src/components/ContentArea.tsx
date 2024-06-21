import { Box, Center, HStack, VStack } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import Tile from "./Tile";
import useDimensions from "../hooks/useDimensions";

const ContentArea = () => {
    const {isVertical} = useDimensions();

    const handleDonationTileOnClick = () => {
        console.log('Donation')
    }

    const handleReportTileOnClick = () => {
        console.log('Report')
    }

    const getTiles = () => {
        return (
            <>
                <Tile title={'Donation'} onClick={() => handleDonationTileOnClick()} />
                <Tile title={'End-of-Day Audit'} onClick={() => handleReportTileOnClick()} />
            </>
        )
    }

    return (
        <Box style={styles.full}>
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