import { DropDownList } from "./dropdown"

export interface FormProps {
    state:any, 
    type:string, 
    details:object, 
    setDetails:any,
    items: Array<DropDownList>
}

export interface ClassItem {
    type:string, 
    className:string, 
    amount:string, 
}

export interface ClassFormProps {
    state:any, 
    type:string, 
    details:ClassItem, 
    setDetails:any,
    items: Array<DropDownList>
}

export interface OthersItem {
    remarks:string, 
}

export interface OthersFormProps {
    details:OthersItem, 
    setDetails:any,
}

export interface DefaultItem {
    type:string, 
    name:string, 
    amount:string, 
}

export interface DefaultFormProps {
    state:any, 
    type:string, 
    details:DefaultItem, 
    setDetails:any
}

export interface OneTimeTabletItem {
    type:string, 
    name:string, 
    relationship:string, 
    relative:string,
    date:string
}

export interface OneTimeTabletFormProps {
    details:OneTimeTabletItem, 
    setDetails:any
}