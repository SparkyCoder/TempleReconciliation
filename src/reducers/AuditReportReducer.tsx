import AREAS from "../constants/Areas";

export const HandleDonationDataError = "HandleDonationDataError";
export const HandleDonationTileOnClick = "HandleDonationTileOnClick";
export const HandleDonationCancelButtonOnClick = "HandleDonationCancelButtonOnClick";
export const HandleOnDonationAreaLoad = 'HandleOnDonationAreaLoad';
export const HandleGetEventsComplete = 'HandleGetEventsComplete';
export const HandleGetPaymentsComplete = 'HandleGetPaymentsComplete';

const AuditReportReducer = (state: any, action: any) => {
    switch (action.type) {
      case HandleDonationDataError:
      return { ...state, isLoading: false, error: action.payload };
      case HandleDonationTileOnClick:
        return {...state, selectedArea: AREAS.DonationArea}
      case HandleDonationCancelButtonOnClick: 
        return {...state, selectedArea: AREAS.TileArea}
      case HandleOnDonationAreaLoad:
        return {...state, isGetPaymentsLoading:true, isGetEventsLoading:true}
      case HandleGetPaymentsComplete:
        return {...state, isGetPaymentsLoading:false, payments: action.payload}
      case HandleGetEventsComplete:
          return {...state, isGetEventsLoading:false, events: action.payload}
      default:
        return state;
    }
  };

export default AuditReportReducer