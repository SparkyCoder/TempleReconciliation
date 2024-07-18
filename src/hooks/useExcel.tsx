var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import FileViewer from "react-native-file-viewer";
import { State } from '../interfaces/state';
import { ReducerTypes } from '../reducers/ApplicationReducer';
import moment from 'moment';

const useExcel = (state:State,dispatch:any) => {
  const map = () => {
    let details = []
    let rows: { Details: string, Date: string; Front_Desk_Attendee: string; First_Name: string; Last_Name: string; Chinese_Name: string; Item_Type: string; Amount: string; Payment: string; Reference_Number: string; Email: string; Phone: string; Street: string; City: string; State: string; ZipCode: string; }[] = [];

    state.reportData.forEach(donation => {
      donation.items.forEach(item => {
        let newRow = {
          Date: moment(Number(donation.date)).format('MM/DD/YYYY hh:mm:ss A'),
          Front_Desk_Attendee: donation.frontDeskAttendee,
          First_Name: donation.user.firstName,
          Last_Name: donation.user.lastName,
          Chinese_Name: donation.user.chineseName,
          Item_Type: item.type,
          Amount: `$${Number(item.amount).toFixed(2)}`,
          Payment: donation.payment,
          Reference_Number: donation.referenceNumber,
          Email: donation.user.email,
          Phone: donation.user.phone,
          Street: donation.user.street,
          City: donation.user.city,
          State: donation.user.state,
          ZipCode: donation.user.zipCode,
          Details: ''
        }

        if(item.name){
          details.push(` Name: ${item.name}`)
        }

        if(item.className){
          details.push(` Class Name: ${item.className}`)
        }

        if(item.relationship){
          details.push(` Relationship: ${item.relationship}`)
        }

        if(item.relative){
          details.push(` Relative: ${item.relative}`)
        }

        if(item.date){
          details.push(` Date: ${item.date}`)
        }

        if(item.remarks){
          details.push(` Remarks: ${item.remarks}`)
        }

        newRow.Details = details.join(", ")
        rows.push(newRow);
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
          openSpreadsheet(RNFS.DocumentDirectoryPath + '/donations.xlsx', () => {
              dispatch({type: ReducerTypes.HandleGetDonationsComplete,payload:[]})
            })
        }).catch((error: any)=>{
          dispatch({type: ReducerTypes.HandleError, payload: 'Could not create spreadsheet. '+ error})
        }); 
    
      }

      const openSpreadsheet = (filePath: string, onComplete: any) => {
        FileViewer.open(filePath)
        .then(() => {
           onComplete();
        })
        .catch((error) => {
          dispatch({type: ReducerTypes.HandleError, payload: 'Could not open spreadsheet. ' + error})
        });
    }

    return {exportDataToExcel}
}

export default useExcel;