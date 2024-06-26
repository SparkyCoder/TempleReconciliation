import { Box, Button, ButtonText, CloseIcon, EditIcon, HStack, Heading, Icon, Input, InputField, InputIcon, InputSlot, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, PhoneIcon } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import { HandleOnDonationItemModalClose } from "../reducers/ApplicationReducer";
import useDropDowns from "../hooks/useDropdowns";

const DonationItemsModal = ({state, dispatch}: any) => {
    const {getDropDown} = useDropDowns();

    const setDropDownState = (value) => {
        console.log(value)
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
            {getDropDown([], '', setDropDownState, 'Donation Item Type')}
            </Box>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField placeholder="Name of Item" value='' onChangeText={(value) => console.log(value)} />
          </Input>
          <Input
            variant="outline"
            size="xl"
            style={{marginTop:'2%'}}
          >
            <InputSlot />
            <InputField keyboardType="number-pad" placeholder="# of Items" value='' onChangeText={(value) => console.log(value)} />
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
              onPress={() => {
                
              }}
            >
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>);
};

export default DonationItemsModal;