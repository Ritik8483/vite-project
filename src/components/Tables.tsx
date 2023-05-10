// import React, { useState } from "react";
// import { render } from "react-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Chip } from "@mui/material";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: string
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, "abc"),
//   createData("Ice cream sandwich", 237, 9.0, 37, "def"),
//   createData("Eclair", 262, 16.0, 24, "ghi"),
//   createData("Cupcake", 305, 3.7, 67, "jkl"),
//   createData("Gingerbread", 356, 16.0, 49, "mnop"),
// ];

// const Tables = () => {
//   const [widgets, setWidgets] = useState<string[]>([]);
//   const handleOnDrag = (e: React.DragEvent, widgetType: string) => {
//     e.dataTransfer.setData("widgetType", widgetType);
//   };
//   const handleOnDrop = (e: React.DragEvent) => {
//     const widgetType:any = e.dataTransfer.getData("widgetType") as string;
//     console.log("widgetType", widgetType);
//     setWidgets([...widgets, widgetType]);
//     handleFilter(widgetType);
//   };
// const handleFilter=(widgetType:any)=>{
//   widgets.map((item)=>{console.log(item);
//   })
// }
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   console.log("widgets", widgets);
//   // console.log("FILTERED widgets",new Set(widgets));

//   return (
//     <>
//       <div className="firstTwoBtns" style={{ flexDirection: "column" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "15px",
//           }}
//         >
//           <button className="addIntelBtn">Mind Map</button>
//           <button
//             onDrop={handleOnDrop}
//             onDragOver={handleDragOver}
//             className="addIntelBtn"
//           >
//             Quick Report
//           </button>
//           {/* <div className="pageDrop" onDrop={handleOnDrop} onDragOver={handleDragOver} >
//             {
//               widgets.map((widget:any,index:any)=>{
//                 return(
//                   <div key={index} >
//                       {widget}
//                   </div>
//                 )
//               })
//             }
//           </div> */}
//         </div>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Dessert (100g serving)</TableCell>
//                 <TableCell align="right">Calories</TableCell>
//                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                 <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                 <TableCell align="right">Chip&nbsp;(g)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow
//                   key={row.name}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.calories}</TableCell>
//                   <TableCell align="right">{row.fat}</TableCell>
//                   <TableCell align="right">{row.carbs}</TableCell>
//                   <TableCell align="right">{row.protein}</TableCell>
//                   <TableCell align="right">
//                     <div
//                       draggable
//                       onDragStart={(e: any) => handleOnDrag(e, row.protein)}
//                       className="draggableChip"
//                     >
//                       {row.protein}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </>
//   );
// };

// export default Tables;

// import React, { useEffect, useState } from "react";
// import ExcelExportHelper from "./ExcelExportHelper";
// // import ExcelExportHelper from "./components/ExcelExportHelper";

// const DATA: any = [
//   {
//     STUDENT_DETAILS: {
//       id: 101,
//       name: "Suman Kumar",
//       parentName: "Suresh Kumar",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 75,
//       physics: 65,
//       chemistry: 72,
//       english: 62,
//       computerScience: 80,
//     },
//   },
//   {
//     STUDENT_DETAILS: {
//       id: 102,
//       name: "Rahul Kumar",
//       parentName: "Aatma Ram",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 70,
//       physics: 75,
//       chemistry: 82,
//       english: 72,
//       computerScience: 60,
//     },
//   },
//   {
//     STUDENT_DETAILS: {
//       id: 103,
//       name: "Anuj Kumar",
//       parentName: "Ashok Kumar",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 60,
//       physics: 65,
//       chemistry: 92,
//       english: 77,
//       computerScience: 80,
//     },
//   },
// ];

