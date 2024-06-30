import { Box, Center, Modal, ModalBackdrop, ModalBody, ModalContent, Spinner, Text } from "@gluestack-ui/themed";

const Loading = ({isLoading, title} : any) => {
    return (
        <Center>
          <Modal
            isOpen={isLoading}
            closeOnOverlayClick={false}
          >
            <ModalBackdrop />
                    <ModalBody>
                      <ModalContent style={{margin:'10%'}}>
                        <Center>
                        <Spinner />
                        <Text size="md">{title}</Text>
                        </Center>
                      </ModalContent>
                </ModalBody>
          </Modal>
        </Center>
      )
};

export default Loading;