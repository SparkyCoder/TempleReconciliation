import { Box, Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React, { useEffect } from "react";
import {OthersFormProps } from "../../interfaces/forms";

const OthersForm = ({details, setDetails}: OthersFormProps) => {
    useEffect(() => {
        setDetails({...details, type: 'Other', amount: '1'})
    }, [])
    return (<Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Remarks / Notes" value={details?.remarks ?? ''} onChangeText={(value:string) => setDetails({...details, remarks: value})} />
          </Input>
    </Box>);
};

export default OthersForm;