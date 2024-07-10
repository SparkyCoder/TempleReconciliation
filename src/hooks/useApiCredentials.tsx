import CryptoJS from "crypto-js";
import Storage from "../constants/Storage";
import useStorage from "./useStorage";
import useMessage from "./useToast";

const useApiCredentials = () => {
    const cipherKey = '#################'
    const {saveData, getData} = useStorage();
    const {showError} = useMessage();

    const getApiCredentials : () => Promise<{accessKey:string,secretKey:string}> = async () => {
        const encryptedAccessKey = await getData<string>(Storage.AccessKey) ?? '';
        const encryptedSecretKey = await getData<string>(Storage.SecretKey) ?? '';

        if(encryptedAccessKey && encryptedSecretKey){
            const accessKey = CryptoJS.AES.decrypt(encryptedAccessKey, cipherKey).toString(CryptoJS.enc.Utf8);
            const secretKey = CryptoJS.AES.decrypt(encryptedSecretKey, cipherKey).toString(CryptoJS.enc.Utf8);
         
            return {accessKey, secretKey};
        }

        showError("Error", "Could not retrieve API Keys.")
        return {accessKey: '', secretKey: ''}
    }

    const saveApiCredentials : (accessKey:string,secretKey:string) => void = async (accessKey, secretKey) => {
        const encryptedAccessKey = CryptoJS.AES.encrypt(accessKey, cipherKey).toString();
        const encryptedSecretKey = CryptoJS.AES.encrypt(secretKey, cipherKey).toString();

        saveData(Storage.AccessKey, encryptedAccessKey);
        saveData(Storage.SecretKey, encryptedSecretKey);
    }

    return {getApiCredentials, saveApiCredentials}
}

export default useApiCredentials;