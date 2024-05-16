import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import successMakeRoom from "assets/successMakeRoom.png";
import CommonButton from "components/CommonButton";

const SuccessRoom = () => {
  const { state } = useLocation();
  const welcomeCode = state ? state.invitationCode : null;
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "100px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "26px",
            color: "#999999",
            mb: "40px",
          }}
        >
          썹이 만들어 졌어요!
        </Box>
        <Box
          component="img"
          sx={{
            height: 200,
            mb: "50px",
          }}
          alt="Success Make Room!"
          src={successMakeRoom}
        />
      </Box>

      <Box sx={{ mx: "10px", fontSize: "20px", mb: "10px" }}>초대 코드</Box>
      <CopyToClipboard
        text={welcomeCode}
        onCopy={() => alert("주소가 복사되었습니다")}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
            mx: "10px",
            mb: "50px",
            borderRadius: 5,
            backgroundColor: "#F6F7FA",
            px: 3,
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "#AE9C76",
              fontSize: "20px",
              color: "#767676",
            }}
          >
            {welcomeCode}
          </Box>
          <Button
            sx={{
              backgroundColor: "#F8A809",
              color: "#000000",
              borderRadius: 5,
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#F8A809",
                boxShadow: "none",
              },
            }}
            variant="contained"
          >
            복사
          </Button>
        </Box>
      </CopyToClipboard>

      <CommonButton text="확인" handleClick={() => navigate("/")} />
    </>
  );
};

export default SuccessRoom;