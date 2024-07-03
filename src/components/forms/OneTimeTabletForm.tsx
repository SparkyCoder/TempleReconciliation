import { Box, Button, ButtonIcon, ButtonText, CalendarDaysIcon, Input, InputField, InputSlot } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import {OneTimeTabletFormProps } from "../../interfaces/forms";

const OneTimeTabletForm = ({details, setDetails}: OneTimeTabletFormProps) => {
    useEffect(() => {
        setDetails({...details, type: 'One-Time Tablet', amount: '1'})
    }, [])
    return (<Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Deceased" value={details?.name ?? ''} onChangeText={(value:string) => setDetails({...details, name: value})} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Relationship" value={details?.relationship ?? ''} onChangeText={(value:string) => setDetails({...details, relationship: value})} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Relative" value={details?.relative ?? ''} onChangeText={(value:string) => setDetails({...details, relative: value})} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Date" value={details?.date ?? ''} onChangeText={(value:string) => setDetails({...details, date: value})} />
          </Input>
    </Box>);
};

export default OneTimeTabletForm;