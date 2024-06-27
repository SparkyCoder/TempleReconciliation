import { useEffect, useState } from "react";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import jsxToString from 'jsx-to-string';
import useMessage from "./useToast";
import { Box, Center, Text } from "@gluestack-ui/themed";

const useReceipt = () => {
    const {showError} = useMessage();

    const createReceiptPdf = async (state: any, onComplete: () => void) => {
        try{
        const jsxString = createReceiptHtml(state);
        const timestamp = new Date().getTime();
        let options = {
            html: jsxString,
            fileName: `Donation-Receipt-${state.donation.englishName ?? ''}-${timestamp}`,
            directory: 'Documents',
          };
      
          let file = await RNHTMLtoPDF.convert(options)
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

    const createReceiptHtml = (state: any) => {
        const date = new Date()
        let random = Math.random() * 999999;

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
              <tr>
                <th>Chinese Name</th>
                <td>${state.donation.chineseName?? 'N/A'}</td>
              </tr>
              <tr>
                <th>English Name</th>
                <td>${state.donation.englishName ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>${state.donation.phone ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>${state.donation.email ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>${state.donation.address ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Dharma Service</th>
                <td>${state.select(state.events, state.donation.service) ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Payment Type</th>
                 <td>${state.select(state.payments, state.donation.payment) ?? 'N/A'}</td>
              </tr>
              <tr>
                <th>Attendee</th>
                 <td>${state.donation.frontDeskAttendee ?? 'N/A'}</td>
              </tr>
            </table>
            <footer>
              <p>Thank you for your donation to Guang Ming Temple.</p>
            </footer>
          </body>
        </html>
      `
    }

    return {createReceiptPdf}
};

export default useReceipt;