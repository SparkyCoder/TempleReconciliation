import axios from "axios";
import { HandleGetDonationItemsComplete, HandleGetEventsComplete, HandleGetFrontDeskPinsComplete, HandleGetPaymentsComplete, HandleGetRequestError, HandleGetUsersComplete } from "../reducers/ApplicationReducer";
import URLS from "../constants/Urls";
import useStorage from "./useStorage";
import Storage from "../constants/Storage";

const useDonations = (state: any, auditDispatch : any) => {  
    const {saveData, getData} = useStorage();

    const getEvents = async () => {
        let events = await getData(Storage.Events)

        if(events){
          auditDispatch({ type: HandleGetEventsComplete, payload: events })
          return;
        }

        axios.get(`${URLS.Root}${URLS.GetEvents}`).then( async (response) => {
            await saveData(Storage.Events, response.data);
            auditDispatch({ type: HandleGetEventsComplete, payload: response.data })
          })
          .catch((error) => {
            state.showError('Error', 'Could not retrieve events.')
            auditDispatch({ type: HandleGetRequestError, payload: error })
          });
    }

    const getPayments = async () => {
      let payments = await getData(Storage.Payments)

        if(payments){
          auditDispatch({ type: HandleGetPaymentsComplete, payload: payments })
          return;
        }

      axios.get(`${URLS.Root}${URLS.GetPayments}`).then(async (response) => {
          await saveData(Storage.Payments, response.data);
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

  const getUsers = async () => {
    let users = await getData(Storage.Users)

        if(users){
          auditDispatch({ type: HandleGetUsersComplete, payload: users })
          return;
        }

    axios.get(`${URLS.Root}${URLS.GetUsers}`).then(async(response) => {
        await saveData(Storage.Users, response.data);
        auditDispatch({ type: HandleGetUsersComplete, payload: response.data })
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
