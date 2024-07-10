import AREAS from "../constants/Areas";
import { State } from "../interfaces/state";

export const HandleError = "HandleError";
export const HandleDonationTileOnClick = "HandleDonationTileOnClick";
export const HandleCancelButtonOnClick = "HandleCancelButtonOnClick";
export const HandleOnDonationAreaLoad = 'HandleOnDonationAreaLoad';
export const HandleGetPaymentsComplete = 'HandleGetPaymentsComplete';
export const HandleGetUsersComplete = 'HandleGetUsersComplete';
export const HandleGetDonationTypesComplete = 'HandleGetDonationTypesComplete'
export const HandleOnDonationItemModalClose = 'HandleOnDonationItemModalClose'
export const HandleOnDonationItemModalOpen = 'HandleOnDonationItemModalOpen'
export const HandleOnDonationItemUpdated = 'HandleOnDonationItemUpdated';
export const HandleOnViewDonationItemsModalOpen = 'HandleOnViewDonationItemsModalOpen';
export const HandleOnViewDonationItemsModalClosed = 'HandleOnViewDonationItemsModalClosed'
export const HandleDonationSubmitted = 'HandleDonationSubmitted';
export const HandleGetFrontDeskPinsComplete = 'HandleGetFrontDeskPinsComplete';
export const HandleReceiptCreated = 'HandleReceiptCreated';
export const HandleDisclaimerModalOpened = 'HandleDisclaimerModalOpened';
export const HandleDisclaimerModalClosed = 'HandleDisclaimerModalClosed';
export const HandleOnPaymentModalClosed = 'HandleOnPaymentModalClosed';
export const HandlePostDonationLoading = 'HandlePostDonationLoading'
export const HandlePostDonationComplete = 'HandlePostDonationComplete';
export const HandleSettingsTileOnClick = 'HandleSettingsTileOnClick';
export const HandlOnApiCredentialsLoaded = 'HandlOnApiCredentialsLoaded';

const ApplicationReducer = (state: State, action: any) => {
    switch (action.type) {
      case HandleError:
      return { ...state, isGetUsersLoading:false, isGetPaymentsLoading:false, isPostDonationLoading:false, isDisclaimerModalOpen:false, isGetDonationTypesLoading:false, isGetFrontDeskPinLoadings:false, error: action.payload, isViewDonationItemsOpen:false, isPaymentModalOpen:false };
      case HandleDonationTileOnClick:
        return {...state, selectedArea: AREAS.DonationArea} 
      case HandleSettingsTileOnClick:
        return {...state, selectedArea: AREAS.SettingsArea} 
      case HandleCancelButtonOnClick: 
        return {...state, selectedArea: AREAS.TileArea}
      case HandleOnDonationAreaLoad:
        return {...state, donation:{}, isDisclaimerModalOpen:false, isGetUsersLoading:true, isGetPaymentsLoading:true, isGetDonationTypesLoading:true, isGetFrontDeskPinLoadings:true, isAddDonationItemModalOpen:false, addedDonationItems: [], isViewDonationItemsOpen:false}
      case HandleGetPaymentsComplete:
        return {...state, isGetPaymentsLoading:false, payments: action.payload}
      case HandleGetDonationTypesComplete:
          return {...state, isGetDonationTypesLoading:false, donationTypes: action.payload}
      case HandleGetUsersComplete:
          return {...state, isGetUsersLoading: false, users: action.payload}
      case HandleGetFrontDeskPinsComplete:
        return {...state, isGetFrontDeskPinLoadings:false, frontDeskPins: action.payload}
      case HandleOnDonationItemModalOpen:
          return {...state, isAddDonationItemModalOpen:true}
      case HandleOnDonationItemModalClose:
          return {...state, isAddDonationItemModalOpen:false}
      case HandleOnDonationItemUpdated: 
          return {...state, addedDonationItems: action.payload, isAddDonationItemModalOpen:false}
      case HandleOnViewDonationItemsModalOpen:
          return {...state, isViewDonationItemsOpen:true}
      case HandleOnViewDonationItemsModalClosed:
          return {...state, isViewDonationItemsOpen:false}
      case HandleDonationSubmitted:
          return {...state, isViewDonationItemsOpen:false, isAddDonationItemModalOpen:false, isPaymentModalOpen:true, donation: action.payload}
      case HandleOnPaymentModalClosed:
          return {...state, isPaymentModalOpen:false}
      case HandleReceiptCreated:
          return {...state, isPaymentModalOpen:false, selectedArea: AREAS.TileArea, donation: {}}
      case HandleDisclaimerModalOpened:
          return {...state, isDisclaimerModalOpen: true, disclaimerText: action.payload.text, disclaimerTitle: action.payload.title}
      case HandleDisclaimerModalClosed:
          return {...state, isDisclaimerModalOpen: false, disclaimerText: '', disclaimerTitle: ''}
      case HandlePostDonationLoading:
          return {...state, isPostDonationLoading: true}
      case HandlePostDonationComplete:
          return {...state, isPostDonationLoading: false, donation: action.payload}
      case HandlOnApiCredentialsLoaded: 
          return {...state, accessKey: action.payload?.accessKey, secretKey: action.payload?.secretKey}

      default:
        return state;
    }
  };

export default ApplicationReducer