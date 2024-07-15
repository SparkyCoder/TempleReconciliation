import { Box, Center } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import { useEffect, useReducer } from "react";
import ApplicationReducer, { ReducerTypes } from "../reducers/ApplicationReducer";
import TileArea from "./TileArea";
import AREAS from "../constants/Areas";
import DonationArea from "./DonationArea";
import React from "react";
import Header from "./Header";
import SettingsArea from "./SettingsArea";
import useApiCredentials from "../hooks/useApiCredentials";
import ReportArea from "./ReportArea";
import useState from "../hooks/useState";

const ContentArea = () => {
    const {getInitialState} = useState();
    const {getApiCredentials} = useApiCredentials();
    const [state, dispatch] = useReducer(ApplicationReducer, getInitialState())

    useEffect(() => {
        onComponentLoad();
    }, [state.selectedArea])

    const onComponentLoad = async () => {
        var credentials = await getApiCredentials();
        dispatch({ type: ReducerTypes.HandlOnApiCredentialsLoaded, payload: credentials })
    }

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