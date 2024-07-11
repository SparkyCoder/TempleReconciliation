import { Box, Center } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import { useEffect, useReducer } from "react";
import ApplicationReducer, { HandlOnApiCredentialsLoaded } from "../reducers/ApplicationReducer";
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
import SettingsArea from "./SettingsArea";
import useApiCredentials from "../hooks/useApiCredentials";
import ReportArea from "./ReportArea";

const ContentArea = () => {
    const {showError, showSuccess} = useMessage();
    const {select, selectPhone} = useSelect();
    const {validate} = useValidation();
    const {createReceiptPdf} = useReceipt()
    const {saveData, getData, clearAllData, clearUsers} = useStorage();
    const {getApiCredentials} = useApiCredentials();


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
        accessKey: '',
        secretKey: ''
    })

    useEffect(() => {
        onComponentLoad();
    }, [state.selectedArea])

    const onComponentLoad = async () => {
        var credentials = await getApiCredentials();
        dispatch({ type: HandlOnApiCredentialsLoaded, payload: credentials })
    }

    //For Developement Pursposes Only
    useEffect(() => console.log(state.error), [state.error]);

    useEffect(() => console.log(state.selectedArea), [state.selectedArea]);

    return (
        <>
        <Header />
        <Box style={[styles.full, styles.contentArea]}>
            <Center>
                <Box style={styles.subContentArea}>
                    {state.selectedArea === AREAS.TileArea && <TileArea state={state} dispatch={dispatch} />}
                    {state.selectedArea === AREAS.DonationArea && <DonationArea state={state} dispatch={dispatch} />}
                    {state.selectedArea === AREAS.SettingsArea && <SettingsArea state={state} dispatch={dispatch} />}
                    {state.selectedArea === AREAS.ReportArea && <ReportArea state={state} dispatch={dispatch} />}
                </Box>
            </Center>                         
        </Box>
        </>
    );
};

export default ContentArea;