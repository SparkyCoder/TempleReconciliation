import { Box, Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { ClassFormProps } from "../../interfaces/forms";
import useDropDowns from "../../hooks/useDropdowns";

const ClassesForm = ({state, type, details, setDetails, items}: ClassFormProps) => {
    const {getDropDown} = useDropDowns();
    const [subItems, setSubItems] = useState<Array<string>>();

    useEffect(() => {
        let selectedItem = state.select(items, type);
        setSubItems(selectedItem.items);
      }, [])

    return (<Box>
            <Box  style={{marginTop:'2%'}}>
            {getDropDown(subItems, '', (value:string) => setDetails({...details, type: value}), 'Sub Item', false)}
            </Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Class Name" value={details?.className ?? ''} onChangeText={(value:string) => setDetails({...details, className: value})} />
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

export default ClassesForm;