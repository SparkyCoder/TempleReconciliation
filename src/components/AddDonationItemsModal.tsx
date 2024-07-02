import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@gluestack-ui/themed";
import { HandleOnDonationItemUpdated, HandleOnDonationItemModalClose } from "../reducers/ApplicationReducer";
import React, { useEffect, useState } from "react";
import useDropDowns from "../hooks/useDropdowns";
import useForms from "../hooks/useForms";

const DonationItemsModal = ({state, dispatch, donationType}: any) => {
  const {getDropDown} = useDropDowns();
  const {renderForm} = useForms();
  const [items, setItems] = useState<[]>([]);
  const [type, setType] = useState<string>('')
  const [details, setDetails] = useState<object>({});

  useEffect(() => {
    let selectedDonation = state.select(state.donationTypes, donationType);
    setItems(selectedDonation.items ?? []);
  }, [donationType])

  const onItemAdd = () => {
          let updatedList = state.addedDonationItems;
          updatedList.push(details);

          dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
          state.showSuccess('Success', 'Item added.')
          clear();
    }

    const onClose = () => {
      clear();
      dispatch({ type: HandleOnDonationItemModalClose });
    }

    const clear = () => {
      setDetails({});
      setType('');
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
              {getDropDown(items, '', setType, 'Donation Item', false)}
            </Box>
            {renderForm({state, type, details, setDetails, items})}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => onClose()}
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