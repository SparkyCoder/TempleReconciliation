import { Box, Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import Tile from "./Tile";
import useDimensions from "../hooks/useDimensions";
import { useReducer } from "react";
import AuditReportReducer, { HandleAuditReportOnClick } from "../reducers/AuditReportReducer";
import Loading from "./Loading";
import useAuditReport from "../hooks/useAuditReport";

const ContentArea = () => {
    const {isVertical} = useDimensions();
    const [auditState, auditDispatch] = useReducer(AuditReportReducer, {})
    const {getAuditData} = useAuditReport(auditDispatch);

    const onAuditReportClick = () => {
        getAuditData();
        auditDispatch({ type: HandleAuditReportOnClick });
    }

    const getTiles = () => {
        return (
            <>
                <Tile title={'Donation'} onClick={() => console.log('Placeholder for Donations...')} />
                <Tile title={'End-of-Day Audit'} isLoading={auditState.isLoad} onClick={() => onAuditReportClick()} />
            </>
        )
    }

    return (
        <Box style={styles.full}>
            <Loading state={auditState} title={'Loading report data...'} />
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