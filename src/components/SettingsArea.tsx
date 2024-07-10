import { Box, Button, ButtonText, Center, HStack, Input, InputField, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { DefaultProps } from "../interfaces/state";
import { HandleCancelButtonOnClick } from "../reducers/ApplicationReducer";
import { styles } from "../styles/styles";
import useApiCredentials from "../hooks/useApiCredentials";
import Divider from "./Divider";

const SettingsArea = ({state, dispatch} : DefaultProps) => {
    const {saveApiCredentials} = useApiCredentials();
    const [accessKey, setAccessKey] = useState<string>('');
    const [secretKey, setSecretKey] = useState<string>('');

    const onSave = async () => {
        saveApiCredentials(accessKey, secretKey);
        state.showSuccess('Success', 'Secret Key Saved.');
        dispatch({ type: HandleCancelButtonOnClick });
    }

    const onClearCache = () => {
        state.clearAllData()
        state.showSuccess('Success', 'Local cache has been cleared.')
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
                                      onTouchEnd={() => dispatch({ type: HandleCancelButtonOnClick })}
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