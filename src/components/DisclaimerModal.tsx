import { Button, ButtonText, Center, CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from "@gluestack-ui/themed";
import {  HandleDisclaimerModalClosed } from "../reducers/ApplicationReducer";
import React from "react";

const DisclaimerModal = ({state, dispatch}: any) => {
    const onClose = () => {
      dispatch({ type: HandleDisclaimerModalClosed });
    }
    
    return (<Modal
        isOpen={state.isDisclaimerModalOpen}
        onClose={() => onClose()}
        >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">{state.disclaimerTitle}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Center>
            <Text>{state.disclaimerText}</Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => onClose()}
            >
              <ButtonText>Done</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>);
};

export default DisclaimerModal;