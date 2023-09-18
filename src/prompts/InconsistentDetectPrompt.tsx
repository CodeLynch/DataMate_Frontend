import { useNavigate } from "react-router-dom";
import FileService from "../services/FileService";
import { Box, Button, styled } from "@mui/material";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import wordsToNumbers from "words-to-numbers";

const styles = {
    dialogPaper: {
      backgroundColor: '#DCF1EC',
      padding: "25px",
    },
    uploadButton: {
        marginTop: '5px',
        borderRadius: '50px',
        width: '250px',
        background: '#71C887',
      },
};

type IncProps = {
    toggleInconsistentDetect: (status:boolean) => void,
    toggleImportSuccess: (status:boolean) => void,
    toggleNormalized: (status:boolean) => void,
    fileId: number,
    workbook: XLSX.WorkBook | null | undefined, 
    sheets:string[], 
    vsheets:string[],
    inclist:string[],
    sheetdata: object,
    reset: () => void,
    updateSData: (data:Object) => void,
    normSheets: string[],
  }

interface WorkbookData {
    [sheet: string]: Object[];
}

interface TableRow {
    [key: string]: string | number;
}

interface ColumnTypes {
    [columnName: string]: string[];
}

const InconsistentDetectPrompt = ({fileId, toggleNormalized, normSheets, toggleImportSuccess, toggleInconsistentDetect, reset, workbook, sheets, vsheets, sheetdata, inclist, updateSData}: IncProps) => {  
  const nav = useNavigate();


  //function to convert words to number using wordtonumber library
  function convertToNumber(value: string): string | number{
    console.log("conversion called");
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      const numericValue = wordsToNumbers(value) as number;
      return isNaN(numericValue) ? value: numericValue;
    } else {
      return value;
    }
  }

  //find the dominant data type in column
  function findMajorityDataType(values: (string | number | boolean)[]): string {
    const typeCounts: Record<string, number> = {};

    let isFirst = true;

    values.forEach(value => {
      if (!isFirst) {
        typeCounts[value.toString()] = (typeCounts[value.toString()] || 0) + 1;
      }
      
      isFirst = false;
    });
  
    let majorityType = '';
    let majorityCount = 0;
  
    for (const type in typeCounts) {
      if (typeCounts[type] > majorityCount) {
        majorityType = type;
        majorityCount = typeCounts[type];
      }
    }
    console.log("the count is: ",typeCounts);
    console.log("the values are: ", values, "so the majority is: ", majorityType);
    return majorityType;
  }

  function convertToType(value: string | number | boolean, targetType: string): string | number {
    switch (targetType) {
      case 'number':
        return convertToNumber(value as string);
      case 'boolean':
        const str = value.toString();  
        if(str.toLowerCase() === 'true' || str.toUpperCase() === 'TRUE' || str === '1'){
            return "TRUE";
        }else if(str.toLowerCase() === 'false' || str.toUpperCase() === 'FALSE' || str === '0'){
            return "FALSE";
        }else{
            return str;
        }
      default:
        return value.toString();
    }
  }

  const cancelProcess = () => {
        FileService.deleteFile(fileId).then((res)=>{
            toggleInconsistentDetect(false);
            reset();
            nav("/");
        }).catch((err)=>{
            console.log(err);
        })
    }

    function convertToMajorityType(table: TableRow[]): TableRow[] {
        const processedTable: TableRow[] = [];
        const columnTypes: ColumnTypes = {};
      
        table.forEach(row => {
          for (const columnName in row) {
            const value = row[columnName];
            const valueType = typeof value;
      
            if (!columnTypes[columnName]) {
              columnTypes[columnName] = [];
            }
      
            columnTypes[columnName].push(valueType);
          }
        });
        console.log("column type object: " , columnTypes);
      
        table.forEach(row => {
          const processedRow: TableRow = {};
      
          for (const columnName in row) {
            const value = row[columnName];
            const targetType = findMajorityDataType(columnTypes[columnName]);
            console.log("in column", columnName," the value", value, " convert to type ", targetType)
            const convertedValue = convertToType(value, targetType);
            processedRow[columnName] = convertedValue;
          }
      
          processedTable.push(processedRow);
        });
      
        return processedTable;
      }

  function continueFunction(){
    const sd = sheetdata as WorkbookData;
    //use algorithm for replacing empty values with NULL
    for (const sheet in inclist){
        sd[inclist[sheet]] = convertToMajorityType(sd[inclist[sheet]] as TableRow[]); 
        workbook!.Sheets[inclist[sheet]] = XLSX.utils.json_to_sheet(sd[inclist[sheet]], {skipHeader:true});
      }
    updateSData(sd as Object);
    //clean inconsistent list
    while(inclist.length > 0){
        inclist.pop();
    }
    console.log("result: ", sd);
    toggleInconsistentDetect(false);

    if(normSheets.length > 0){
      toggleNormalized(true);
    }else{
      toggleImportSuccess(true);
    }
    
  }
  


  return (
    <Box sx={{
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 798,
        maxHeight: 594,
        bgcolor: '#71C887',
        boxShadow: 24,
        p: 2,
    }}>
        <div style={{marginTop:"3%", padding:"2em", backgroundColor:"#DCF1EC"}}>
          <div style={{display:"flex", justifyContent:"Center", flexDirection:"column", margin:"2em"}}>
              <p style={{fontSize:"24px", padding:0, margin:0, textAlign:"center"}}>DataMate has detected inconsistencies in your data. To successfully store your data, please allow DataMate to apply some changes.</p>
              {/* <p style={{fontSize:"24px", padding:0, margin:0, textAlign:"center"}}>Data is imported successfully!</p> */}
          </div>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button disableElevation onClick={cancelProcess} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: 'white', color:'black', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Cancel</Button>
          <Button disableElevation onClick={continueFunction} variant="contained" sx={{fontSize:'18px', textTransform:'none', backgroundColor: '#71C887', color:'white', borderRadius:50 , paddingInline: 4, margin:'5px'}}>Continue</Button>
          </div>
        </div>
    </Box>
  );
};

export default styled(InconsistentDetectPrompt)({});

export {}; // Add this empty export statement