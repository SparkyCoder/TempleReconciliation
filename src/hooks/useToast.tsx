import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

const useMessage = () => {
    const toast = useToast();

    const showError = (title: string, message: string) => {
        toast.show({placement: "top", render: ({ id }) => {return createToast(id, 'error', 'solid', title, message)}})
    }

    const showSuccess = (title: string, message: string) => {
      toast.show({placement: "top", render: ({ id }) => {return createToast(id, 'success', 'solid', title, message)}})
  }

    const createToast = (id: number, action: 'error' | 'success', variant: 'solid' | 'outline', title: string, message: string) => {
        return (<Toast nativeID={'toast-'+ id} action={action} variant={variant}>
        <VStack space="xs">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>
            {message}
          </ToastDescription>
        </VStack>
      </Toast>);
    }

    return {showError, showSuccess}
};

export default useMessage;