import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
  width: "100%",
  height: "60px",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  margin: "25px",
  backgroundColor: "#F2DC14",
  color: "#000000",
  borderRadius: 15,
  "&:hover": {
    backgroundColor: "#F2DC14",
    boxShadow: "none",
  },
});

function CommonButton(props) {
  return (
    <>
      <BootstrapButton variant="contained">{props.text}</BootstrapButton>
    </>
  );
}

export default CommonButton;
