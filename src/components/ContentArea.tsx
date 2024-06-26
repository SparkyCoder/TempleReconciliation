import { Box, Center } from "@gluestack-ui/themed";
import { styles } from "../styles/styles";
import { useReducer } from "react";
import ApplicationReducer from "../reducers/ApplicationReducer";
import TileArea from "./TileArea";
import Areas from "../constants/Areas";
import AREAS from "../constants/Areas";
import DonationArea from "./DonationArea";

const ContentArea = () => {
    const initialState = {
        selectedArea: Areas.TileArea,
        payments:[],
        events:[],
        donationItems:[]
    }

    const [state, dispatch] = useReducer(ApplicationReducer, initialState)

    return (
        <Box style={[styles.full, styles.contentArea]}>
            <Center>
                <Box style={styles.subContentArea}>
                    {state.selectedArea === AREAS.TileArea && <TileArea state={state} dispatch={dispatch} />}
                    {state.selectedArea === AREAS.DonationArea && <DonationArea state={state} dispatch={dispatch} />}
                </Box>
            </Center>                         
        </Box>
    );
};

export default ContentArea;