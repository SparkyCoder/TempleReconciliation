import useMessage from "./useToast";

const useValidation = () => {
    const {showError, showSuccess} = useMessage();
    
const validate = (name, value) => {
    if(!value || value === '' || value === 0){
        showError('Error', `${name} is required.`)
        return false;
    }

    return true;
}
    
    return {validate}
};

export default useValidation;