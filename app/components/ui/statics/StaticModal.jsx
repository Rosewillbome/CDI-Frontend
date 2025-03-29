import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  const [downloadOption, setDownloadOption] = useState("filtered");
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

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
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <X className="text-red-600" size={20} />
          </IconButton>
          <DownloadStaticFiles
            data={data}
            startYear={startYear}
            endYear={endYear}
            selectedIndicator={selectedIndicator}
            selectedOption={downloadOption === "filtered" ? "selected_option" : "all_data"}
          />
        </Box>
      </Modal>
    </>
  );
}

export default StaticModal;