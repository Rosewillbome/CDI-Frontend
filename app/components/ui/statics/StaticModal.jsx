import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { Menu } from "@headlessui/react";
import { FileText, X } from "lucide-react";
import { Download, Loader } from "lucide-react";
import { IconButton } from "@mui/material";
import axios from "axios";
import { refactorStaticMapData } from "../../../utils/selectYear";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "20%",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "hidden",
  overflowX: "hidden",
};

function StaticModal({ data, endYear, startYear, selectedIndicator }) {
  const [open, setOpen] = React.useState(false);
  // const [downloadOption, setDownloadOption] = useState("filtered");
  const [selectedOption, setSelectedOption] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = (e, slctd) => {
    e.preventDefault();
    setSelectedOption(slctd);
    setOpen(true);
  };

  const { yrs, groupedData } = refactorStaticMapData(
    data,
    startYear,
    endYear,
    selectedOption
  );
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/pdfs",
        {
          years: yrs,
          groupedData: data,
          selectedIndicator: selectedIndicator,
        },
        {
          responseType: "blob", // Important for receiving binary data
        }
      );
      setDownloading(false);
      handleClose();
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "drought_monitoring_report.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading PDF:", error.message);
      // Add user feedback here (e.g., toast notification)
    } finally {
      setDownloading(false);
      handleClose();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Menu as="div" className={`relative`}>
          <Menu.Button className="p-0 rounded-lg text-blue-500 hover:bg-gray-100">
            {/* <FiDownload size={24} /> */}
            <div className="flex items-center gap-2 p-2 bg-[#308DE0] text-white rounded-lg">
              <Download size={18} /> <span>Download Report</span>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 m-2 w-40 bg-white border rounded-lg shadow-lg z-50">
            <Menu.Item className="mb-1">
              {({ active }) => (
                <button
                  onClick={(e) => handleOpenModal(e, "selected_option")}
                  className={`w-full text-left m-1 text-sm ${
                    active ? "bg-gray-200" : ""
                  }`}
                >
                  Current Selection
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => handleOpenModal(e, "all_data")}
                  className={`w-full text-left m-1 text-sm ${
                    active ? "bg-gray-200" : ""
                  }`}
                >
                  All Maps
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {downloading ? (
            <div className=" w-full flex items-center justify-center">
              <CircularProgress />
              <p className="ml-2">{`Please Wait as we prepare ${
                selectedIndicator?.trim()?.toLowerCase() === "vdi"
                  ? "NDVI Anomaly"
                  : selectedIndicator
              } Report for (${
                yrs?.length === 1
                  ? `${yrs[0]}`
                  : `${yrs[0]}-${yrs[yrs?.length - 1]}`
              })`}</p>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 p-2 bg-[#308DE0] text-white rounded-lg"
              onClick={handleDownload}
            >
              <Download size={18} /> <span>Download the selected option</span>
            </button>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default StaticModal;
