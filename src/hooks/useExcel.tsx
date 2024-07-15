var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import FileViewer from "react-native-file-viewer";
import { State } from '../interfaces/state';
import { ReducerTypes } from '../reducers/ApplicationReducer';
import { SavedDonation } from '../interfaces/donation';
import moment from 'moment';

const useExcel = (state:State,dispatch:any) => {
  const map = () => {
    const sum = (array: string[]) => eval(array.join('+'));
    const round = (number: number) => Math.ceil(number * 100) / 100;
    const list = (array: string[]) => array.join(', ');
    return state.reportData.map((donation: SavedDonation) => {
      return {
        date: moment(donation.date).format('MM/DD/YYYY HH:mm A'),
        front_desk_attendee: donation.frontDeskAttendee,
        first_name: donation.user.firstName,
        last_name: donation.user.lastName,
        chinese_name: donation.user.chineseName,
        email: donation.user.email,
        phone: donation.user.phone,
        street: donation.user.street,
        city: donation.user.city,
        state: donation.user.state,
        zipCode: donation.user.zipCode,
        payment: donation.payment,
        reference_number: donation.referenceNumber,
        items: list(donation.items.map(item => item.type)),
        totalAmount: `$${round(sum(donation.items.map(item => item.amount))).toFixed(2)}` ,
      }
    })
  }

    const exportDataToExcel = () => {
      if(state.reportData.length <= 0) return;

        let wb = XLSX.utils.book_new();

        let ws = XLSX.utils.json_to_sheet(map())    
        XLSX.utils.book_append_sheet(wb,ws,"Donations")
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
     
        RNFS.writeFile(RNFS.DocumentDirectoryPath + '/donations.xlsx', wbout, 'ascii').then(()=>{
            openReceiptPdf(RNFS.DocumentDirectoryPath + '/donations.xlsx', () => {
              dispatch({type: ReducerTypes.HandleGetDonationsComplete,payload:[]})
            })
        }).catch((error: any)=>{
          dispatch({type: ReducerTypes.HandleError, payload: error})
        }); 
    
      }

      const openReceiptPdf = (filePath: string, onComplete: any) => {
        FileViewer.open(filePath)
        .then(() => {
           onComplete();
        })
        .catch((error) => {
          dispatch({type: ReducerTypes.HandleError, payload: error})
        });
    }

    return {exportDataToExcel}
}

export default useExcel;