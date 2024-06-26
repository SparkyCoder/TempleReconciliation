import axios from "axios";
import { HandleGetDonationItemsComplete, HandleGetEventsComplete, HandleGetPaymentsComplete, HandleGetRequestError } from "../reducers/ApplicationReducer";
import URLS from "../constants/Urls";

const useDonations = (auditDispatch : any) => {  
    const getEvents = () => {
        axios.get(`${URLS.Root}${URLS.GetEvents}`).then((response) => {
            auditDispatch({ type: HandleGetEventsComplete, payload: response.data })
          })
          .catch((error) => {
            auditDispatch({ type: HandleGetRequestError, payload: error })
          });
    }

    const getPayments = () => {
      axios.get(`${URLS.Root}${URLS.GetPayments}`).then((response) => {
          auditDispatch({ type: HandleGetPaymentsComplete, payload: response.data })
        })
        .catch((error) => {
          auditDispatch({ type: HandleGetRequestError, payload: error })
        });
    }

    const getDonations = () => {
      axios.get(`${URLS.Root}${URLS.GetDonationItems}`).then((response) => {
          auditDispatch({ type: HandleGetDonationItemsComplete, payload: response.data })
        })
        .catch((error) => {
          auditDispatch({ type: HandleGetRequestError, payload: error })
        });
  }

    return {getEvents, getPayments, getDonations};
};

export default useDonations;
