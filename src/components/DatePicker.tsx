import { Box, Button, ButtonIcon, ButtonText, CalendarDaysIcon, Center, Heading, HStack, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";

const DateRangePicker = ({ label, date, setDate, minDate, maxDate } : any) => {
    const [open, setOpen] = useState(false)
    return (<>
        <DatePicker
            modal
            open={open}
            date={date}
            theme="light"
            maximumDate={maxDate ?? new Date("9099-12-31")}
            onConfirm={(date: any) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
        />
        <Box style={{marginVertical:'3%', width:'50%'}}>
        <Center>
        <Text>{date.toLocaleDateString()}</Text>
        <Text>{date.toLocaleTimeString()}</Text>
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