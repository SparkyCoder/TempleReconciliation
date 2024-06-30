import axios from "axios";
import { HandleGetDonationItemsComplete, HandleGetEventsComplete, HandleGetFrontDeskPinsComplete, HandleGetPaymentsComplete, HandleGetRequestError } from "../reducers/ApplicationReducer";
import URLS from "../constants/Urls";

const useDonations = (state: any, auditDispatch : any) => {  
    const getEvents = () => {
        axios.get(`${URLS.Root}${URLS.GetEvents}`).then((response) => {
            auditDispatch({ type: HandleGetEventsComplete, payload: response.data })
          })
          .catch((error) => {
            state.showError('Error', 'Could not retrieve events.')
            auditDispatch({ type: HandleGetRequestError, payload: error })
          });
    }

    const getPayments = () => {
      axios.get(`${URLS.Root}${URLS.GetPayments}`).then((response) => {
          auditDispatch({ type: HandleGetPaymentsComplete, payload: response.data })
        })
        .catch((error) => {
          state.showError('Error', 'Could not retrieve payment types.')
          auditDispatch({ type: HandleGetRequestError, payload: error })
        });
    }

    const getDonations = () => {
      axios.get(`${URLS.Root}${URLS.GetDonationItems}`).then((response) => {
          auditDispatch({ type: HandleGetDonationItemsComplete, payload: response.data })
        })
        .catch((error) => {
          state.showError('Error', 'Could not retrieve donation item types.')
          auditDispatch({ type: HandleGetRequestError, payload: error })
        });
  }

  const getUsers = () => {
    axios.get(`${URLS.Root}${URLS.GetUsers}`).then((response) => {
        auditDispatch({ type: HandleGetDonationItemsComplete, payload: response.data })
      })
      .catch((error) => {
        state.showError('Error', 'Could not retrieve users.')
        auditDispatch({ type: HandleGetRequestError, payload: error })
      });
}

  const getFrontDeskPins = () => {
    axios.get(`${URLS.Root}${URLS.GetFrontDeskPins}`).then((response) => {
        auditDispatch({ type: HandleGetFrontDeskPinsComplete, payload: response.data })
      })
      .catch((error) => {
        state.showError('Error', 'Could not retrieve front desk pins.')
        auditDispatch({ type: HandleGetRequestError, payload: error })
      });
}

    return {getEvents, getPayments, getDonations, getFrontDeskPins, getUsers};
};

export default useDonations;
