import axios from "axios";
import { HandleAuditDataLoaded, HandleAuditReportDataError } from "../reducers/AuditReportReducer";
import CONSTANTS from "../constants/Urls";

const useAuditReport = (auditDispatch : any) => {    
    const getAuditData = () => {
        axios.get(CONSTANTS.AuditReportUrl).then((response) => {
            auditDispatch({ type: HandleAuditDataLoaded, payload: response.data })
          })
          .catch((error) => {
            auditDispatch({ type: HandleAuditReportDataError })
          });
    }

    return {getAuditData}
};

export default useAuditReport;
