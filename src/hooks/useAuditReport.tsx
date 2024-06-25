import axios from "axios";
import { HandleAuditDataLoaded, HandleAuditReportDataError } from "../reducers/AuditReportReducer";
import URLS from "../constants/Urls";

const useAuditReport = (auditDispatch : any) => {    
    const getAuditData = () => {
        axios.get(URLS.AuditReportUrl).then((response) => {
            auditDispatch({ type: HandleAuditDataLoaded, payload: response.data })
          })
          .catch((error) => {
            auditDispatch({ type: HandleAuditReportDataError })
          });
    }

    return {getAuditData}
};

export default useAuditReport;
