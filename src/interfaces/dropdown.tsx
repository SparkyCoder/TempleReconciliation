export interface DropDownItem{
    label: string,
}

export interface DropDownList{
    items: Array<DropDownList | DropDownItem>
    lable: string
}