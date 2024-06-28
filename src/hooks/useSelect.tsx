const useSelect = () => {
    const select = (list: any, id: string) => {
        list ??= [];
        id ??= '';
        let foundListItem = list.filter((item: any) => item.id === id);

        return foundListItem.length > 0 ? foundListItem[0].data.label : ''
    }

    return {select}
};

export default useSelect;