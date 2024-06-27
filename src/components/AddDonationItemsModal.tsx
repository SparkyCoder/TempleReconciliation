import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Input, InputField, InputSlot, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@gluestack-ui/themed";
import { HandleOnDonationItemUpdated, HandleOnDonationItemModalClose } from "../reducers/ApplicationReducer";
import useDropDowns from "../hooks/useDropdowns";
import React, { useState } from "react";

const DonationItemsModal = ({state, dispatch}: any) => {
    const {getDropDown} = useDropDowns();
    const [selectedDonationItem, setSelectedDonationItem] = useState();
    const [nameOfItem, setNameOfItem] = useState();
    const [numberOfItems, setNumberOfItems] = useState();

    const isFormValid = () => {
        let isNumberofItemsValid = state.validate('# of Items', numberOfItems)
        let isDonationItemValid = state.validate('Donation Item Type', selectedDonationItem)
        let isNameOfItemValid = state.validate ('Name of Item', nameOfItem)

        return (isNumberofItemsValid && isDonationItemValid && isNameOfItemValid );
    }

    const onItemAdd = (newItem: any) => {
        let isValid = isFormValid();

        if(isValid){
            let updatedList = state.addedDonationItems;
            updatedList.push(newItem);
            dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
            state.showSuccess('Success', 'Item added.')
            setNameOfItem(undefined);
            setNumberOfItems(undefined);
            setSelectedDonationItem(undefined);
        }
    }
    
    return (<Modal
        isOpen={state.isAddDonationItemModalOpen}
        onClose={() => {dispatch({ type: HandleOnDonationItemModalClose })}}
        >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Add Donation Item(s)</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box  style={{marginTop:'2%'}}>
            {getDropDown(state.donationItems, '', setSelectedDonationItem, 'Donation Item Type', false)}
            </Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Item" value={nameOfItem} onChangeText={(value) => setNameOfItem(value)} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField keyboardType="number-pad"  placeholder="# of Items" value={numberOfItems} onChangeText={(value) => setNumberOfItems(value)} />
          </Input>
          </ModalBody>
          <ModalFooter>
            <Button
            
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {dispatch({ type: HandleOnDonationItemModalClose })}}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => onItemAdd({type: selectedDonationItem, name: nameOfItem, amount: numberOfItems})}
            >
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>);
};

export default DonationItemsModal;