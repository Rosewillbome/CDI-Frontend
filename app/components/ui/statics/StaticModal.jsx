import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { FileText } from "lucide-react";
import DownloadStaticFiles from "./DownloadStaticFiles";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "90%",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function StaticModal({data,endYear,startYear}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center bg-[#308DE0] text-white  py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative"
      >
        <span className="px-2">Download Report</span>
        <FileText className="h-5 w-5 text-white" />
        <div className="absolute inset-0 bg-[#308DE0] opacity-20 blur-lg rounded-full"></div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DownloadStaticFiles data={data} startYear={startYear} endYear={endYear}/>
        </Box>
      </Modal>
    </>
  );
}

export default StaticModal;
