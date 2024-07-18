var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import FileViewer from "react-native-file-viewer";
import { State } from '../interfaces/state';
import { ReducerTypes } from '../reducers/ApplicationReducer';
import moment from 'moment';

const useExcel = (state:State,dispatch:any) => {
  const map = () => {
    let rows: { Date: string; Front_Desk_Attendee: string; First_Name: string; Last_Name: string; Chinese_Name: string; Item_Type: string; Item_Name: string | undefined; Amount: string; Payment: string; Reference_Number: string; Email: string; Phone: string; Street: string; City: string; State: string; ZipCode: string; }[] = [];

    state.reportData.forEach(donation => {
      donation.items.forEach(item => {
        rows.push({
          Date: moment(Number(donation.date)).format('MM/DD/YYYY hh:mm:ss A'),
          Front_Desk_Attendee: donation.frontDeskAttendee,
          First_Name: donation.user.firstName,
          Last_Name: donation.user.lastName,
          Chinese_Name: donation.user.chineseName,
          Item_Type: item.type,
          Item_Name: item.name,
          Amount: `$${Number(item.amount).toFixed(2)}`,
          Payment: donation.payment,
          Reference_Number: donation.referenceNumber,
          Email: donation.user.email,
          Phone: donation.user.phone,
          Street: donation.user.street,
          City: donation.user.city,
          State: donation.user.state,
          ZipCode: donation.user.zipCode,
        })
    });
    })

    return rows;
  }

    const exportDataToExcel = () => {
      if(state.reportData.length <= 0) return;

        let wb = XLSX.utils.book_new();
        let mapping = map();
        let ws = XLSX.utils.json_to_sheet(mapping)    
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