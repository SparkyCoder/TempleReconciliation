import { Box, Button, ButtonIcon, ButtonText, CloseIcon, HStack, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text, TrashIcon } from "@gluestack-ui/themed";
import {  HandleOnDonationItemUpdated, HandleOnViewDonationItemsModalClosed } from "../reducers/ApplicationReducer";

const ViewDonationItemsModal = ({state, dispatch}: any) => {    
    const onDelete = (name: string, amount: number) => {
        let updatedList = state.addedDonationItems.filter(item => item.name !== name && item.amount !== amount);
        dispatch({ type: HandleOnDonationItemUpdated, payload: updatedList })
    }

    const listItems = () => {
        return state.addedDonationItems.map((item) => {
            return (<Box key={item.name} style={{margin:'2%'}}>
                <HStack>
                <Text style={{alignSelf:'center', width:'75%'}} key={item.name}>{`${item.amount} ${item.name}  `}</Text>
                <Button  w='$1' 
                  borderRadius="$2xl"
                  size="lg"
                  p="$3.5"
                  variant={'solid'}
                  action="primary"
                  onPress={() => {onDelete(item.name, item.amount)}}
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