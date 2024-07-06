import axios from "axios";
import { HandleGetDonationTypesComplete, HandleGetFrontDeskPinsComplete, HandleGetPaymentsComplete, HandleGetRequestError, HandleGetUsersComplete, HandlePostDonationComplete } from "../reducers/ApplicationReducer";
import URLS from "../constants/Urls";
import Storage from "../constants/Storage";
import { Donation } from "../interfaces/donation";

const useAxios = (state: any, auditDispatch : any) => {  

  const getDonationTypes = async () => {
    let donationTypes = await state.getData(Storage.DonationTypes)

        if(donationTypes){
          auditDispatch({ type: HandleGetDonationTypesComplete, payload: donationTypes })
          return;
        }

    axios.get(`${URLS.Root}${URLS.GetDonationTypes}`).then(async (response) => {
        await state.saveData(Storage.DonationTypes, response.data);
        auditDispatch({ type: HandleGetDonationTypesComplete, payload: response.data })
      })
      .catch((error) => {
        state.showError('Error', 'Could not retrieve donation types.')
        auditDispatch({ type: HandleGetRequestError, payload: error })
      });
}

  const getUsers = async () => {
    let users = await state.getData(Storage.Users)

        if(users){
          auditDispatch({ type: HandleGetUsersComplete, payload: users })
          return;
        }

    axios.get(`${URLS.Root}${URLS.GetUsers}`).then(async(response) => {
        await state.saveData(Storage.Users, response.data);
        auditDispatch({ type: HandleGetUsersComplete, payload: response.data })
      })
      .catch((error) => {
        state.showError('Error', 'Could not retrieve users.')
        auditDispatch({ type: HandleGetRequestError, payload: error })
      });
}

  const getFrontDeskPins = async () => {
    let pins = await state.getData(Storage.Pins)

        if(pins){
          auditDispatch({ type: HandleGetFrontDeskPinsComplete, payload: pins })
          return;
        }

    axios.get(`${URLS.Root}${URLS.GetFrontDeskPins}`).then(async (response) => {
        await state.saveData(Storage.Pins, response.data);
        auditDispatch({ type: HandleGetFrontDeskPinsComplete, payload: response.data })
      })
      .catch((error) => {
        state.showError('Error', 'Could not retrieve front desk pins.')
        auditDispatch({ type: HandleGetRequestError, payload: error })
      });
}

const getPayments = async () => {
  let payments = await state.getData(Storage.Payments)

    if(payments){
      auditDispatch({ type: HandleGetPaymentsComplete, payload: payments })
      return;
    }

  axios.get(`${URLS.Root}${URLS.GetPayments}`).then(async (response) => {
      await state.saveData(Storage.Payments, response.data);
      auditDispatch({ type: HandleGetPaymentsComplete, payload: response.data })
    })
    .catch((error) => {
      state.showError('Error', 'Could not retrieve payment types.')
      auditDispatch({ type: HandleGetRequestError, payload: error })
    });
}

const postDonation = async (donation: Donation) => {
  axios.post(`${URLS.Root}${URLS.PostDonation}`, donation).then(async () => {
      if(donation && donation.phone){
        state.clearUsers();
      };
      auditDispatch({ type: HandlePostDonationComplete, payload: donation })
    })
    .catch((error) => {
      state.showError('Error', 'Could not save donation.' )
      auditDispatch({ type: HandleGetRequestError, payload: error })
    });
}

    return {getDonationTypes, getPayments, getFrontDeskPins, getUsers, postDonation};
};

export default useAxios;
