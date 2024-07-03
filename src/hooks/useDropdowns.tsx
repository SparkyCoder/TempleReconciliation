import { ChevronDownIcon, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import { DropDownList } from "../interfaces/dropdown";
import React from "react";

const useDropDowns = () => {  
    const getDropDown = (items: DropDownList | undefined, selectedValue: any, setStateEvent: any, placeholderText: string, isInvalid: boolean) => {
      items ??= [];
      
      let selectItems = items.map(item => 
          <SelectItem
          key={item.label}
          label={item.label}
          value={item.label}
        />);
  
          return (
          <Select isInvalid={isInvalid} value={selectedValue} onValueChange={(value =>  setStateEvent(value))}>
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
