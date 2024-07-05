import { Box, Center, CloseIcon, Heading, Icon, Input, InputField, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@gluestack-ui/themed";
import { sha256 } from 'js-sha256';
import uuid from 'react-native-uuid';
import { HandleOnPaymentModalClosed, HandlePostDonationComplete, HandlePostDonationLoading, HandleReceiptCreated } from "../reducers/ApplicationReducer";
import { useEffect, useState } from "react";
import React from "react";
import { DefaultProps } from "../interfaces/state";
import Payments from "../constants/Payments";
import useAxios from "../hooks/useAxios";
import { Donation } from "../interfaces/donation";

const PaymentsModal = ({state, dispatch}: DefaultProps) => {   
    const [currentPin, setCurrentPin] = useState<string>();
    const [referenceNumber, setReferenceNumber] = useState<string>();
    const {postDonation} = useAxios(state, dispatch);

    useEffect(() => {
        onPinChange();
    },[currentPin])

    useEffect(() => {
        if(state.donation.hasPaid){
            onPaid();
        }
    }, [state.donation])

    const onPaid = () => {
        try{
        const onComplete = () => dispatch({type: HandleReceiptCreated });
        state.createReceiptPdf(state, onComplete);
        }
        catch(error){
            state.showError('Error creating receipt', ' ');
            onClose();
        }
    }

    const onPinChange = () => {
        if(!currentPin) return;
        let matchingPin = state.frontDeskPins.filter((frontDeskPin) => sha256(currentPin) === frontDeskPin.pin);
        
        if(matchingPin.length > 1){
            state.showError('Warning', 'This pin matches more than one front desk attendee. Please make sure pins are unique.')
        }
        else if(matchingPin.length === 1){ 
            dispatch({type: HandlePostDonationLoading});
            const id = new Date().getTime().toString();
            let fileName = `Donation-Receipt-${state?.donation?.firstName ?? ''}-${state?.donation?.lastName ?? ''}-${id}.pdf`;
            const donation: Donation = {...state.donation, frontDeskAttendee: matchingPin[0].frontDeskAttendee, id: uuid.v4().toString(), fileName: fileName, hasPaid: true, referenceNumber: referenceNumber ?? '', items: state.addedDonationItems};
            postDonation(donation);
        }
    } 

    const onClose = () => {
        dispatch({type: HandleOnPaymentModalClosed});
    }

    return (<Modal 
    isOpen={state.isPaymentModalOpen}
    onClose={() => onClose()}>
        <ModalBackdrop />
        <ModalContent>
        <ModalHeader>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Center>
                <Box>
                    <Center>
                    <Heading style={{marginTop:'5%'}}>Thank You!</Heading>
                    <Heading style={{marginTop:'15%'}}>Please return the tablet back to the front desk to complete payment</Heading>
                    <Box style={{marginTop:'15%'}} ></Box>
                    {!state.donation?.payment?.includes(Payments.Cash) &&
                    <Input
                        variant="outline"
                        size="md"
                        >
                        <InputField keyboardType="default" placeholder="Reference Number"
                        onChangeText={(value) => setReferenceNumber(value)} />
                    </Input>}
                    <Input
                        variant="outline"
                        size="md"
                        style={{marginTop:'2%'}}
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