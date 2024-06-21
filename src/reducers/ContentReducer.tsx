export const HandleDonationTileOnClick = "handleDonationTileOnClick";
export const HandleLoadingComplete = "handleLoadingComplete"

const contentReducer = (state: any, action: any) => {
    switch (action.type) {
      case HandleDonationTileOnClick:
        return { ...state, isLoading: true };
      case HandleLoadingComplete: 
        return {...state, isLoading: false}
      default:
        return state;
    }
  };

export default contentReducer