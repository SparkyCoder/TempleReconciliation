import * as dropdown from "../interfaces/dropdown";
import { User } from "../interfaces/users";

const useSelect = () => {
    const select = (list: Array<dropdown.DropDownList> | undefined, label: string) => {
        if(!list) list = [];
        if(!label) label = '';
        let foundListItem = list.filter((item: any) => item.label === label);
        return foundListItem.length > 0 ? foundListItem[0] : []
    }

    const selectPhone = (users: Array<User> | undefined, number: string) => {
        if(!users) users = [];
        if(!number) number = '';
        let foundUser = users.filter((user: any) => user?.phone?.replace(/\D/g, '') === number?.replace(/\D/g, ''));
        return foundUser.length > 0 ? foundUser[0] : {}
    }

    return {select, selectPhone}
};

export default useSelect;