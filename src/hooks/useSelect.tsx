const useSelect = () => {
    const select = (list: any, label: string) => {
        list ??= [];
        label ??= '';
        let foundListItem = list.filter((item: any) => item.label === label);
        return foundListItem.length > 0 ? foundListItem[0] : {}
    }

    return {select}
};

export default useSelect;