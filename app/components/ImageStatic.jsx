"use cliet";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { filter_static_data } from "../utils/selectYear";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ImageStatic({ Data, month, year }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 h-full">
        <img
          src={`${process.env.NEXT_PUBLIC_API}uploaded${
            filter_static_data(Data, month, year)[0]?.[5]
          }`}
          alt={`${filter_static_data(Data, month, year)[0]?.[2]}`}
          className="static_image"
          onClick={handleOpen}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img
              src={`${process.env.NEXT_PUBLIC_API}uploaded${
                filter_static_data(Data, month, year)[0]?.[5]
              }`}
              alt={`${filter_static_data(Data, month, year)[0]?.[3]}`}
              className="static_image"
              onClick={handleOpen}
            />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ImageStatic;
