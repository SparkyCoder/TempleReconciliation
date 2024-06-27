import { Box, Center, Heading, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalContent } from "@gluestack-ui/themed";
import { sha256 } from 'js-sha256';
import { HandlePostDonationComplete } from "../reducers/ApplicationReducer";
import { useEffect, useState } from "react";

const PaymentsModal = ({state, dispatch}: any) => {   
    const [currentPin, setCurrentPin] = useState();

    useEffect(() => {
        onPinChange();
    },[currentPin])

    const onPinChange = () => {
        if(!currentPin) return;

        let matchingPin = state.frontDeskPins.filter(frontDeskPin => sha256(currentPin) === frontDeskPin.data);
        
        if(matchingPin.length > 0){ 
            state.showSuccess('Success', 'Pin Matched')
            state.showSuccess('Success', 'Donation Saved!')
            //Call POST to save donation in AWS
            ///Just for testing
            dispatch({type: HandlePostDonationComplete });
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