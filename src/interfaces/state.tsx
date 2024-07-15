import { Dispatch, ReactElement, ReducerAction } from "react"
import { Donation, SavedDonation } from "./donation"
import { User } from "./users"
import { DropDownList } from "./dropdown"
import { Pin } from "./pin"
import { ReducerDispatchAction } from "../reducers/ApplicationReducer"
import AREAS from "../constants/Areas"
import { Form } from "./forms"

export interface DefaultProps{
    state: State,
    dispatch: Dispatch<ReducerDispatchAction>
}

export interface State {
    isGetPaymentsLoading: boolean,
    isGetDonationTypesLoading: boolean,
    isGetFrontDeskPinLoadings: boolean,
    isPostDonationLoading: boolean,
    isDisclaimerModalOpen: boolean,
    isGetUsersLoading: boolean,
    isGetDonationsLoading: boolean,
    isAddDonationItemModalOpen: boolean,
    isViewDonationItemsOpen: boolean,
    isPaymentModalOpen: boolean,
    selectedArea: AREAS,
    secretKey: string,
    accessKey: string,
    payments: Array<DropDownList>,
    donationTypes: Array<DropDownList>, 
    users: Array<User>
    frontDeskPins: Array<Pin>,
    donation: Donation,
    addedDonationItems: Array<Form>,
    disclaimerTitle: string,
    disclaimerText: string,
    resetCacheCount: number,
    error: unknown,
    reportData: Array<SavedDonation>,
    showError: (title: string, message: string) => void,
    showSuccess: (title: string, message: string) => void,
    validate: (Name: string, Value: string) => boolean,
    createReceiptPdf: (state: State, onComplete: () => void) => void,
    select: (list: Array<DropDownList> | undefined, label: string) => DropDownList | never[],
    selectPhone: (users: Array<User> | undefined, number: string) => User | undefined,
    saveData: (key: string, value: any) => void,
    getData: <T>(key: string) => Promise<T> | null,
    postDonation: (donation: Donation) => void,
    clearAllData: () => void,
    clearUsers: () => void,
    validatePermissions:(onSuccess:()=>void, onDenied:()=>void, onError:(error:unknown)=>void) => void
}