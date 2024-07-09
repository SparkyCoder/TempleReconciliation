import { Box, Center } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import { useEffect, useReducer } from "react";
import ApplicationReducer from "../reducers/ApplicationReducer";
import TileArea from "./TileArea";
import Areas from "../constants/Areas";
import AREAS from "../constants/Areas";
import DonationArea from "./DonationArea";
import useMessage from "../hooks/useToast";
import useValidation from "../hooks/useValidation";
import useReceipt from "../hooks/useReceipt";
import useSelect from "../hooks/useSelect";
import useStorage from "../hooks/useStorage";
import React from "react";
import Header from "./Header";

const ContentArea = () => {
    const {showError, showSuccess} = useMessage();
    const {select, selectPhone} = useSelect();
    const {validate} = useValidation();
    const {createReceiptPdf} = useReceipt()
    const {saveData, getData, clearAllData, clearUsers} = useStorage();


    const [state, dispatch] = useReducer(ApplicationReducer, {
        selectedArea: Areas.TileArea,
        resetCacheCount: 0,
        payments:[],
        donationTypes:[],
        donationItems: [],
        addedDonationItems: [],
        frontDeskPins:[],
        donation:{},
        showError,
        showSuccess,
        validate,
        createReceiptPdf,
        select,
        selectPhone,
        saveData,
        getData,
        clearAllData,
        clearUsers,
        accessKey: '##########',
        secretKey: '#########################'
    })

    //For Developement Pursposes Only
    useEffect(() => console.log(state.error), [state.error]);

    return (
        <>
        <Header state={state} dispatch={dispatch}/>
        <Box style={[styles.full, styles.contentArea]}>
            <Center>
                <Box style={styles.subContentArea}>
                    {state.selectedArea === AREAS.TileArea && <TileArea state={state} dispatch={dispatch} />}
                    {state.selectedArea === AREAS.DonationArea && <DonationArea state={state} dispatch={dispatch} />}
                </Box>
            </Center>                         
        </Box>
        </>
    );
};

export default ContentArea;