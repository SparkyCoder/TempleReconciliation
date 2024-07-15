import { Box, Button, Center, ButtonText, HStack, Heading, Input, InputField, ScrollView, ButtonIcon, AddIcon, EditIcon, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel } from "@gluestack-ui/themed";
import useDimensions from "../hooks/useDimensions";
import Loading from "./Loading";
import { styles } from "../styles/styles";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import DonationItemsModal from "./AddDonationItemsModal";
import useDropDowns from "../hooks/useDropdowns";
import ViewDonationItemsModal from "./ViewDonationItemsModal";
import PaymentsModal from "./PaymentModal";
import React from "react";
import { Donation } from "../interfaces/donation";
import DisclaimerModal from "./DisclaimerModal";
import Disclaimers from "../constants/Disclaimers";
import { DefaultProps } from "../interfaces/state";
import { ReducerTypes } from "../reducers/ApplicationReducer";

const DonationArea = ({state, dispatch} : DefaultProps) => {
    const {isVertical} = useDimensions();
    const {getDropDown} = useDropDowns();
    const {getPayments, getDonationTypes, getFrontDeskPins, getUsers} = useAxios(state, dispatch);

    const defaultForm: Donation = {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      chineseName: '',
      donationType: '',
      email: '',
      firstName: '',
      lastName: '',
      payment: '',
      phone: '',
      dataDisclaimer: false,
      frontDeskAttendee: "",
      id: "",
      hasPaid: false,
      referenceNumber: "",
      fileName: "",
      items: []
    };
    const [form, setForm] = useState<Donation>(defaultForm);

    useEffect(()=> {
      getDonationTypes();
      getUsers();
      getPayments();
      getFrontDeskPins();
      dispatch({ type: ReducerTypes.HandleOnDonationAreaLoad })
    }, [])

    const onSubmit = () => {
      let isDonationTypeValid = state.validate('Donation Type', form.donationType);
      let isEnglishNameValid = state.validate('First Name', form.firstName) && state.validate('Last Name', form.lastName); 
      let isDiscaimerChecked = state.validate('Data Disclaimer', form.dataDisclaimer.toString())
      let isDonationItemValid = state.addedDonationItems.length > 0;
      if(!isDonationItemValid)
        state.showError('Error', 'At least one Donation Item is requred. 至少需要一件捐赠物品')

      let isPaymentValid = state.validate('Payment Option', form.payment)
      
      if(isDonationTypeValid && isEnglishNameValid && isDonationItemValid && isPaymentValid && isDiscaimerChecked){
        dispatch({ type: ReducerTypes.HandleDonationSubmitted, payload: form })
      }
    }

    const onPhoneTextChange = (value: string) => {
      if(value && (!form.firstName || !form.lastName)){
        let foundUser = state.selectPhone(state.users, value);
        if(foundUser?.firstName){
          setForm({...form, phone: foundUser.phone, email:foundUser.email, firstName: foundUser.firstName, lastName: foundUser.lastName, street: foundUser.street, city: foundUser.city, state: foundUser.state, zipCode: foundUser.zipCode});
          return;
        }
      }
      setForm({...form, phone: value})
    }

    return (
        <Box>
                    <Loading isLoading={state.isPostDonationLoading || state.isGetFrontDeskPinLoadings || state.isGetPaymentsLoading || state.isGetDonationTypesLoading} title={'Loading...'} />
                    <DonationItemsModal state={state} dispatch={dispatch} donationType={form.donationType ?? ''} />
                    <ViewDonationItemsModal state={state} dispatch={dispatch} />
                    <PaymentsModal state={state} dispatch={dispatch} />
                    <DisclaimerModal state={state} dispatch={dispatch} text={'Test'} />
                    <ScrollView>             
                        <Box style={styles.form}>
                        <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Donation Type 捐赠类型</Heading>
                                { getDropDown(state.donationTypes, form.donationType, (value:string) => setForm({...form, donationType:value}), 'Select Donation Type 捐赠类型', false) }
                            </Box>
                        <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Phone 電話</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField keyboardType="phone-pad" placeholder="Phone 電話" value={form.phone}
                                    onChangeText={(value: string) => onPhoneTextChange(value)} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in Chinese 捐款人中文名字</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField value={form.chineseName} placeholder="Name in Chinese 捐款人中文名字"
                                    onChangeText={(value:string) => setForm({...form, chineseName:value})} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in English 捐款人英文姓名</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="First Name" value={form.firstName}
                                    onChangeText={(value:string) => setForm({...form, firstName:value})} /> 
                                </Input>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Last Name" value={form.lastName}
                                    onChangeText={(value:string) => setForm({...form, lastName:value})} /> 
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Email 電子郵件</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField keyboardType="email-address" placeholder="Email 電子郵件" value={form.email}
                                    onChangeText={(value:string) => setForm({...form, email:value})} />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Address 地址</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    style={{marginTop:'2%'}}
                                    >
                                    <InputField placeholder="Street" value={form.street}
                                    onChangeText={(value:string) => setForm({...form, street:value})} />
                                </Input>
                                <Input
                                    variant="outline"
                                    size="md"
                                    style={{marginTop:'2%'}}
                                    >
                                    <InputField placeholder="City"  value={form.city}
                                    onChangeText={(value:string) => setForm({...form, city:value})} />
                                </Input>
                                <Input
                                    variant="outline"
                                    size="md"
                                    style={{marginTop:'2%'}}
                                    >
                                    <InputField placeholder="State"  value={form.state}
                                    onChangeText={(value:string) => setForm({...form, state:value})} />
                                </Input>
                                <Input
                                    variant="outline"
                                    size="md"
                                    style={{marginTop:'2%'}}
                                    >
                                    <InputField keyboardType="number-pad" placeholder="Zip Code"  value={form.zipCode}
                                    onChangeText={(value:string) => setForm({...form, zipCode:value})} />
                                </Input>
                            </Box>
                            {form.donationType !== '' && <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <HStack space="lg" >
                                <Heading size="sm" style={{alignSelf:"center"}}>Add Donation Item 添加一项捐赠物品</Heading>
                                </HStack>
                                <HStack space="lg" style={{marginTop:'2%'}}>
                                <Button
                                      w='$1' 
                                      borderRadius="$2xl"
                                      size="lg"
                                      p="$3.5"
                                      variant='solid'
                                      action="secondary"
                                      onTouchEnd={() => dispatch({ type: ReducerTypes.HandleOnDonationItemModalOpen })}
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
                                      onTouchEnd={() => dispatch({ type: ReducerTypes.HandleOnViewDonationItemsModalOpen })}
                                      >
                                     <ButtonIcon as={EditIcon} />
                                  </Button>
                                  <Heading style={{alignSelf:"center"}} size="sm">({state.addedDonationItems.length}) Item(s) 项目</Heading>
                                </HStack>
                            </Box>}
                            <Box style={[isVertical ? styles.formSectionVertical : styles.formSectionHorizontal, {marginTop:'6%'}]}>
                              <HStack>
                              <Checkbox aria-label="Data Disclaimer" size="md" onTouchEnd={() => setForm({ ...form, dataDisclaimer: !form.dataDisclaimer })} value={form.dataDisclaimer.toString()}>
                                <CheckboxIndicator mr="$2">
                                  <CheckboxIcon as={CheckIcon}/>
                                </CheckboxIndicator> 
                                <CheckboxLabel>I agree to the </CheckboxLabel>                             
                              </Checkbox>
                                  <Button 
                                      size="md"
                                      variant="link"
                                      action="primary"
                                      onTouchEnd={() =>  dispatch({ type: ReducerTypes.HandleDisclaimerModalOpened, payload: {title: Disclaimers.DataTitle, text: Disclaimers.DataMessage} })}
                                      >
                                      <ButtonText>Data Disclaimer</ButtonText>
                                  </Button>
                              </HStack>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Payment Option 付款方式</Heading>
                                { getDropDown(state.payments, form.payment, (value:string) => setForm({...form, payment:value}), 'Select Payment Type', false) }
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
                                      onTouchEnd={() => dispatch({ type: ReducerTypes.HandleCancelButtonOnClick })}
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