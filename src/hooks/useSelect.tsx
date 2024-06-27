const useSelect = () => {
    const select = (list: any, id: string) => {
        let foundListItem = list.filter((item: any) => item.id === id);
        return foundListItem[0].data.label;
    }

    return {select}
};

export default useSelect;