// const Tables = () => {
//   const [apiData, setApiData] = useState<any>();
//   const [analysis, setAnalysis] = useState<any>([]);
//   const [competitorsArray, setCompetitorsArray] = useState<any>([]);
//   const [featuresArray, setFeaturesArray] = useState<any>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const file = "https://devapi.adaptintel.com/v1/competitive-matrix/45";
//       const resp: any = await fetch(file, {
//         headers: {
//           Authorization:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODQzNzg1MTAsImlhdCI6MTY4MTk1OTMxMCwid2ViIjp0cnVlfQ.PJ8oMAtXyKGTn-2VSBDRonwAWZTMKHnWwF_WgELfdgs",
//           // "Content-Type": "application/json",
//         },
//       })
//         .then((response) => {
//           console.log("resp", response);
//           return response.json();
//         })
//         .then((data: any) => {
//           //handle data
//           setApiData(data?.data);
//           setAnalysis(data?.data?.analysis?.analysisDetails);
//           setCompetitorsArray(data?.data?.competitors);
//           setFeaturesArray(data?.data?.features);
//           console.log(data);
//         });
//     }
//     fetchData();
//     // if(resp){
//     //   const jsonData: any = resp.json();
//     //   console.log("resp", jsonData);
//     // }
//   }, []);

//   console.log("apiData", apiData);

//   return (
//     <div style={{ padding: "30px" }}>
//       <ExcelExportHelper apiData={apiData} data={DATA} />
//       <h3>Student Details</h3>
//       <table className="table table-bordered">
//         <thead style={{ background: "yellow" }}>
//           <tr>
//             <th scope="col">Enrolment No.</th>
//             <th scope="col">Student Name</th>
//             <th scope="col">Parent Name</th>
//             <th scope="col">Class</th>
//             <th scope="col">Subject</th>
//             <th scope="col">Division</th>
//             <th scope="col">Result Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {DATA.map((studentsData: any) => (
//             <tr>
//               <td>
//                 <strong>{studentsData.STUDENT_DETAILS.id}</strong>{" "}
//               </td>
//               <td>{studentsData.STUDENT_DETAILS.name}</td>
//               <td>{studentsData.STUDENT_DETAILS.parentName}</td>
//               <td>{studentsData.STUDENT_DETAILS.classroom}</td>
//               <td>{studentsData.STUDENT_DETAILS.subject}</td>
//               <td>{studentsData.STUDENT_DETAILS.division}</td>
//               <td>
//                 <strong>{studentsData.STUDENT_DETAILS.status}</strong>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3>Marks</h3>
//       <table className="table table-bordered">
//         <thead style={{ background: "gray", color: "#fff" }}>
//           <tr>
//             <th scope="col">Enrolment No.</th>
//             <th scope="col">Student Name</th>
//             <th scope="col">Mathematics</th>
//             <th scope="col">Physics</th>
//             <th scope="col">Chemistry</th>
//             <th scope="col">English</th>
//             <th scope="col">Computer Science</th>
//             <th scope="col">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {DATA.map((studentsData: any) => (
//             <tr>
//               <td>
//                 <strong>{studentsData.STUDENT_DETAILS.id}</strong>
//               </td>
//               <td>{studentsData.STUDENT_DETAILS.name}</td>
//               <td>{studentsData.MARKS.maths}</td>
//               <td>{studentsData.MARKS.physics}</td>
//               <td>{studentsData.MARKS.chemistry}</td>
//               <td>{studentsData.MARKS.english}</td>
//               <td>{studentsData.MARKS.computerScience}</td>
//               <td>
//                 <strong>
//                   {" "}
//                   {studentsData.MARKS.maths +
//                     studentsData.MARKS.physics +
//                     studentsData.MARKS.chemistry +
//                     studentsData.MARKS.english +
//                     studentsData.MARKS.computerScience}
//                 </strong>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tables;

// import { useEffect ,useState} from "react";
// // import "./styles.css";
// import { saveAs } from "file-saver";
// import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

// export default function App() {
//   const [apiData, setApiData] = useState<any>();

//   function getSheetData(data:any, header:any) {
//     var fields = Object.keys(data[0]);
//     var sheetData = data.map(function (row:any) {
//       return fields.map(function (fieldName) {
//         return row[fieldName] ? row[fieldName] : "";
//       });
//     });
//     sheetData.unshift(header);
//     return sheetData;
//   }

//   console.log(apiData?.competitors);
//   // console.log(...apiData?.competitors);

//   async function saveAsExcel() {
//     var data = [
//       { name: "John", city: "Seattle" },
//       { name: "Mike", city: "Los Angeles" },
//       { name: "Zach", city: "New York" }
//     ];
//     let header = ["Name", "City"];
//     console.log("header",header);

