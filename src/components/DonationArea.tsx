import { Box, Button, Center, ButtonText, ChevronDownIcon, HStack, Heading, Icon, Input, InputField, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, ButtonIcon, AddIcon, EditIcon } from "@gluestack-ui/themed";
import useDimensions from "../hooks/useDimensions";
import Loading from "./Loading";
import { HandleDonationCancelButtonOnClick, HandleDonationSubmitted, HandleOnDonationAreaLoad, HandleOnDonationItemModalOpen, HandleOnPaymentModalOpen, HandleOnViewDonationItemsModalOpen } from "../reducers/ApplicationReducer";
import { styles } from "../styles/styles";
import { useEffect, useState } from "react";
import useDonations from "../hooks/useDonations";
import DonationItemsModal from "./AddDonationItemsModal";
import useDropDowns from "../hooks/useDropdowns";
import ViewDonationItemsModal from "./ViewDonationItemsModal";
import PaymentsModal from "./PaymentModal";
import React from "react";

const DonationArea = ({state, dispatch} : any) => {
    const {isVertical} = useDimensions();
    const {getDropDown} = useDropDowns();
    const {getPayments, getDonationTypes, getFrontDeskPins, getUsers} = useDonations(state, dispatch);
    const [chineseName, setChineseName] = useState<string>();
    const [englishName, setEnglishName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [donationType, setDonationType] = useState<string>();
    const [donationItems, setDonationItems] = useState<[]>([]);
    const [paymentOption, setPaymentOption] = useState<string>();


    useEffect(()=> {
      getDonationTypes();
      getUsers();
      getPayments();
      getFrontDeskPins();
      dispatch({ type: HandleOnDonationAreaLoad })
    }, [])

    const onSubmit = () => {
      let isEnglishNameValid = state.validate('English Name', englishName); 
      let isPaymentValid = state.validate('Payment Option', paymentOption)
      let isDonationItemValid = state.addedDonationItems.length > 0;

      if(!isDonationItemValid)
        state.showError('Error', 'At least one Donation Item is requred. 至少需要一件捐赠物品')
      
      if(isEnglishNameValid && isDonationItemValid && isPaymentValid){
        dispatch({ type: HandleDonationSubmitted, payload: {
          donationType,
          chineseName,
          englishName,
          phone,
          email,
          address,
          payment: paymentOption,
          donations: state.addedDonationItems
        }})
      }
    }

    const onDonationTypeSelected = (value:string) => {
      setDonationType(value);

      let selectedDonation = state.select(state.donationTypes, value);
      setDonationItems(selectedDonation.items ?? []);
    }

    return (
        <Box>
                    <Loading isLoading={state.isGetFrontDeskPinLoadings || state.isGetPaymentsLoading || state.isGetDonationTypesLoading} title={'Loading...'} />
                    <DonationItemsModal state={state} dispatch={dispatch} items={donationItems} />
                    <ViewDonationItemsModal state={state} dispatch={dispatch} />
                    <PaymentsModal state={state} dispatch={dispatch} />
                    <ScrollView>             
                        <Box style={styles.form}>
                        <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Donation Type 捐赠类型</Heading>
                                { getDropDown(state.donationTypes, donationType, onDonationTypeSelected, 'Select Donation Type 捐赠类型') }
                            </Box>
                        <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Phone 電話</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField keyboardType="phone-pad" placeholder="Phone 電話"
                                    onChangeText={(value) => setPhone(value)} />
                                </Input>
                            </Box>
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
                                <Heading size="sm">Email 電子郵件</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField keyboardType="email-address" placeholder="Email 電子郵件"
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
                            {donationItems.length > 0 && <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <HStack space="lg" >
                                <Heading size="sm" style={{alignSelf:"center"}}>Add Donation Item 添加一项捐赠物品</Heading>
                                </HStack>
                                <HStack space="lg">
                                <Button
                                      w='$1' 
                                      borderRadius="$2xl"
                                      size="lg"
                                      p="$3.5"
                                      variant='solid'
                                      action="secondary"
                                      onTouchEnd={() => dispatch({ type: HandleOnDonationItemModalOpen })}
                                      >
                                     <ButtonIcon as={AddIcon} />
                                  </Button>
                                  <Button
                                       w='$1' 
                                       borderRadius="$2xl"
                                       size="lg"
                                       p="$3.5"
                                       variant='solid'
                                       action="secondary"
                                      onTouchEnd={() => dispatch({ type: HandleOnViewDonationItemsModalOpen })}
                                      >
                                     <ButtonIcon as={EditIcon} />
                                  </Button>
                                  <Heading style={{alignSelf:"center"}} size="sm">({state.addedDonationItems.length}) Item(s) 项目</Heading>
                                </HStack>
                            </Box>}
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Payment Option 付款方式</Heading>
                                { getDropDown(state.payments, paymentOption, setPaymentOption, 'Select Payment Type') }
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
                                      onTouchEnd={() => onSubmit()}
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