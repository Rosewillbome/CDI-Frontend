import { NextResponse } from "next/server";
import PdfPrinter from "pdfmake";
import axios from "axios";
import https from "https";
import path from "path";
import fs from "fs";

// Helper function to safely get images
async function getImageSafely(url) {
  console.log("Fetching image from:", url);
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (e) {
    if (e.code === "CERT_NOT_YET_VALID") {
      console.log("Falling back to insecure connection for development");
      const insecureAgent = new https.Agent({ rejectUnauthorized: false });
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        httpsAgent: insecureAgent,
      });
      return Buffer.from(response.data, "binary").toString("base64");
    }
    throw e;
  }
}

export async function GET(request) {
  try {
    // Font configuration with fallback
    const fontDefinitions = {
      Roboto: {
        normal: path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf"),
        bold: path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf"),
        italics: path.join(process.cwd(), "public/fonts/Roboto-Italic.ttf"),
        bolditalics: path.join(
          process.cwd(),
          "public/fonts/Roboto-BoldItalic.ttf"
        ),
      },
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    // Safe font loader
    const getActiveFonts = () => {
      try {
        fs.accessSync(fontDefinitions.Roboto.normal);
        return {
          fonts: { Roboto: fontDefinitions.Roboto },
          defaultFont: "Roboto",
        };
      } catch (e) {
        return {
          fonts: { Helvetica: fontDefinitions.Helvetica },
          defaultFont: "Helvetica",
        };
      }
    };

    const { fonts, defaultFont } = getActiveFonts();
    const printer = new PdfPrinter(fonts);

    const imageBase64 = await getImageSafely(
      `${process.env.NEXT_PUBLIC_API}/uploaded/uploads/images/CDI/Raw_CDI_january_2022_map.jpg`
    );

    const docDefinition = {
      content: [
        {
          image: `data:image/jpeg;base64,${imageBase64}`,
          width: 100,
          absolutePosition: { x: 320, y: 15 },
        },
        {
          text: "Fit",
          absolutePosition: { x: 320, y: 0 },
        },
      ],
      defaultStyle: {
        font: defaultFont,
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Create a stream to collect the PDF
    const chunks = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.end();

    // Wait for the PDF to finish generating
    await new Promise((resolve) => pdfDoc.on("end", resolve));

    // Convert chunks to a buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Return the PDF as a response
    console.log("PDF generated successfully");
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="report.pdf"',
      }),
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "PDF generation failed", details: err.message },
      { status: 500 }
    );
  }
}