//     XlsxPopulate.fromBlankAsync().then(async (workbook:any) => {
//       const sheet1 = workbook.sheet(0);
//       const sheetData = getSheetData(data, header);
//       const totalColumns = sheetData[0].length;

//       sheet1.cell("A1").value(sheetData);
//       const range = sheet1.usedRange();
//       const endColumn = String.fromCharCode(64 + totalColumns);
//       sheet1.row(1).style("bold", true);
//       sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
//       range.style("border", true);
//       return workbook.outputAsync().then((res:any) => {
//         saveAs(res, "file.xlsx");
//       });
//     });
//   }

//   useEffect(() => {
//     async function fetchData() {
//       const file = "https://devapi.adaptintel.com/v1/competitive-matrix/45";
//       const resp: any = await fetch(file, {
//         headers: {
//           Authorization:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODQzNzg1MTAsImlhdCI6MTY4MTk1OTMxMCwid2ViIjp0cnVlfQ.PJ8oMAtXyKGTn-2VSBDRonwAWZTMKHnWwF_WgELfdgs",
//           // "Content-Type": "application/json",
//         },
//       })
//         .then((response) => {
//           console.log("resp", response);
//           return response.json();
//         })
//         .then((data: any) => {
//           //handle data
//           setApiData(data?.data);
//           console.log(data);
//         });
//     }
//     fetchData();
//     // if(resp){
//     //   const jsonData: any = resp.json();
//     //   console.log("resp", jsonData);
//     // }
//   }, []);
//   return (
//     <button type="button" onClick={()=>saveAsExcel()}>
//       Download
//     </button>
//   );
// }

// import React, { useEffect, useState } from 'react'
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// const Tables = () => {

// // Create an array of data with column colors
// const data:any = [
//   ["Name", "Age", "Color"],
//   ["John", 25, { v: "Red", s: { fill: { bgColor: { rgb: "FF0000" } } } }],
//   ["Alice", 30, { v: "Green", s: { fill: { bgColor: { rgb: "00FF00" } } } }],
//   ["Bob", 40, { v: "Blue", s: { fill: { bgColor: { rgb: "0000FF" } } } }],
// ]; // Create a workbook
// const workbook:any = XLSX.utils.book_new();
//  const worksheet:any = XLSX.utils.aoa_to_sheet(data);
//  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   // Set column widths and colors
//   const columns:any = [ { wch: 15, s: { fill: { bgColor: { rgb: "FF0000" } } } },
//    { wch: 10, s: { fill: { bgColor: { rgb: "00FF00" } } } },
//     { wch: 15, s: { fill: { bgColor: { rgb: "0000FF" } } } } ];
//     worksheet["!cols"] = columns; // Export the file
//     const excelBuffer:any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob:any = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//     saveAs(blob, "data.xlsx");

//     const [apiData, setApiData] = useState<any>();

// useEffect(() => {
//   async function fetchData() {
//     const file = "https://devapi.adaptintel.com/v1/competitive-matrix/47";
//     const resp: any = await fetch(file, {
//       headers: {
//         Authorization:
//           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODQ0ODIyOTAsImlhdCI6MTY4MjA2MzA5MCwid2ViIjp0cnVlfQ.jJtxGn8gqUNKaHk5lfRr2Bj7GS_9Z68Gg2U_af_t2Rg",
//         // "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         console.log("resp", response);
//         return response.json();
//       })
//       .then((data: any) => {
//         //handle data
//         setApiData(data?.data);
//         // setAnalysis(data?.data?.analysis?.analysisDetails);
//         // setCompetitorsArray(data?.data?.competitors);
//         // setFeaturesArray(data?.data?.features);
//         console.log(data);
//       });
//   }
//   fetchData();
//   // if(resp){
//   //   const jsonData: any = resp.json();
//   //   console.log("resp", jsonData);
//   // }
// }, []);

//     console.log(apiData);

//   return (
//     <div>
//       <p>GG</p>
//     </div>
//   )
// }

// export default Tables

// import React from "react";

// import { saveAs } from "file-saver";

// import * as XLSX from "xlsx";

// import { writeFile } from "xlsx-style";

// // import logo from "./logo.svg";

// // import "./App.css";

// function App() {
//   const handleClick = () => {
//     // Create a new workbook

