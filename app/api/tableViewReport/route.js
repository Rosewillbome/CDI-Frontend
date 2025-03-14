import { join } from "path";
import { readFileSync } from "fs";
import createReport from "docx-templates";
import XlsxTemplate from "xlsx-template";

export async function POST(req) {
  try {
    // Parse the request body to get the report type and data
    const { reportType, reportData } = await req.json();

  // console.log("reportData",reportData)

    let buffer;
    if (reportType === "docx") {
      // Define the path to your DOCX template
      const templatePath = join(process.cwd(), "public", "report.docx");

      // Read the DOCX template file into a buffer
      const template = readFileSync(templatePath);

      // Generate the DOCX report using docx-templates
      buffer = await createReport({
        template,
        data: reportData,
        cmdDelimiter: "+++",
      });

      // Set headers for DOCX file
      return new Response(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": "attachment; filename=report.docx",
        },
      });
    } else if (reportType === "xlsx") {
      function transformData(data) {
        const reportData = {
          tableView: data.map(row => ({
            district: row[0], // First element is the name
            currentCdi: row[1], // Second element is value1
            monthOrYear: row[2], // Third element is date1
            prevCdi: row[3], // Fourth element is value2
            prevmonthOrYear: row[4], // Fifth element is date2
            devationFromPrevious: row[5], // Sixth element is the difference
            devationFromLongTermMean: row[6], // Seventh element is the percentage
            status: row[7], // Eighth element is the status
          })),
        };
    
        return reportData;
      }
      console.log("refined data",transformData(reportData?.tableView))
      // Define the path to your Excel template
      const templatePath = join(process.cwd(), "public", "tableView.xlsx");

      // Read the XLSX template file into a buffer
      const data = readFileSync(templatePath);

      // Create an Excel template
      const template = new XlsxTemplate(data);

      // Replacements take place on the first sheet
      const sheetNumber = 1;

      // Perform substitution with provided data
      template.substitute(sheetNumber, transformData(reportData?.tableView));

      // Get binary data for the generated Excel file
      buffer = template.generate({ type: "nodebuffer" });

      // Set headers for XLSX file
      return new Response(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": "attachment; filename=report.xlsx",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid report type" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("Error generating the document:", error);
    return new Response(
      JSON.stringify({ error: "Error generating the document" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
