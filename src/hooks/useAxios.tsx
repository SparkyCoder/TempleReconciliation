import axios from "axios";
import { ReducerTypes } from "../reducers/ApplicationReducer";
import URLS from "../constants/Urls";
import Storage from "../constants/Storage";
import { Donation, SavedDonation } from "../interfaces/donation";
import MethodTypes from "../constants/MethodTypes";
import moment from 'moment'
import Aws from '../constants/Aws';
import { State } from "../interfaces/state";

const useAxios = (state: State, auditDispatch : any) => {  
  const getDonationTypes = async () => {
    let donationTypes = await state.getData(Storage.DonationTypes)

    if(donationTypes){
      auditDispatch({ type: ReducerTypes.HandleGetDonationTypesComplete, payload: donationTypes })
      return;
    }

   await SendRequestV2(MethodTypes.Get, URLS.GetDonationTypes, '', async(response:any) => {
      await state.saveData(Storage.DonationTypes, response.data);
        auditDispatch({ type: ReducerTypes.HandleGetDonationTypesComplete, payload: response.data })
      },
      async (error: any) => {
        auditDispatch({ type: ReducerTypes.HandleError, payload: 'Could not retrieve donation types. ' + error })
      });
}

  const getUsers = async () => {
    let users = await state.getData(Storage.Users)

    if(users){
      auditDispatch({ type: ReducerTypes.HandleGetUsersComplete, payload: users })
      return;
    }

    await SendRequestV2(MethodTypes.Get, URLS.GetUsers, '', async(response:any) => {
      await state.saveData(Storage.Users, response.data);
      auditDispatch({ type: ReducerTypes.HandleGetUsersComplete, payload: response.data })
      },
      async (error: any) => {
        auditDispatch({ type: ReducerTypes.HandleError, payload: 'Could not retrieve users. ' + error })
      });
}

  const getFrontDeskPins = async () => {
    let pins = await state.getData(Storage.Pins)

    if(pins){
      auditDispatch({ type: ReducerTypes.HandleGetFrontDeskPinsComplete, payload: pins })
      return;
    }

    await SendRequestV2(MethodTypes.Get, URLS.GetFrontDeskPins, '', async(response:any) => {
        await state.saveData(Storage.Pins, response.data);
        auditDispatch({ type: ReducerTypes.HandleGetFrontDeskPinsComplete, payload: response.data })
      },(error: string) => {
        auditDispatch({ type: ReducerTypes.HandleError, payload: 'Could not retrieve front desk pins. ' + error })
      });
}

const getPayments = async () => {
  let payments = await state.getData(Storage.Payments)

  if(payments){
    auditDispatch({ type: ReducerTypes.HandleGetPaymentsComplete, payload: payments })
    return;
  }

  await SendRequestV2(MethodTypes.Get, URLS.GetPayments, '', async(response:any) => {
      await state.saveData(Storage.Payments, response.data);
      auditDispatch({ type: ReducerTypes.HandleGetPaymentsComplete, payload: response.data })
    },(error:string) => {
      auditDispatch({ type: ReducerTypes.HandleError, payload: 'Could not retrieve payment types. ' + error })
    });
}

const postDonation = async (donation: Donation) => {
  await SendRequestV2(MethodTypes.Post, URLS.GetOrPostDonation, donation, async() => {
      if(donation && donation.phone){
        state.clearUsers();
      };
      auditDispatch({ type: ReducerTypes.HandlePostDonationComplete, payload: donation })
    },(error:string) => {
      auditDispatch({ type: ReducerTypes.HandleError, payload: 'Could not save donation. ' + error })
    });
}

const getDonations = async (from: string, to: string, OnSuccess: (value: Array<SavedDonation>) => void) => {
  await SendRequestV2(MethodTypes.Get, `${URLS.GetOrPostDonation}?from=${from}&to=${to}`, '', async(response:any) => {
      auditDispatch({ type: ReducerTypes.HandleGetDonationsComplete, payload: response.data })
      OnSuccess(response.data);
    },(error:string) => {
      auditDispatch({ type: ReducerTypes.HandleError, payload:  'Could not retrieve payment types. ' + error })
    });
}

const SendRequestV2 = (method: string, path:string, body: any, onSuccess:any, onError:any) => {  
  const iso8601FormattedDate = moment().utc().format("yyyyMMDDTHHmmss\\Z") 
  const bodyJson = JSON.stringify(body);

  let headers: any = {
    'Content-Type': 'application/json',
    'X-Amz-Date': iso8601FormattedDate,
    'Host': getHost(),
    'Content-Length': body.length
  }

  var AWSSignature = require('react-native-aws-signature');
  var awsSignature = new AWSSignature();
  let credentials = {
      SecretKey: state.secretKey,
      AccessKeyId: state.accessKey
  };
  var options = {
      path: `/${getEnvironment()}${path}`,
      method: method,
      service: Aws.Service,
      headers: {
          'X-Amz-Date': iso8601FormattedDate,
          'host': getHost(),
          'Content-Length': body.length
      },
      region: Aws.Region,
      body: body ?  bodyJson : '',
      credentials
  };

  awsSignature.setParams(options);

  const authorization = awsSignature.getAuthorizationHeader();

  headers.Authorization = authorization.Authorization;

  axios(`https://${getHost()}/${getEnvironment()}${path}`, {
    method: method,
    data: body,
    headers: headers
  }).then(async (response) => onSuccess(response))
  .catch(async (error) => onError(`https://${getHost()}/${getEnvironment()}${path}  -   ${error}`));
}

const getHost = () => {
  return (state.environment === 'production') ? Aws.HostProduction : Aws.HostDevelop;
}

const getEnvironment = () => {
  return (state.environment === 'production') ? Aws.EnvironmentProduction : Aws.EnvironmentDevelop;
}

    return {getDonationTypes, getPayments, getFrontDeskPins, getUsers, postDonation, getDonations};
};

export default useAxios;
