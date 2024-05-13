import { Modal, Paper } from "@mui/material";

function CustomModal({ isOpen, closeModal, children }) {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          width: "100%",
          borderRadius: "0",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}

export default CustomModal;
