import { ClassItem, DefaultItem, OneTimeTabletItem, OthersItem } from "./forms";

export interface Donation {
    donationType: string,
    phone: string,
    chineseName: string,
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    payment: string,
    dataDisclaimer: boolean,
    frontDeskAttendee: string,
    id: string,
    hasPaid: boolean,
    referenceNumber: string,
    item: Array<ClassItem> | Array<OthersItem> | Array<DefaultItem> | Array<OneTimeTabletItem>
}