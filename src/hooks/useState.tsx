import Areas from "../constants/Areas";
import { Donation } from "../interfaces/donation";
import { State } from "../interfaces/state";
import useReceipt from "./useReceipt";
import useSelect from "./useSelect";
import useStorage from "./useStorage";
import useMessage from "./useToast";
import useValidation from "./useValidation";

const useState = () => {
    const {showError, showSuccess} = useMessage();
    const {select, selectPhone} = useSelect();
    const {validate} = useValidation();
    const {createReceiptPdf} = useReceipt()
    const {saveData, getData, clearAllData, clearUsers} = useStorage();

    const getInitialState = (): State => {
        let initialState: State = {
            selectedArea: Areas.TileArea,
            resetCacheCount: 0,
            reportData: [],
            payments: [{ label: '' }],
            donationTypes: [{ label: '' }],
            addedDonationItems: [],
            frontDeskPins: [],
            donation: {
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
            },
            showError,
            showSuccess,
            validate,
            createReceiptPdf,
            select,
            selectPhone,
            saveData,
            getData,
            clearAllData,
            clearUsers,
            accessKey: '',
            secretKey: '',
            isGetPaymentsLoading: false,
            isGetDonationTypesLoading: false,
            isGetFrontDeskPinLoadings: false,
            isPostDonationLoading: false,
            isDisclaimerModalOpen: false,
            isGetUsersLoading: false,
            isGetDonationsLoading: false,
            isAddDonationItemModalOpen: false,
            isViewDonationItemsOpen: false,
            isPaymentModalOpen: false,
            users: [],
            disclaimerTitle: "",
            disclaimerText: "",
            error: undefined,
            postDonation: function (donation: Donation): void {
                throw new Error("Function not implemented.");
            },
            validatePermissions: function (onSuccess: () => void, onDenied: () => void, onError: (error: unknown) => void): void {
                throw new Error("Function not implemented.");
            },
            environment: ""
        }

        return initialState;
    }
    
    return {getInitialState}
}

export default useState;