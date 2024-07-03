import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import useMessage from "./useToast";
import { State } from '../interfaces/state';
import { ClassItem, DefaultItem, OneTimeTabletItem, OthersItem } from '../interfaces/forms';

const useReceipt = () => {
    const {showError} = useMessage();

    const createReceiptPdf = async (state: State, onComplete: () => void) => {
        try{
        const jsxString = createReceiptHtml(state);
        const timestamp = new Date().getTime();
        let options = {
            html: jsxString,
            fileName: `Donation-Receipt-${state?.donation?.firstName ?? ''}-${state?.donation?.lastName ?? ''}-${timestamp}`,
            directory: 'Documents',
          };
      
          let file = await RNHTMLtoPDF.convert(options)

          if(!file?.filePath) {
            state.showError('Error', 'Could not find file path.')
            return;
          }

          openReceiptPdf(file.filePath, onComplete)
        }
        catch(error){
            showError('Error', 'Could not create receipt PDF.')
        }
    }

    const openReceiptPdf = (filePath: string, onComplete: any) => {
        FileViewer.open(filePath)
        .then(() => {
           onComplete();
        })
        .catch((error) => {
            showError('Error', `Could not open file @ ${filePath} - ${error}`);
        });
    }

    const createReceiptHtml = (state: State) => {
        const date = new Date()
        return `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Receipt for Donation ${state.donation.id}</h1>
            </header>
            <h1>Donation Details</h1>
            <table>
              <tr>
                <th>Donation Date</th>
                <td>${date}</td> 
              </tr>
              ${state?.donation?.chineseName ? `<tr>
                <th>Chinese Name</th>
                <td>${state?.donation?.chineseName ?? 'N/A'}</td>
              </tr>`: ''}
              ${state?.donation?.firstName ? `<tr>
                <th>First Name</th>
                <td>${state?.donation?.firstName ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.lastName ? `<tr>
                <th>Last Name</th>
                <td>${state?.donation?.lastName ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.phone ? `<tr>
                <th>Phone</th>
                <td>${state?.donation?.phone ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.email ? `<tr>
                <th>Email</th>
                <td>${state?.donation?.email ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.street ? `<tr>
                <th>Address</th>
                <td>${state?.donation?.street ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.city ? `<tr>
                <th>Address</th>
                <td>${state?.donation?.city ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.state ? `<tr>
                <th>Address</th>
                <td>${state?.donation?.state ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.zipCode ? `<tr>
                <th>Address</th>
                <td>${state?.donation?.zipCode ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.payment ? `<tr>
                <th>Payment Type</th>
                 <td>${state?.donation?.payment ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.referenceNumber ? `<tr>
                <th>ReferenceNumber</th>
                 <td>${state?.donation?.referenceNumber ?? 'N/A'}</td>
              </tr>` : ''}
              ${state?.donation?.frontDeskAttendee ? `<tr>
                <th>Attendee</th>
                 <td>${state?.donation?.frontDeskAttendee ?? 'N/A'}</td>
              </tr>` : ''}
            </table>
            <div>${createDonationItemList(state)}</div>
            <footer>
              <p>Thank you for your donation to Guang Ming Temple.</p>
            </footer>
          </body>
        </html>
      `
    }

    const createDonationItemList = (state: State) => {
        return state.addedDonationItems.map((item:ClassItem | OthersItem | DefaultItem | OneTimeTabletItem, index:number) => {
            return `
            <br /><br /><br />
            <h1>Donated Item #${index+1}</h1>
            <table>
              ${item?.type ? `<tr>
                <th>Type</th>
                 <td>${item.type ?? 'N/A'}</td>
              </tr>` : ''}
              ${item?.name ? `<tr>
                <th>Name</th>
                 <td>${item.name ?? 'N/A'}</td>
              </tr>` : ''}
              ${item?.amount ? `<tr>
                <th>Amount</th>
                 <td>${item.amount ?? 'N/A'}</td>
              </tr>`: ''}
              ${item?.className ? `<tr>
                <th>Class Name</th>
                 <td>${item.className ?? 'N/A'}</td>
              </tr>` : ''}
              ${item?.remarks ? `<tr>
                <th>Remarks / Notes</th>
                 <td>${item.remarks ?? 'N/A'}</td>
              </tr>` : ''}
              ${item?.relationship ? `<tr>
                <th>Relationship</th>
                 <td>${item.relationship ?? 'N/A'}</td>
              </tr>`: ''}
              ${item?.relative ? `<tr>
                <th>Relative</th>
                 <td>${item.relative ?? 'N/A'}</td>
              </tr>`: ''}
              ${item?.date ? `<tr>
                <th>Date</th>
                 <td>${item.date ?? 'N/A'}</td>
              </tr>` : ''}
            </table>`
        });
    }

    return {createReceiptPdf}
};

export default useReceipt;