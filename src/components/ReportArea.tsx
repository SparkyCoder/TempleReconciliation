import { Box, Button, ButtonText, Center, HStack } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { DefaultProps } from "../interfaces/state";
import Divider from "./Divider";
import DatePicker from "./DatePicker";
import { HandleCancelButtonOnClick } from "../reducers/ApplicationReducer";


const ReportArea = ({state, dispatch} : DefaultProps) => {
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    useEffect(() => {
        var start = new Date();
        start.setHours(0,0,0,0);
        setFromDate(start);
        
        var end = new Date();
        end.setHours(23,59,59,999);
        setToDate(end)
    },[])

    return (
        <Box>
            <Divider text={'Date Range'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
                <HStack style={{width:'100%'}}>
                    <DatePicker label={'From Date '} date={fromDate} setDate={setFromDate} maxDate={toDate} />
                    <DatePicker label={'To Date '} date={toDate} setDate={setToDate} />
                </HStack>
            </Box>
            <Box style={{marginTop:'2%', marginBottom:'2%', width: '100%'}}>
                            <Box style={{marginTop:'2%'}}>
                              <Center>
                                <Button 
                                      size="md"
                                      variant="solid"
                                      action="primary"
                                      onTouchEnd={() => {}}
                                      >
                                      <ButtonText>Generate Audit Report</ButtonText>
                                  </Button>
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