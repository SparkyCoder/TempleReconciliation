import { Box, Button, ButtonText, Center, HStack, Input, InputField, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { DefaultProps } from "../interfaces/state";
import { HandleCancelButtonOnClick } from "../reducers/ApplicationReducer";
import { styles } from "../styles/styles";
import Storage from "../constants/Storage";

const SettingsArea = ({state, dispatch} : DefaultProps) => {
    const [accessKey, setAccessKey] = useState<string>();
    const [secretKey, setSecretKey] = useState<string>();

    const onSave = async () => {
        if(accessKey){
            await state.saveData(Storage.AccessKey, accessKey);
            state.showSuccess('Success', 'Access Key Saved.');
        }

        if(secretKey){
            await state.saveData(Storage.SecretKey, secretKey);
            state.showSuccess('Success', 'Secret Key Saved.');
        }
        
        dispatch({ type: HandleCancelButtonOnClick });
    }

    return (
        <Box>
            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%', marginTop:'2%'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: 140, textAlign: 'center'}}>API Credentials</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>
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