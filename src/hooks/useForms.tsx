import React from "react";
import DefaultForm from "../components/forms/DefaultForm";
import {FormProps} from "../interfaces/forms";
import ClassesForm from "../components/forms/ClassesForm";
import OthersForm from "../components/forms/OthersForm";
import OneTimeTabletForm from "../components/forms/OneTimeTabletForm";

const useForms = () => {
    const renderForm = ({state, type, details, setDetails, items} : FormProps) => {
        if(type.includes('Classes')){
            return <ClassesForm state={state} type={type} details={details} setDetails={setDetails} items={items} />
        }
        else if (type.includes('One-Time Tablet')){
            return  <OneTimeTabletForm details={details} setDetails={setDetails} />
        }
        else if (type.includes('Other')){
            return <OthersForm details={details} setDetails={setDetails} />
        }
        else {
            return <DefaultForm state={state} type={type} details={details} setDetails={setDetails} />
        }
    }

    return {renderForm}
}

export default useForms;