import { Box, Button, Center, ButtonText, ChevronDownIcon, HStack, Heading, Icon, Input, InputField, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import useDimensions from "../hooks/useDimensions";
import Loading from "./Loading";
import { HandleDonationCancelButtonOnClick, HandleOnDonationAreaLoad, HandleOnDonationItemModalOpen } from "../reducers/ApplicationReducer";
import { styles } from "../styles/styles";
import { useEffect, useState } from "react";
import useDonations from "../hooks/useDonations";
import DonationItemsModal from "./DonationItemsModal";
import useDropDowns from "../hooks/useDropdowns";

const DonationArea = ({state, dispatch} : any) => {
    const {isVertical} = useDimensions();
    const {getDropDown} = useDropDowns();
    const {getEvents, getPayments, getDonations} = useDonations(dispatch);
    const [chineseName, setChineseName] = useState<string>();
    const [englishName, setEnglishName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [dharmaService, setDharmaService] = useState<string>();
    const [paymentOption, setPaymentOption] = useState<string>();


    useEffect(()=> {
      getEvents();
      getPayments();
      getDonations();
      dispatch({ type: HandleOnDonationAreaLoad })
    }, [])

    

    return (
        <Box>
                    <Loading isLoading={state.isGetPaymentsLoading || state.isGetEventsLoading || state.isGetDonationItemsLoading} title={'Loading...'} />
                    <DonationItemsModal state={state} dispatch={dispatch} />
                    <ScrollView>             
                        <Box style={styles.form}>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in Chinese 捐款人中文名字</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Name in Chinese 捐款人中文名字"
                                    onChangeText={(value) => setChineseName(value)} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in English 捐款人英文姓名</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Name in English 捐款人英文姓名"
                                    onChangeText={(value) => setEnglishName(value)} /> 
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Phone 電話</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Phone 電話"
                                    onChangeText={(value) => setPhone(value)} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Email 電子郵件</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Email 電子郵件"
                                    onChangeText={(value) => setEmail(value)} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Address 地址</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Address 地址"
                                    onChangeText={(value) => setAddress(value)} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Dharma Service 法會名稱</Heading>
                                { getDropDown(state.events, dharmaService, setDharmaService, 'Select Dharma Service') }
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Payment Option</Heading>
                                { getDropDown(state.payments, paymentOption, setPaymentOption, 'Select Payment Type') }
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Add Donation Item(s)</Heading>
                                <Button
                                      size="md"
                                      variant="outline"
                                      action="primary"
                                      onTouchEnd={() => dispatch({ type: HandleOnDonationItemModalOpen })}
                                      >
                                     <ButtonText>Add Donation </ButtonText>
                                     <ButtonIcon as={AddIcon} />
                                  </Button>
                            </Box>
                        </Box>
                        <Box style={{marginTop:'2%', marginBottom:'2%', width: '100%'}}>
                          <HStack style={{marginTop:'2%', width: '100%'}}>
                            <Box style={styles.formSectionHorizontal}>
                              <Center>
                                <Button 
                                      size="md"
                                      variant="solid"
                                      action="primary"
                                      onTouchEnd={() => console.log('submit')}
                                      >
                                      <ButtonText>Submit</ButtonText>
                                  </Button>
                                </Center>
                            </Box>
                            <Box style={styles.formSectionHorizontal}>
                              <Center>
                                <Button
                                      size="md"
                                      variant="solid"
                                      action="primary"
                                      onTouchEnd={() => dispatch({ type: HandleDonationCancelButtonOnClick })}
                                      >
                                      <ButtonText>Cancel</ButtonText>
                                  </Button>
                                </Center>
                            </Box>
                          </HStack>
                        </Box>
                    </ScrollView>
               </Box>
    );
};

export default DonationArea;