//     const wb = XLSX.utils.book_new();

//     // Define the sheet data

//     const sheetData = [
//       ["Name", "Age", "Color"],

//       [
//         "John",
//         32,
//         {
//           value: "Red",
//           style: {
//             fill: { type: "pattern", patternType: "solid", fgColor: "FF0000" },
//           },
//         },
//       ],

//       [
//         "Jane",
//         24,
//         {
//           value: "Green",
//           style: {
//             fill: { type: "pattern", patternType: "solid", fgColor: "00FF00" },
//           },
//         },
//       ],

//       [
//         "Bob",
//         44,
//         {
//           value: "Blue",
//           style: {
//             fill: { type: "pattern", patternType: "solid", fgColor: "0000FF" },
//           },
//         },
//       ],
//     ];

//     // Create a new worksheet and add the data

//     const ws = XLSX.utils.aoa_to_sheet(sheetData);

//     // Add the worksheet to the workbook

//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     // Add styles to the cells

//     const range = XLSX.utils.decode_range(ws["!ref"]);

//     for (let row = range.s.r; row <= range.e.r; row++) {
//       for (let col = range.s.c; col <= range.e.c; col++) {
//         const cell = XLSX.utils.encode_cell({ r: row, c: col });

//         if (ws[cell].style) {
//           writeFile(
//             wb,

//             {
//               SheetNames: ["Sheet1"],

//               Sheets: { Sheet1: ws },
//             },

//             (err, data) => {
//               if (err) {
//                 console.error(err);
//               } else {
//                 saveAs(new Blob([data]), "example.xlsx");
//               }
//             }
//           );
//         }
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />

//         <button onClick={handleClick}>Download Excel file</button>
//       </header>
//     </div>
//   );
// }

// export default App;

//CODESANDABOX

// import React from "react";

// import { saveAs } from "file-saver";

// const XlsxPopulate = require("xlsx-populate");

// function App() {
//   const handleClick = async () => {
//     // Create a new workbook

//     const workbook = await XlsxPopulate.fromBlankAsync();

//     // Get the first sheet

//     const sheet = workbook.sheet(0);

//     // Define the sheet data

//     const sheetData = [
//       ["Name", "Age", "Color"],

//       ["John", 32, "FF0000"],

//       ["Jane", 24, "00FF00"],

//       ["Bob", 44, "0000FF"]
//     ];

//     // Add the data to the sheet

//     sheet.range("A1:C4").value(sheetData);

//     // Set the cell colors

//     sheet.range("C2:C4").forEach((cell) => {
//       const color = cell.value();
//       console.log("color", color);

//       cell.style({
//         fill: { type: "solid", color: color }
//       });
//     });

//     // Generate the Excel file and save it

//     const buffer = await workbook.outputAsync();

//     saveAs(new Blob([buffer]), "example.xlsx");
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={lsogo} className="App-logo" alt="logo" /> */}

//         <button onClick={handleClick}>Download Excel file</button>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState, useRef } from "react";
// import { saveAs } from "file-saver";
// import style from "../components/table.module.scss";
// import { DownloadTableExcel } from "react-export-table-to-excel";

// //@ts-ignore
// import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
// import { Button } from "react-bootstrap";

// const Tables = () => {
//   const tableRef: any = useRef();
//   const [apiData, setApiData] = useState<any>();
//   const [analysis, setAnalysis] = useState<any>([]);
//   const [competitorsArray, setCompetitorsArray] = useState<any>([]);
//   const [featuresArray, setFeaturesArray] = useState<any>([]);
//   const handleClick = async () => {
//     // Create a new workbook

//     const workbook = await XlsxPopulate.fromBlankAsync();

//     // Get the first sheet

//     const sheet = workbook.sheet(0);

//     // Define the sheet data

//     // [apiData?.competitors, apiData?.features, "FF0000"],

//     const sheetData = [
//       ["KeyFeatures", [apiData?.competitors]],

//       [apiData?.features[0], apiData?.analysis?.analysisDetails[0]?.noteText],

//       [apiData?.features[1], 24],

//       [apiData?.features[2], 44],

//       [apiData?.features[4], 44],

//       [apiData?.features[5], 44],
//     ];

//     // Add the data to the sheet

