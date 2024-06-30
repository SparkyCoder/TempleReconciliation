import AsyncStorage from '@react-native-async-storage/async-storage';
import useMessage from './useToast';

const useStorage = () => {  
    const {showError} = useMessage();
    const saveData = async (key:string, value: any) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
           showError('Save Error', `Could not save ${key} to local storage.`)
        }
      };

      const getData = async (key:string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            showError('Retrieval Error', `Could not retrieve ${key} to local storage.`)
        }
      };

    return {saveData, getData};
};

export default useStorage;
