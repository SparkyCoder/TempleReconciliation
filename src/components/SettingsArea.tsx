import { Box, Button, ButtonText, Center, HStack, Input, InputField } from "@gluestack-ui/themed";
import React, {  useState } from "react";
import { DefaultProps } from "../interfaces/state";
import { ReducerTypes } from "../reducers/ApplicationReducer";
import { styles } from "../styles/styles";
import useApiCredentials from "../hooks/useApiCredentials";
import Divider from "./Divider";
import Storage from "../constants/Storage";
import useDropDowns from "../hooks/useDropdowns";
import { DropDownList } from "../interfaces/dropdown";

const SettingsArea = ({state, dispatch} : DefaultProps) => {
    const {saveApiCredentials} = useApiCredentials();
    const {getDropDown} = useDropDowns();
    const [accessKey, setAccessKey] = useState<string>('');
    const [secretKey, setSecretKey] = useState<string>('');
    const [newReceiptNumber, setNewReceiptNumber] = useState<string>('');
    const [environments] = useState<DropDownList[]>([{label: 'develop'}, {label:'production'}])
    const [selectedEnvironment, setSelectedEnvironment] = useState<string>(state.environment)
console.log(state.environment)
    const onSave = async () => {
        if(accessKey && secretKey){
            saveApiCredentials(accessKey, secretKey);
            state.showSuccess('Success', 'Access Key and Secret Key Saved.');
        }

        if(newReceiptNumber){
            await onSetReceiptNumber();
            state.showSuccess('Success', `Next receipt number is ${Number(newReceiptNumber)}.`);
        }

        if(selectedEnvironment){
            state.saveData(Storage.Environment, selectedEnvironment);
            state.clearAllData();
            state.showSuccess('Success', `Environment now set to ${selectedEnvironment}.`);
        }

        dispatch({ type: ReducerTypes.HandleCancelButtonOnClick });
    }

    const onClearCache = () => {
        state.clearAllData()
        state.showSuccess('Success', 'Local cache has been cleared.')
    }

    const onSetReceiptNumber = async () => {
        state.saveData(Storage.ReceiptNumber, Number(newReceiptNumber));
    }

    return (
        <Box>
            <Divider text={'Cache'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
                <Center>
                    <Button 
                        size="md"
                        variant="solid"
                        action="primary"
                        onTouchEnd={() => onClearCache()}
                        style={{marginVertical:'2%'}}
                        >
                        <ButtonText>Clear Cache</ButtonText>
                    </Button>
                </Center>
            </Box>
            <Divider text={'Environment'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
            { getDropDown(environments, selectedEnvironment, (value:string) => setSelectedEnvironment(value), 'Select Environment', false) }
            </Box>
            <Divider text={'Next Receipt Number'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
            <Input
                variant="outline"
                size="md"
                style={{marginTop: '3%'}}
                >
                <InputField keyboardType="number-pad" placeholder="Receipt Number" value={newReceiptNumber}
                onChangeText={(value:string) => setNewReceiptNumber(value)} /> 
            </Input>
            </Box>
            <Divider text={'Api Credentials'} />
            <Box style={{marginTop:'2%', borderColor:'black', borderWidth:0.5, marginHorizontal: '5%'}}>
            <Input
                variant="outline"
                size="md"
                style={{marginTop: '3%'}}
                >
                <InputField placeholder="Access Key" value={accessKey}
                onChangeText={(value:string) => setAccessKey(value)} /> 
            </Input>
            <Input
                variant="outline"
                size="md"
                style={{marginTop: '3%'}}
                >
                <InputField placeholder="Secret Key" value={secretKey}
                onChangeText={(value:string) => setSecretKey(value)} /> 
            </Input>
            </Box>
            <Box style={{marginTop:'2%', marginBottom:'2%', width: '100%'}}>
            <HStack style={{marginTop:'2%', width: '100%'}}>
                            <Box style={styles.formSectionHorizontal}>
                              <Center>
                                <Button 
                                      size="md"
                                      variant="solid"
                                      action="primary"
                                      onTouchEnd={() => onSave()}
                                      >
                                      <ButtonText>Update</ButtonText>
                                  </Button>
                                </Center>
                            </Box>
                            <Box style={styles.formSectionHorizontal}>
                              <Center>
                                <Button
                                      size="md"
                                      variant="solid"
                                      action="primary"
                                      onTouchEnd={() => dispatch({ type: ReducerTypes.HandleCancelButtonOnClick })}
                                      >
                                      <ButtonText>Cancel</ButtonText>
                                  </Button>
                                </Center>
                            </Box>
                          </HStack>
            </Box>
        </Box>
    );
};

export default SettingsArea;