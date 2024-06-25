import axios from "axios";
import { HandleGetEventsComplete, HandleGetPaymentsComplete } from "../reducers/AuditReportReducer";
import URLS from "../constants/Urls";

const useDonations = (auditDispatch : any) => {    
    const getEvents = () => {
        axios.get(`${URLS.Root}${URLS.GetEvents}`).then((response) => {
          console.log('events complete')
            auditDispatch({ type: HandleGetEventsComplete, payload: response.data })
          })
          .catch((error) => {
            console.log('events error')
            auditDispatch({ type: HandleAuditReportDataError, payload: error })
          });
    }

    const getPayments = () => {
      axios.get(`${URLS.Root}${URLS.GetPayments}`).then((response) => {
        console.log('payments complete')
          auditDispatch({ type: HandleGetPaymentsComplete, payload: response.data })
        })
        .catch((error) => {
          console.log('payments error')
          auditDispatch({ type: HandleAuditReportDataError, payload: error })
        });
  }

    return {getEvents, getPayments}
};

export default useDonations;
