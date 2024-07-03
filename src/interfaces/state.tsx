import { Dispatch } from "react"
import { Donation } from "./donation"
import { ClassItem, DefaultItem, OneTimeTabletItem, OthersItem } from "./forms"
import { User } from "./users"
import { DropDownList } from "./dropdown"
import { Pin } from "./pin"

export interface DefaultProps{
    state: State,
    dispatch: Dispatch<object>
}

export interface State {
    isGetPaymentsLoading: boolean,
    isGetDonationTypesLoading: boolean,
    isGetFrontDeskPinLoadings: boolean,
    isDisclaimerModalOpen: boolean,
    isGetUsersLoading: boolean,
    isAddDonationItemModalOpen: boolean,
    isViewDonationItemsOpen: boolean,
    isPaymentModalOpen: boolean,
    selectedArea: string,
    payments: Array<string>,
    donationTypes: Array<string>,
    users: Array<User>
    frontDeskPins: Array<Pin>,
    donation: Donation,
    addedDonationItems: Array<ClassItem> | Array<OthersItem> | Array<DefaultItem> | Array<OneTimeTabletItem>,
    disclaimerTitle: string,
    disclaimerText: string,
    resetCacheCount: number,
    showError: (title: string, message: string) => void,
    showSuccess: (title: string, message: string) => void,
    validate: (Name: string, Value: string) => boolean,
    createReceiptPdf: (state: State, onComplete: () => void) => void,
    select: (list: Array<DropDownList> | undefined, label: string) => DropDownList,
    saveData: (key: string, value: any) => void,
    getData:<T>(key:string) => Promise<T>
}