import { Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@gluestack-ui/themed";
import { HandleOnDonationItemUpdated, HandleOnDonationItemModalClose } from "../reducers/ApplicationReducer";
import React, { useState } from "react";
import DefaultForm from "./forms/default";

const DonationItemsModal = ({state, dispatch, type}: any) => {
  const [details, setDetails] = useState<object>({});

    const onItemAdd = () => {
            let updatedList = state.addedDonationItems;
            updatedList.push(details);

            dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
            state.showSuccess('Success', 'Item added.')
    }

    const onClose = () => {
      dispatch({ type: HandleOnDonationItemModalClose });
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
            {(type === "Gift Shop") && <DefaultForm state={state} type={type} details={details} setDetails={setDetails} />}
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