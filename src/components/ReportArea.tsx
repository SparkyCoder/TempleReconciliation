import { Box, Button, ButtonText, Center, HStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { DefaultProps } from "../interfaces/state";
import Divider from "./Divider";
import DatePicker from "./DatePicker";
import { HandleCancelButtonOnClick } from "../reducers/ApplicationReducer";
import moment from "moment";


const ReportArea = ({state, dispatch} : DefaultProps) => {
    const [fromDate, setFromDate] = useState(new moment().set({hour:0,minute:0,second:0,millisecond:0}))
    const [toDate, setToDate] = useState(new moment().set({hour:12,minute:59,second:0,millisecond:0}))
    const [showGenerateReport, setShowGenerateReport] = useState(true);

    useEffect(() => {
        if(toDate.diff(fromDate, 'days') >= 3){
            state.showError('Error', 'Date ranges greater than 3 days incur larger AWS costs. Please narrow down your results.')
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

    return (
        <Box>
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
                                      onTouchEnd={() => {}}
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
                                      onTouchEnd={() => dispatch({ type: HandleCancelButtonOnClick })}
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