import { Box, Center, Heading, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalContent } from "@gluestack-ui/themed";
import { sha256 } from 'js-sha256';
import uuid from 'react-native-uuid';
import { HandlePostDonationComplete, HandleReceiptCreated } from "../reducers/ApplicationReducer";
import { useEffect, useState } from "react";

const PaymentsModal = ({state, dispatch}: any) => {   
    const [currentPin, setCurrentPin] = useState();

    useEffect(() => {
        onPinChange();
    },[currentPin])

    useEffect(() => {
        if(state.donation.hasPaid){
            const onComplete = () => dispatch({type: HandleReceiptCreated });
            
            state.createReceiptPdf(state, onComplete);
        }
    }, [state.donation])

    const onPinChange = () => {
        if(!currentPin) return;

        let matchingPin = state.frontDeskPins.filter(frontDeskPin => sha256(currentPin) === frontDeskPin.data.pin);
        
        if(matchingPin.length > 1){
            state.showError('Warning', 'This pin matches more than one front desk attendee. Please make sure pins are unique.')
        }
        else if(matchingPin.length === 1){ 
            state.showSuccess('Success', 'Pin Matched')
            state.showSuccess('Success', 'Donation Saved!')
            //Call POST to save donation in AWS
            ///Just for testing
            dispatch({type: HandlePostDonationComplete, payload: {attendee: matchingPin[0].data.frontDeskAttendee, id: uuid.v4() }});
            /////////
        }
    } 

    return (<Modal 
    isOpen={state.isPaymentModalOpen}
    closeOnOverlayClick={false}>
        <ModalBackdrop />
        <ModalContent>
          <ModalBody>
            <Center>
                <Box>
                    <Center>
                    <Heading style={{marginTop:'5%'}}>Thank You!</Heading>
                    <Heading style={{marginTop:'15%'}}>Please return the tablet back to the front desk to complete payment</Heading>
                    <Input
                        variant="outline"
                        size="md"
                        style={{marginTop:'15%'}}
                        >
                        <InputField keyboardType="number-pad" placeholder="ENTER PIN"
                        onChangeText={(value) => setCurrentPin(value)} />
                    </Input>
                    </Center>
                </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>);
};

export default PaymentsModal;