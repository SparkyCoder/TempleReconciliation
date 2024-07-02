import { Box, Button, ButtonIcon, ButtonText, CloseIcon, HStack, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, TrashIcon } from "@gluestack-ui/themed";
import {  HandleOnDonationItemUpdated, HandleOnViewDonationItemsModalClosed } from "../reducers/ApplicationReducer";
import uuid from 'react-native-uuid';

const ViewDonationItemsModal = ({state, dispatch}: any) => {    
    const onDelete = (type: string, name:string, amount: string) => {
       let updatedList = state.addedDonationItems.filter(item => item.type !== type && item.name !== name && item.amount !== amount);
      dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
    }

    const listItems = () => {
        return state.addedDonationItems.map((item) => {
            return (<Box key={uuid.v4()} style={{margin:'2%'}}>
                <HStack>
                <Text style={{alignSelf:'center', width:'75%'}} key={uuid.v4()}>{`${item.amount ?? ''} ${item.type ?? ''} ${item.name ?? ''}  `}</Text>
                <Button  w='$1' 
                  borderRadius="$2xl"
                  size="lg"
                  p="$3.5"
                  variant={'solid'}
                  action="primary"
                  onPress={() => {onDelete(item.type, item.name, item.amount)}}
                >
                  <ButtonIcon size='xl' as={TrashIcon} />
                </Button>
                </HStack>
                </Box>);
        });
    }
    return (<Modal
        isOpen={state.isViewDonationItemsOpen}
        onClose={() => {dispatch({ type: HandleOnViewDonationItemsModalClosed })}}
        >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Current Donation Item(s)</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Box  style={{marginTop:'2%'}}>
                {listItems()}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {dispatch({ type: HandleOnViewDonationItemsModalClosed })}}
            >
              <ButtonText>Done</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>);
};

export default ViewDonationItemsModal;