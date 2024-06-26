import AREAS from "../constants/Areas";

export const HandleGetRequestError = "HandleGetRequestError";
export const HandleDonationTileOnClick = "HandleDonationTileOnClick";
export const HandleDonationCancelButtonOnClick = "HandleDonationCancelButtonOnClick";
export const HandleOnDonationAreaLoad = 'HandleOnDonationAreaLoad';
export const HandleGetEventsComplete = 'HandleGetEventsComplete';
export const HandleGetPaymentsComplete = 'HandleGetPaymentsComplete';
export const HandleGetDonationItemsComplete = 'HandleGetDonationItemsComplete'
export const HandleOnDonationItemModalClose = 'HandleOnDonationItemModalClose'
export const HandleOnDonationItemModalOpen = 'HandleOnDonationItemModalOpen'
export const HandleOnDonationItemUpdated = 'HandleOnDonationItemUpdated';
export const HandleOnViewDonationItemsModalOpen = 'HandleOnViewDonationItemsModalOpen';
export const HandleOnViewDonationItemsModalClosed = 'HandleOnViewDonationItemsModalClosed'

const ApplicationReducer = (state: any, action: any) => {
    switch (action.type) {
      case HandleGetRequestError:
      return { ...state, isLoading: false, error: action.payload };
      case HandleDonationTileOnClick:
        return {...state, selectedArea: AREAS.DonationArea} 
      case HandleDonationCancelButtonOnClick: 
        return {...state, selectedArea: AREAS.TileArea}
      case HandleOnDonationAreaLoad:
        return {...state, isGetPaymentsLoading:true, isGetEventsLoading:true, isGetDonationItemsLoading: true, isAddDonationItemModalOpen:false, addedDonationItems: [], isViewDonationItemsOpen:false}
      case HandleGetPaymentsComplete:
        return {...state, isGetPaymentsLoading:false, payments: action.payload}
      case HandleGetEventsComplete:
          return {...state, isGetEventsLoading:false, events: action.payload}
      case HandleGetDonationItemsComplete:
          return {...state, isGetDonationItemsLoading:false, donationItems: action.payload}
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
      default:
        return state;
    }
  };

export default ApplicationReducer