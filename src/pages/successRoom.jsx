import Box from "@mui/material/Box";
import successMakeRoom from "../assets/successMakeRoom.png";
import CommonButton from "../common/commonButton";
import CopyToClipboard from "react-copy-to-clipboard";

function SuccessRoom() {
  const welcomeCode = "abcde67890123456";

  return (
    <>
      <div>방이 생성 되었습니다.</div>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Success Make Room!"
        src={successMakeRoom}
      ></Box>

      <div>
        <CopyToClipboard
          text={welcomeCode}
          onCopy={() => alert("주소가 복사되었습니다")}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 80,
              width: "90%",
              margin: "20px",
              borderRadius: 15,
              backgroundColor: "#F6F7FA",
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
          >
            <Box sx={{ textDecoration: "underline" }}>{welcomeCode}</Box>
            <div className="URL">
              <CommonButton text="복사" className="URL"></CommonButton>
            </div>
          </Box>
        </CopyToClipboard>
      </div>

      <CommonButton text="확인"></CommonButton>
    </>
  );
}

export default SuccessRoom;
