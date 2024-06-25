import AREAS from "../constants/Areas";

export const HandleAuditReportOnClick = "HandleAuditReportOnClick";
export const HandleAuditReportDataComplete = "HandleLoadingComplete";
export const HandleAuditReportDataError = "HandleAuditReportError";
export const HandleAuditDataLoaded = "HandleAuditDataLoaded";
export const HandleDonationTileOnClick = "HandleDonationTileOnClick";
export const HandleDonationCancelButtonOnClick = "HandleDonationCancelButtonOnClick";

const AuditReportReducer = (state: any, action: any) => {
    switch (action.type) {
      case HandleAuditReportOnClick:
        return { ...state, isLoading: true };
      case HandleAuditDataLoaded:
        return { ...state, isLoading: false, data: action.payload };
      case HandleAuditReportDataError:
      return { ...state, isLoading: false };
      case HandleDonationTileOnClick:
        return {...state, selectedArea: AREAS.DonationArea}
      case HandleDonationCancelButtonOnClick: 
        return {...state, selectedArea: AREAS.TileArea}
      default:
        return state;
    }
  };

export default AuditReportReducer