import { Box, Button, ButtonIcon, ButtonText, CalendarDaysIcon, Center, HStack, Text } from "@gluestack-ui/themed";
import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";

const DateRangePicker = ({ label, date, setDate, minDate, maxDate } : any) => {
    const [open, setOpen] = useState(false)
    return (<>
        <DatePicker
            modal
            open={open}
            date={date?.toDate()}
            theme="light"
            onConfirm={(date: any) => {
            let newDate = new moment(date)
            setOpen(false)
            setDate(newDate)
            }}
            onCancel={() => {
            setOpen(false)
            }}
        />
        <Box style={{marginVertical:'3%', width:'50%'}}>
        <Center>
        <Text>{date.toDate().toLocaleDateString()}</Text>
        <Text>{date.toDate().toLocaleTimeString()}</Text>
            <HStack>
                <Button  
                borderRadius="$2xl"
                size="lg"
                variant='solid'
                action="secondary"
                onPress={() => setOpen(true)} >
                    <ButtonText>{label}</ButtonText>
                    <ButtonIcon as={CalendarDaysIcon} />
                </Button>
            </HStack>
        </Center>
    </Box>
    </>)
}

export default DateRangePicker