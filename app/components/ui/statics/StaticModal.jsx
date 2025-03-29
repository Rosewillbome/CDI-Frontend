import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Menu } from "@headlessui/react";
import { FileText } from "lucide-react";
import { Download, Loader } from "lucide-react";
import DownloadStaticFiles from "./DownloadStaticFiles";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90%",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  overflowX: "scroll",
};

function StaticModal({ data, endYear, startYear, selectedIndicator }) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = (e, slctd) => {
    e.preventDefault();
    setSelectedOption(slctd);
    setOpen(true);
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
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => handleOpenModal(e, "selected_option")}
                  className={`w-full text-left px-1 text-sm ${
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
                  className={`w-full text-left px-1 text-sm ${
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
          <DownloadStaticFiles
            data={data}
            startYear={startYear}
            endYear={endYear}
            selectedIndicator={selectedIndicator}
            selectedOption={selectedOption}
          />
        </Box>
      </Modal>
    </>
  );
}

export default StaticModal;
