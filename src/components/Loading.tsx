import { Center, HStack, Modal, ModalBackdrop, ModalBody, ModalContent, Spinner, Text } from "@gluestack-ui/themed";
import { HandleLoadingComplete } from "../reducers/ContentReducer";

const Loading = ({state, dispatch} : any) => {
    return (
        <Center>
          <Modal
            isOpen={state.isLoading}
            closeOnOverlayClick={false}
            onClose={() => {
                dispatch({ type: HandleLoadingComplete });
            }}
          >
            <ModalBackdrop />
                    <ModalBody>
                        <Center>
                        <HStack space="sm">
                            <Spinner />
                            <Text size="md">Loading...</Text>
                        </HStack>
                        </Center>
                </ModalBody>
            
          </Modal>
        </Center>
      )
};

export default Loading;