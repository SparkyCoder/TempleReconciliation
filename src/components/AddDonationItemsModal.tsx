import { Box, Button, ButtonText, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@gluestack-ui/themed";
import { ReducerTypes } from "../reducers/ApplicationReducer";
import React, { useEffect, useState } from "react";
import useDropDowns from "../hooks/useDropdowns";
import useForms from "../hooks/useForms";
import { DropDownList } from "../interfaces/dropdown";
import { Form } from "../interfaces/forms";

const DonationItemsModal = ({state, dispatch, donationType}: any) => {
  const {getDropDown} = useDropDowns();
  const {renderForm} = useForms();
  const [items, setItems] = useState<Array<DropDownList> | undefined>();
  const [type, setType] = useState<string>('');
  const [details, setDetails] = useState<Form>({type:'',amount:''});

  useEffect(() => {
    let selectedDonation = state.select(state.donationTypes, donationType);
    setItems(selectedDonation.items);
  }, [donationType])

  const onItemAdd = () => {
          let updatedList = state.addedDonationItems;
          updatedList.push(details);

          dispatch({ type: ReducerTypes.HandleOnDonationItemUpdated, payload: updatedList })
          state.showSuccess('Success', 'Item added.')
          clear();
    }

    const onClose = () => {
      clear();
      dispatch({ type: ReducerTypes.HandleOnDonationItemModalClose });
    }

    const setTypes = (value: string) => {
      setType(value);
      setDetails({...details, type: value})
    }

    const clear = () => {
      setDetails({type:'',amount:''});
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
              {getDropDown(items, '', setTypes, 'Donation Item', false)}
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