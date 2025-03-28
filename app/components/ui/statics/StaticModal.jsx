import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { Download, ChevronDown, X } from "lucide-react"; 
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadClick = (option) => {
    setDownloadOption(option);
    handleMenuClose();
    handleOpen();
  };

  return (
    <>
      <div className="flex items-center w-full gap-2">
        <div>
          <Button
            variant="contained"
            startIcon={<Download size={16} />}
            endIcon={<ChevronDown size={16} />}
            onClick={handleMenuClick}
            sx={{
              backgroundColor: "#308DE0",
              "&:hover": { backgroundColor: "#2a7ec9" },
              py: 1.5,
              minWidth: "200px",
              whiteSpace: "nowrap",
            }}
          >
            Download Data
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleDownloadClick("filtered")}>
              Download Filtered Data
            </MenuItem>
            <MenuItem onClick={() => handleDownloadClick("all")}>
              Download All Data
            </MenuItem>
          </Menu>
        </div>

      
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