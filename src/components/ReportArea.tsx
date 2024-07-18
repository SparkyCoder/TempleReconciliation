import { Box, Button, ButtonText, Center, HStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { DefaultProps } from "../interfaces/state";
import Divider from "./Divider";
import DatePicker from "./DatePicker";
import { ReducerTypes } from "../reducers/ApplicationReducer";
import moment from "moment";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import useExcel from "../hooks/useExcel";
import { SavedDonation } from "../interfaces/donation";


const ReportArea = ({state, dispatch} : DefaultProps) => {
    const [fromDate, setFromDate] = useState(moment().startOf("day"))
    const [toDate, setToDate] = useState(moment().endOf("day"))
    const [showGenerateReport, setShowGenerateReport] = useState(true);
    const {getDonations} = useAxios(state, dispatch);
    const {exportDataToExcel} = useExcel(state, dispatch);

    useEffect(() => {
        if(toDate.diff(fromDate, 'days') >= 7){
            state.showError('Error', 'Date ranges greater than 7 days incur larger AWS costs. Please narrow down your results.')
            setShowGenerateReport(false);
            return;
        }

        if(toDate <= fromDate){
            state.showError('Error', 'To date must be greater than from date.')
            setShowGenerateReport(false);
            return;
        }

        setShowGenerateReport(true);
    }, [fromDate, toDate])

    useEffect(() => {
        exportDataToExcel();
    }, [state.reportData]);

    const onGenerateReportClick = () => {
       dispatch({type: ReducerTypes.HandleGetDonationsLoading})
       getDonations(fromDate.valueOf().toString(), toDate.valueOf().toString(), (value: Array<SavedDonation>) => {
           if(value.length === 0) {
              state.showError('No Results Found.', 'Please adjust your filter criteria.')
         }
       });
    }

    return (
        <Box>
            <Loading isLoading={state.isGetDonationsLoading} title={'Loading...'} />
            <Divider text={'Date Range'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
                <HStack style={{width:'100%'}}>
                    <DatePicker label={'From Date '} date={fromDate} setDate={setFromDate} />
                    <DatePicker label={'To Date '} date={toDate} setDate={setToDate} />
                </HStack>
            </Box>
            <Box style={{marginTop:'2%', marginBottom:'2%', width: '100%'}}>
                <Box style={{marginTop:'2%'}}>
                    <Center>
                    {showGenerateReport && <Button 
                            size="md"
                            variant="solid"
                            action="primary"
                            onTouchEnd={() => onGenerateReportClick()}
                            >
                            <ButtonText>Generate Audit Report</ButtonText>
                        </Button>}
                    </Center>
                </Box>
                <Box style={{marginTop:'15%'}}>
                    <Center>
                    <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            onTouchEnd={() => dispatch({ type: ReducerTypes.HandleCancelButtonOnClick })}
                            >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                    </Center>
                </Box>
            </Box>
        </Box>
    );
};

export default ReportArea;