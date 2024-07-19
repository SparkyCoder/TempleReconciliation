import AsyncStorage from '@react-native-async-storage/async-storage';
import useMessage from './useToast';
import Storage from '../constants/Storage';

const useStorage = () => {  
    const {showError} = useMessage();

    const saveData: (key:string, value: any) => void = async (key, value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
           showError('Save Error', `Could not save ${key} to local storage. ${e}`)
        }
      };

      const getData:<T>(key:string) => Promise<T> | null = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            showError('Retrieval Error', `Could not retrieve ${key} to local storage. ${e}`)
        }
      };

      const clearAllData = async () => {
        clearUsers();
        await AsyncStorage.removeItem(Storage.Payments);
        await AsyncStorage.removeItem(Storage.DonationTypes);
        await AsyncStorage.removeItem(Storage.Pins);
      };

      const clearUsers = async () => {
        await AsyncStorage.removeItem(Storage.Users);
      }

    return {saveData, getData, clearAllData, clearUsers};
};

export default useStorage;