//     console.log("sheetData", sheetData);

//     sheet?.range("A1:C4")?.value(sheetData);

//     // Set the cell colors

//     sheet.range("C2:C4").forEach((cell: any) => {
//       console.log("cell", cell);

//       const color = cell.value();
//       console.log(cell.value()?.split("#").pop());

//       console.log("color", color);

//       cell.style({
//         fill: { type: "solid", color: cell.value()?.split("#").pop() },
//       });
//     });

//     // Generate the Excel file and save it

//     const buffer: any = await workbook.outputAsync();

//     saveAs(new Blob([buffer]), "example.xlsx");
//   };

//   console.log(apiData);

//   useEffect(() => {
//     async function fetchData() {
//       const file = "https://devapi.adaptintel.com/v1/competitive-matrix/90";
//       const resp: any = await fetch(file, {
//         headers: {
//           Authorization:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODQ0OTI5OTgsImlhdCI6MTY4MjA3Mzc5OCwid2ViIjp0cnVlfQ.Uiw4g5JCksjNNIJYfMSzZp2e5uzJ_yLdIgstP-4ZIE0",
//         },
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data: any) => {
//           setAnalysis(data?.data?.analysis?.analysisDetails);
//           setCompetitorsArray(data?.data?.competitors);
//           setFeaturesArray(data?.data?.features);
//           setApiData(data?.data);
//         });
//     }
//     fetchData();
//   }, []);

//   console.log(competitorsArray);
//   console.log("tableRef", tableRef);
//   console.log("tableRef", tableRef?.current?.innerHTML);

//   setTimeout(() => {
//     async function fetchData() {
//       const file = "https://devapi.adaptintel.com/v1/competitive-matrix/91";
//       const resp: any = await fetch(file, {
//         headers: {
//           Authorization:
//             "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODQ3MzA4MjUsImlhdCI6MTY4MjMxMTYyNSwid2ViIjp0cnVlfQ.5LxIf9IV97WOKUS6zXmxCk1YLH9Nj-OWaqqZmRVQv9s",
//         },
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data: any) => {
//           setAnalysis(data?.data?.analysis?.analysisDetails);
//           setCompetitorsArray(data?.data?.competitors);
//           setFeaturesArray(data?.data?.features);
//           setApiData(data?.data);
//         });
//     }
//     fetchData();
//   }, 1000);

//   return (
//     <>
//       {apiData === undefined ? (
//         <></>
//       ) : (
//         <div
//           // style={{marginTop: "300px" }}
//           // id="competitiveMatrixBox"

//           className={` ${style.contextContainer}`}
//         >
//           <DownloadTableExcel
//             filename="users table"
//             sheet="users"
//             currentTableRef={tableRef?.current}
//           >
//             <button> Export excel </button>
//           </DownloadTableExcel>
//           <p className={style.rcmHeading}>RCM Analysis</p>
//           <table
//             // id="TableToExport"
//             style={{ border: "1px solid #000" }}
//             className={style.matrixTable}
//             ref={tableRef}
//           >
//             <thead style={{ backgroundColor: "#fff" }}>
//               <tr>
//                 <th style={{ borderRight: "1px solid black" }}>Key Features</th>
//                 {competitorsArray?.map((item: any, index: number) => {
//                   return (
//                     <th
//                       style={{
//                         borderRight: "1px solid black",
//                         letterSpacing: "1px",
//                       }}
//                       key={index}
//                     >
//                       {item}
//                     </th>
//                   );
//                 })}
//               </tr>
//             </thead>
//             <tbody className={style.tbody} style={{ backgroundColor: "#fff" }}>
//               {featuresArray?.map((item: any, featuresIndex: number) => {
//                 return (
//                   <tr key={featuresIndex}>
//                     <td
//                       style={{
//                         letterSpacing: "1px",
//                         border: "1px solid black",
//                       }}
//                       className={style.featuresTdBox}
//                     >
//                       {item}
//                     </td>
//                     {competitorsArray?.map(
//                       (item: any, competitorsIndex: number) => {
//                         const bgColor =
//                           analysis?.filter(
//                             (data: any) =>
//                               data.index ===
//                               `${competitorsIndex} ${featuresIndex}`
//                           )[0]?.chosen || "white";

//                         return (
//                           <>
//                             <td
//                               style={{
//                                 position: "relative",
//                                 border: "1px solid black",
//                                 // backgroundColor: "red",
//                                 backgroundColor: bgColor,
//                               }}
//                               // color="red"
//                               key={competitorsIndex}
//                             >
//                               {analysis?.map((item: any, index: number) => {
//                                 if (
//                                   item?.index ===
//                                   `${competitorsIndex} ${featuresIndex}`
//                                 ) {
//                                   return (
//                                     <>
//                                       {/* <p
//                                         key={index}
//                                         style={{ backgroundColor: "orange" }}
//                                       > */}
//                                       {item?.noteText}
//                                       {/* </p> */}
//                                     </>
//                                   );
//                                 }
//                               })}
//                             </td>
//                           </>
//                         );
//                       }
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <div
//             style={{ width: "100%", marginTop: "20px" }}
//             className={style.bottomColorContainer}
//           >
//             <button onClick={handleClick}>Download Excel file</button>
//             <div className={style.bottomColorBox}>
//               <p>LEADING</p>
//               <div className={style.colorBoxBottomFirst}></div>
//             </div>
//             <div className={style.bottomColorBox}>
//               <p>ON PAR</p>
//               <div className={style.colorBoxBottomSecond}></div>
//             </div>
//             <div className={style.bottomColorBox}>
//               <p>LAGGING</p>
//               <div className={style.colorBoxBottomThird}></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//     // <div className="App">
//     //   <header className="App-header">
//     //     {/* <img src={lsogo} className="App-logo" alt="logo" /> */}

//     //     <button onClick={() => handleClick()}>Download Excel file</button>
//     //   </header>
//     // </div>
//   );
// };

// export default Tables;

import React, { useEffect, useRef, useState } from "react";
import style from "../components/table.module.scss";
import { Button } from "react-bootstrap";
import DocViewer from "react-doc-viewer";
// import HTMLtoDOCX from "html-to-docx";
import { asBlob } from "html-docx-js-typescript";
// import HtmlDocx from "html-docx-js/dist/html-docx";
import moment from "moment";
// import { renderAsyncDocument } from "react-docx";
import { saveAs } from "file-saver";

const Tables = () => {
  const [battleData, setBattleData] = useState<any>("");
  const contentRef: any = useRef<any>(null);
  useEffect(() => {
    async function fetchData() {
      const file:any = "https://devapi.adaptintel.com/v1/battlecards/38";
      const resp: any = await fetch(file, {
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjExLCJleHAiOjE2ODYxMTEyMDIsImlhdCI6MTY4MzY5MjAwMiwid2ViIjp0cnVlfQ.YHF18jAXMlnEkndCB88Gpjk-H9ROu4y1XQYTeK8Hd_c",
        },
      })
        .then((response:any) => {
          return response.json();
        })
        .then((data: any) => {
          setBattleData(data?.data);
        });
    }
    fetchData();
  }, []);


  
  const content:any = `<div>
  <span style="color: red">
      This is to inform you that our Cyber Incident Response Team identified an incident that may affect your day-to-day activities, as well as assets or systems you’re working with. We are currently investigating the incident and will update you on the progress as needed. Details of the incident are as follows:
  </span>`

  const handleDownloadDocs = async () => {
    asBlob(contentRef?.current?.innerHTML).then((data:any) => {
      saveAs(data, "file.docx");
      console.log(data);
    });
    // const data: any = HTMLtoDOCX(content);
    // console.log("data", data);
    // saveAs(data, "hello.docx");
    // Docx?.Packer.toBlob(data).then((blob:any) => saveAs(blob, "example.docx"));
  };

  // console.log(contentRef?.current);
  // console.log(contentRef);

  return (
    <>
        <button onClick={handleDownloadDocs}>DOC</button>
      <div ref={contentRef}>
        <h2>Battlecards : {battleData?.name}</h2>
        {battleData?.body?.map((item: any, index: number) => {
          console.log("item", item);
          return (
            <>
              <div
                key={index}
                style={{
                  border: "1px solid black",
                  marginBottom: "20px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h4 style={{ margin: "0" }}>{item?.name}</h4>
                <p
                  style={{ margin: "0" }}
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tables;
