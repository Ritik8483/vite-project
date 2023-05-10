import React from "react";
import * as XLSX from "xlsx";
import XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
// import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelper = ({ data, apiData }: any) => {
  console.log("ExcelExportHelper", data);

  const createDownLoadData = () => {
    handleExport().then((url: any) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook: any) => {
    const wopts: any = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout: any = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s: any) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: "Students and Marks details" }, {}];
    const titleMatrix = [{ A: "RCM ANALYSIS" }, {}];

    // console.log([...apiData?.competitors]);

    let table1: any = [
      {
        A: "Enrolment No.",
        B: "Student Name",
        C: "Parent Name",
        D: "Class",
        E: "Subject",
        F: "Division",
        G: "Result Status",
      },
    ];

    console.log("table1", table1);
    let COMPETITORS = apiData?.competitors?.map((item: any) => item);
    console.log("COMPETITORS", COMPETITORS);

    // let tableMatrixTable: any = [
    //   {
    //     A: "Key Features",
    //     B: COMPETITORS[0],
    //     C: COMPETITORS[1],
    //     D: COMPETITORS[2],
    //     E: COMPETITORS[3],
    //     F: COMPETITORS[4],
    //     G: COMPETITORS[5],
    //     H: COMPETITORS[6],
    //     I: COMPETITORS[7],
    //     J: COMPETITORS[8],
    //     K: COMPETITORS[9],
    //     L: COMPETITORS[10],
    //     M: COMPETITORS[11],
    //     // B: apiData?.features?.forEach((item: any) => item),
    //     // B: apiData?.competitors[0],
    //     // C: apiData?.competitors[1],
    //   },
    // ];

    // console.log("tableMatrixTable", tableMatrixTable);

    // let table2 = [
    //   {
    //     A: "Enrolment No.",
    //     B: "Student Name",
    //     C: "Mathematics",
    //     D: "Physics",
    //     E: "Chemistry",
    //     F: "English",
    //     G: "Computer Science",
    //     H: "Total",
    //   },
    // ];

    data.forEach((row: any) => {
      const studentDetails = row.STUDENT_DETAILS;
      table1.push({
        A: studentDetails.id,
        B: studentDetails.name,
        C: studentDetails.parentName,
        D: studentDetails.classroom,
        E: studentDetails.subject,
        F: studentDetails.division,
        G: studentDetails.status,
      });
    });

    apiData?.features?.forEach((row: any, index: number) => {
      console.log("apiDataROW", row);

      const studentDetails = row.STUDENT_DETAILS;
      const marksDetails = row.MARKS;

      const noteText: any = apiData?.analysis?.analysisDetails?.map(
        (item: any) => {
          console.log("item", item);
          return item.noteText;
        }
      );

      console.log("noteText", noteText);

      tableMatrixTable.push({
        A: row,
        B: noteText[index],
      });
    });

    // table1 = [{ A: "Key Features" }].concat(table1)
    //   .concat([" "])
    // .concat([{ A: "Marks" }])
    // .concat(table2);

    // const finalData = [...titleMatrix, ...tableMatrixTable];
    const finalData = [...title, ...table1];

    console.log("finalData", finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "student_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes: any = [];
    finalData.forEach((data, index) =>
      data["A"] === "Enrolment No." ? headerIndexes.push(index) : null
    );

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:H2",
      tbodyRange: `A3:H${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
          : null,
      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
          : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  //   const XlsxPopulate = require('xlsx-populate')

  const addStyle: any = async (workbookBlob: any, dataInfo: any) => {
    console.log("dataInfo", dataInfo);

    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook: any) => {
      workbook.sheets().forEach((sheet: any) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        sheet.column("A").width(15);
        sheet.column("B").width(15);
        sheet.column("C").width(15);
        sheet.column("E").width(15);
        sheet.column("G").width(15);

        // sheet.range(dataInfo.titleRange).merged(true).style({
        //   bold: true,
        //   horizontalAlignment: "center",
        //   verticalAlignment: "center",
        // });
        console.log("dataInfo.tbodyRange", dataInfo.tbodyRange);

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            fill: "FF0000",
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          bold: true,
          horizontalAlignment: "center",
        });

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            // fill: "FF0000",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }

        // if (dataInfo.tFirstColumnRange1) {
        //   sheet.range(dataInfo.tFirstColumnRange1).style({
        //     bold: true,
        //   });
        // }

        // if (dataInfo.tLastColumnRange1) {
        //   sheet.range(dataInfo.tLastColumnRange1).style({
        //     bold: true,
        //   });
        // }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob: any) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={createDownLoadData}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;
