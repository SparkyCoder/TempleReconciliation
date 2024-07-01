import { Box, Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import useDropDowns from "../../hooks/useDropdowns";

const DefaultForm = ({state, type, details, setDetails}: {state:any, type:string, details:object, setDetails:any}) => {
    const {getDropDown} = useDropDowns();
    const [items, setItems] = useState<[]>([]);

    useEffect(() => {
      let selectedDonation = state.select(state.donationTypes, type);
      setItems(selectedDonation.items ?? []);
    }, [])


    return (<Box>
            <Box  style={{marginTop:'2%'}}>
            {getDropDown(items, '', (value:string) => setDetails({...details, type: value}), 'Donation Item', false)}
            </Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Item" value={details.name} onChangeText={(value:string) => setDetails({...details, name: value})} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField keyboardType="number-pad"  placeholder="# of Items" value={details.amount} onChangeText={(value:number) => setDetails({...details, amount: value})} />
          </Input>
    </Box>);
};

export default DefaultForm;