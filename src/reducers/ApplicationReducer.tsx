import AREAS from "../constants/Areas";
import { State } from "../interfaces/state";

export const enum ReducerTypes{
HandleError = "HandleError",
HandleDonationTileOnClick = "HandleDonationTileOnClick",
HandleReportTileOnClick = 'HandleReportTileOnClick',
HandleCancelButtonOnClick = "HandleCancelButtonOnClick",
HandleOnDonationAreaLoad = 'HandleOnDonationAreaLoad',
HandleGetPaymentsComplete = 'HandleGetPaymentsComplete',
HandleGetDonationsLoading = 'HandleGetDonationsLoading',
HandleGetDonationsComplete = 'HandleGetDonationsComplete',
HandleGetUsersComplete = 'HandleGetUsersComplete',
HandleGetDonationTypesComplete = 'HandleGetDonationTypesComplete',
HandleOnDonationItemModalClose = 'HandleOnDonationItemModalClose',
HandleOnDonationItemModalOpen = 'HandleOnDonationItemModalOpen',
HandleOnDonationItemUpdated = 'HandleOnDonationItemUpdated',
HandleOnViewDonationItemsModalOpen = 'HandleOnViewDonationItemsModalOpen',
HandleOnViewDonationItemsModalClosed = 'HandleOnViewDonationItemsModalClosed',
HandleDonationSubmitted = 'HandleDonationSubmitted',
HandleGetFrontDeskPinsComplete = 'HandleGetFrontDeskPinsComplete',
HandleReceiptCreated = 'HandleReceiptCreated',
HandleDisclaimerModalOpened = 'HandleDisclaimerModalOpened',
HandleDisclaimerModalClosed = 'HandleDisclaimerModalClosed',
HandleOnPaymentModalClosed = 'HandleOnPaymentModalClosed',
HandlePostDonationLoading = 'HandlePostDonationLoading',
HandlePostDonationComplete = 'HandlePostDonationComplete',
HandleSettingsTileOnClick = 'HandleSettingsTileOnClick',
HandlOnApiCredentialsLoaded = 'HandlOnApiCredentialsLoaded',
HandleOnEnvironmentChanged = 'HandleOnEnvironmentChanged'
}

export interface ReducerDispatchAction {
  type: ReducerTypes;
  payload?: any;
}

const ApplicationReducer = (state: State, action:ReducerDispatchAction): State => {
    switch (action.type) {
      case ReducerTypes.HandleError:
      return { ...state, isGetUsersLoading:false, isGetPaymentsLoading:false, isPostDonationLoading:false, isDisclaimerModalOpen:false, isGetDonationTypesLoading:false, isGetFrontDeskPinLoadings:false, error: action.payload, isViewDonationItemsOpen:false, isPaymentModalOpen:false };
      case ReducerTypes.HandleDonationTileOnClick: 
        return {...state, selectedArea: AREAS.DonationArea} 
      case ReducerTypes.HandleReportTileOnClick: 
        return {...state, selectedArea: AREAS.ReportArea}
      case ReducerTypes.HandleSettingsTileOnClick:
        return {...state, selectedArea: AREAS.SettingsArea} 
      case ReducerTypes.HandleCancelButtonOnClick: 
        return {...state, selectedArea: AREAS.TileArea}
      case ReducerTypes.HandleOnDonationAreaLoad:
        return {...state, donation:{
          donationType: "",
          phone: "",
          chineseName: "",
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          payment: "",
          dataDisclaimer: false,
          frontDeskAttendee: "",
          id: "",
          hasPaid: false,
          referenceNumber: "",
          fileName: "",
          items: []
        }, isDisclaimerModalOpen:false, isGetUsersLoading:true, isGetPaymentsLoading:true, isGetDonationTypesLoading:true, isGetFrontDeskPinLoadings:true, isAddDonationItemModalOpen:false, addedDonationItems: [], isViewDonationItemsOpen:false}
      case ReducerTypes.HandleGetPaymentsComplete:
        return {...state, isGetPaymentsLoading:false, payments: action.payload}
      case ReducerTypes.HandleGetDonationTypesComplete:
          return {...state, isGetDonationTypesLoading:false, donationTypes: action.payload}
      case ReducerTypes.HandleGetUsersComplete:
          return {...state, isGetUsersLoading: false, users: action.payload}
      case ReducerTypes.HandleGetFrontDeskPinsComplete:
        return {...state, isGetFrontDeskPinLoadings:false, frontDeskPins: action.payload}
      case ReducerTypes.HandleOnDonationItemModalOpen:
          return {...state, isAddDonationItemModalOpen:true}
      case ReducerTypes.HandleOnDonationItemModalClose:
          return {...state, isAddDonationItemModalOpen:false}
      case ReducerTypes.HandleOnDonationItemUpdated: 
          return {...state, addedDonationItems: action.payload, isAddDonationItemModalOpen:false}
      case ReducerTypes.HandleOnViewDonationItemsModalOpen:
          return {...state, isViewDonationItemsOpen:true}
      case ReducerTypes.HandleOnViewDonationItemsModalClosed:
          return {...state, isViewDonationItemsOpen:false}
      case ReducerTypes.HandleDonationSubmitted:
          return {...state, isViewDonationItemsOpen:false, isAddDonationItemModalOpen:false, isPaymentModalOpen:true, donation: action.payload}
      case ReducerTypes.HandleOnPaymentModalClosed:
          return {...state, isPaymentModalOpen:false}
      case ReducerTypes.HandleReceiptCreated:
          return {...state, isPaymentModalOpen:false, selectedArea: AREAS.TileArea, donation: {
            donationType: "",
            phone: "",
            chineseName: "",
            firstName: "",
            lastName: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            payment: "",
            dataDisclaimer: false,
            frontDeskAttendee: "",
            id: "",
            hasPaid: false,
            referenceNumber: "",
            fileName: "",
            items: []
          }}
      case ReducerTypes.HandleDisclaimerModalOpened:
          return {...state, isDisclaimerModalOpen: true, disclaimerText: action.payload.text, disclaimerTitle: action.payload.title}
      case ReducerTypes.HandleDisclaimerModalClosed:
          return {...state, isDisclaimerModalOpen: false, disclaimerText: '', disclaimerTitle: ''}
      case ReducerTypes.HandlePostDonationLoading:
          return {...state, isPostDonationLoading: true}
      case ReducerTypes.HandlePostDonationComplete:
          return {...state, isPostDonationLoading: false, donation: action.payload}
      case ReducerTypes.HandlOnApiCredentialsLoaded: 
          return {...state, accessKey: action.payload?.accessKey, secretKey: action.payload?.secretKey}
      case ReducerTypes.HandleGetDonationsLoading:
          return {...state, isGetDonationsLoading:true}
      case ReducerTypes.HandleGetDonationsComplete:
          return {...state, isGetDonationsLoading:false, reportData: action.payload}
      case ReducerTypes.HandleOnEnvironmentChanged:
          return {...state, environment: action.payload}
      default:
        return state;
    }
  };

export default ApplicationReducer