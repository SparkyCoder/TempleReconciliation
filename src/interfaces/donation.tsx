import {Form } from "./forms";
import { User } from "./users";

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
    fileName: string,
    items: Array<Form>
}

export interface SavedDonation {
    dataDisclaimer: boolean,
    date: string,
    fileName: string,
    frontDeskAttendee: string,
    id: string,
    payment: string,
    referenceNumber: string,
    user: User
    items: Array<Form>
}