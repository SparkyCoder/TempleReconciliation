import { Box, Button, Center, ButtonText, ChevronDownIcon, HStack, Heading, Icon, Input, InputField, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from "@gluestack-ui/themed";
import useDimensions from "../hooks/useDimensions";
import Loading from "./Loading";
import { HandleDonationCancelButtonOnClick } from "../reducers/AuditReportReducer";
import { styles } from "../styles/styles";
import { useEffect } from "react";

const DonationArea = ({state, dispatch} : any) => {
    const {isVertical} = useDimensions();

    useEffect(()=> {
      //Get Events
      //Get Payment Options
      //Dispatch Loading
    }, [])

    const getDropDown = (items: any) => {
      let selectItems = items.map(item => 
        <SelectItem
        key={item.value}
        label={item.label}
        value={item.value}
      />);

        return (
        <Select>
          <SelectTrigger variant="outline" size="md" >
            <SelectInput placeholder="Select option" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop/>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {selectItems}
            </SelectContent>
          </SelectPortal>
        </Select>
        );
    }

    return (
        <Box>
                    <Loading state={state} title={'Loading...'} />
                    <ScrollView>             
                        <Box style={styles.form}>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in Chinese 捐款人中文名字</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Name in Chinese 捐款人中文名字" />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Name in English 捐款人英文姓名</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Name in English 捐款人英文姓名" />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Phone 電話</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Phone 電話" />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Email 電子郵件</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Email 電子郵件" />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Address 地址</Heading>
                                <Input
                                    variant="outline"
                                    size="md"
                                    >
                                    <InputField placeholder="Address 地址" />
                                </Input>
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Dharma Service 法會名稱</Heading>
                                { getDropDown([{label: 'test', value: 'test'}]) }
                            </Box>
                            <Box style={isVertical ? styles.formSectionVertical : styles.formSectionHorizontal}>
                                <Heading size="sm">Payment Option</Heading>
                                { getDropDown([{label: 'test', value: 'test'}]) }
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