export const HandleAuditReportOnClick = "HandleAuditReportOnClick";
export const HandleAuditReportDataComplete = "HandleLoadingComplete";
export const HandleAuditReportDataError = "HandleAuditReportError";
export const HandleAuditDataLoaded = "HandleAuditDataLoaded";

const AuditReportReducer = (state: any, action: any) => {
    switch (action.type) {
      case HandleAuditReportOnClick:
        return { ...state, isLoading: true };
      case HandleAuditDataLoaded:
        return { ...state, isLoading: false, data: action.payload };
      case HandleAuditReportDataError:
      return { ...state, isLoading: false };
      default:
        return state;
    }
  };

export default AuditReportReducer