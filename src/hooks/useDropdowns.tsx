import { ChevronDownIcon, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, ButtonIcon, AddIcon } from "@gluestack-ui/themed";
import { DropDownList } from "../interfaces/dropdown";
import React from "react";

const useDropDowns = () => {  
    const getDropDown = (items: Array<DropDownList> | undefined, selectedValue: string, setStateEvent: any, placeholderText: string, isInvalid: boolean) => {
      items ??= [];
      
      let selectItems = items.map(item => 
          <SelectItem
          key={item.label}
          label={item.label}
          value={item.label}
        />);
  
          return (
          <Select isInvalid={isInvalid} onValueChange={(value =>  setStateEvent(value))}>
            <SelectTrigger variant="outline" size="lg" >
              <SelectInput placeholder={placeholderText} />
              <SelectIcon>
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
