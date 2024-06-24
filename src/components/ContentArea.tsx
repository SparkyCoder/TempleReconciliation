import { Box, Center, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
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
                <Tile title={'Donation'} subText={'捐助'} image={require('../../src/media/Donation.png')} onClick={() => console.log('Placeholder for Donations...')} />
                <Tile title={'Audit Report'} subText={'报告'} image={require('../../src/media/Report.png')} isLoading={auditState.isLoad} onClick={() => onAuditReportClick()} />
            </>
        )
    }

    return (
        <Box style={[styles.full, styles.contentArea]}>
            <Center>
                <Box style={styles.subContentArea}>
                    <Loading state={auditState} title={'Loading report data...'} />
                    {isVertical ? 
                    <VStack space="md" style={styles.stack}>
                            <ScrollView style={{width:'100%'}}>
                                <Center>
                                    {getTiles()}
                                    {getTiles()}
                                    {getTiles()}
                                </Center>
                            </ScrollView>
                    </VStack>
                    :
                        <HStack space='lg' style={styles.stack}>
                            <ScrollView horizontal={true} style={{width:'100%'}}>
                                {getTiles()}
                            </ScrollView>
                        </HStack>
                    } 
                </Box>
            </Center>                         
        </Box>
    );
};

export default ContentArea;