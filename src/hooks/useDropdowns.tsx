import { Box, Button, Center, ButtonText, ChevronDownIcon, HStack, Heading, Icon, Input, InputField, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, ButtonIcon, AddIcon } from "@gluestack-ui/themed";

const useDropDowns = () => {  
    
    const getDropDown = (items: any, selectedValue: any, setStateEvent: any, placeholderText: string) => {
        let selectItems = items.map(item => 
          <SelectItem
          key={item.id}
          label={item.data.label}
          value={item.id}
        />);
  
          return (
          <Select value={selectedValue} onValueChange={(value =>  setStateEvent(value))}>
            <SelectTrigger variant="outline" size="md" >
              <SelectInput placeholder={placeholderText} />
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

    return {getDropDown};
};

export default useDropDowns;
