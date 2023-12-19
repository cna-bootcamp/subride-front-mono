import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function BackHeader(props) {
  const navigate = useNavigate();
  const pagebackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "50px",
          fontSize: 20,
          fontWeight: 700,
          alignItems: "center",
        }}
      >
        <ArrowBackIosIcon onClick={pagebackClick}></ArrowBackIosIcon>
        <div>{props.text}</div>
      </Box>
    </>
  );
}

export default BackHeader;
