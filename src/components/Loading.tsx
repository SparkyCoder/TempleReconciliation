import { Center, HStack, Modal, ModalBackdrop, ModalBody, ModalContent, Spinner, Text } from "@gluestack-ui/themed";

const Loading = ({isLoading, title} : any) => {
    return (
        <Center>
          <Modal
            isOpen={isLoading}
            closeOnOverlayClick={false}
          >
            <ModalBackdrop />
                    <ModalBody>
                        <Center>
                        <HStack space="sm">
                            <Spinner />
                            <Text size="md">{title}</Text>
                        </HStack>
                        </Center>
                </ModalBody>
            
          </Modal>
        </Center>
      )
};

export default Loading;