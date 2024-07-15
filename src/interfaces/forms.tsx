import { Dispatch, SetStateAction } from "react"
import { DropDownList } from "./dropdown"

export interface Form{
    type:string, 
    amount:string, 
    className?:string, 
    remarks?:string, 
    name?:string, 
    relationship?:string, 
    relative?:string,
    date?:string
}

export interface FormProps {
    state:any, 
    type:string, 
    details:Form, 
    setDetails:Dispatch<SetStateAction<Form>>,
    items: Array<DropDownList> | undefined
}

export interface ClassFormProps {
    state:any, 
    type:string, 
    details:Form, 
    setDetails:any,
    items: Array<DropDownList> | undefined
}

export interface OthersFormProps {
    details:Form, 
    setDetails:any,
}

export interface DefaultFormProps {
    state:any, 
    type:string, 
    details:Form, 
    setDetails:any
}

export interface OneTimeTabletFormProps {
    details:Form, 
    setDetails:any
}