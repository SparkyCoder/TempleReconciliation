import * as dropdown from "../interfaces/dropdown";

const useSelect = () => {
    const select = (list: Array<dropdown.DropDownList> | undefined, label: string): dropdown.DropDownList | [] => {
        list ??= [];
        label ??= '';
        let foundListItem = list.filter((item: any) => item.label === label);
        return foundListItem.length > 0 ? foundListItem[0] : []
    }

    return {select}
};

export default useSelect;