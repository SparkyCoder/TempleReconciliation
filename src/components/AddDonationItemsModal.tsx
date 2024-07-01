import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Input, InputField, InputSlot, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@gluestack-ui/themed";
import { HandleOnDonationItemUpdated, HandleOnDonationItemModalClose } from "../reducers/ApplicationReducer";
import useDropDowns from "../hooks/useDropdowns";
import React, { useState } from "react";

const DonationItemsModal = ({state, dispatch, items}: any) => {
    const {getDropDown} = useDropDowns();
    const [selectedDonationItem, setSelectedDonationItem] = useState<string>();
    const [subDonationItems, setSubDonationItems] = useState<[]>([]);
    const [selectedSubDonationItem, setSelectedSubDonationItem] = useState<string>();
    const [nameOfItem, setNameOfItem] = useState<string>();
    const [numberOfItems, setNumberOfItems] = useState();

    const onDonationItemSelected = (value:string) => {
      setSelectedDonationItem(value);
      let subDonationItems = state.select(items, value).items ?? [];
      setSubDonationItems(subDonationItems);
    }

    const onSubDonationItemSelected = (value:string) => {
      setSelectedSubDonationItem(value);
    }

    const isFormValid = () => {
        let isNumberofItemsValid = state.validate('# of Items', numberOfItems)
        let isDonationItemValid = state.validate('Donation Item Type', selectedDonationItem)

        return (isNumberofItemsValid && isDonationItemValid );
    }

    const onItemAdd = () => {
        let isValid = isFormValid();

        if(isValid){
            let updatedList = state.addedDonationItems;
            let newItem = {type: selectedDonationItem, subType: selectedSubDonationItem, name: nameOfItem, amount: numberOfItems};
            updatedList.push(newItem);

            dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
            state.showSuccess('Success', 'Item added.')

            clear();
        }
    }

    const onClose = () => {
      clear();
      dispatch({ type: HandleOnDonationItemModalClose });
    }

    const clear = () => {
      setNameOfItem(undefined);
      setNumberOfItems(undefined);
      setSelectedDonationItem(undefined);
      setSelectedSubDonationItem(undefined);
    }
    
    return (<Modal
        isOpen={state.isAddDonationItemModalOpen}
        onClose={() => onClose()}
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
            {getDropDown(items, '', onDonationItemSelected, 'Donation Item', false)}
            </Box>
            {subDonationItems.length > 0 && 
            <Box  style={{marginTop:'2%'}}>
            {getDropDown(subDonationItems, '', onSubDonationItemSelected, 'Sub-Category', false)}
            </Box>
            }
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
              onPress={() => onItemAdd()}
            >
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>);
};

export default DonationItemsModal;