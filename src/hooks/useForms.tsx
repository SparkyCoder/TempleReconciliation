import React from "react";
import DefaultForm from "../components/forms/DefaultForm";
import { ClassItem, DefaultItem, FormProps, OneTimeTabletItem, OthersItem } from "../interfaces/forms";
import ClassesForm from "../components/forms/ClassesForm";
import OthersForm from "../components/forms/OthersForm";
import OneTimeTabletForm from "../components/forms/OneTimeTabletForm";

const useForms = () => {
    const renderForm = ({state, type, details, setDetails, items} : FormProps) => {
        if(type === 'Classes'){
            return <ClassesForm state={state} type={type} details={details as ClassItem} setDetails={setDetails} items={items} />
        }
        else if (type === 'One-Time Tablet'){
            return  <OneTimeTabletForm details={details as OneTimeTabletItem} setDetails={setDetails} />
        }
        else if (type === 'Other'){
            return <OthersForm details={details as OthersItem} setDetails={setDetails} />
        }
        else {
            return <DefaultForm state={state} type={type} details={details as DefaultItem} setDetails={setDetails} />
        }
    }

    return {renderForm}
}

export default useForms;