import React, { useState } from "react";
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

function StaticModal({ data, endYear, startYear, selectedIndicator }) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="flex items-center justify-center">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-[#308DE0] focus:border-[#308DE0] transition-colors"
        >
          <option className="">download</option>
          <option value="selected_option" className="">
            filtered option
          </option>
          <option value="all_data" className="">
            all data
          </option>
        </select>
        <FileText className="h-5 w-5 text-[#308DE0] ml-2" onClick={handleOpen} />
        <div className="absolute inset-0 bg-[#308DE0] opacity-20 blur-lg rounded-full"></div>
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
