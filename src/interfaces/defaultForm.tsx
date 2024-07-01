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