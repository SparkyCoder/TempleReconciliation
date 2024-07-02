import { Box, Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React from "react";
import { DefaultFormProps } from "../../interfaces/forms";

const DefaultForm = ({details, setDetails}: DefaultFormProps) => {
    return (<Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Item" value={details?.name ?? ''} onChangeText={(value:string) => setDetails({...details, name: value})} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField keyboardType="number-pad"  placeholder="Amount" value={details?.amount ?? ''} onChangeText={(value:string) => setDetails({...details, amount: value})} />
          </Input>
    </Box>);
};

export default DefaultForm;