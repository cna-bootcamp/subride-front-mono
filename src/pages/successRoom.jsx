import Box from "@mui/material/Box";
import successMakeRoom from "../assets/successMakeRoom.png";
import CommonButton from "../common/commonButton";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "@mui/material/Button";

function SuccessRoom() {
  const welcomeCode = "abcde67890123456";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center", fontSize: "26px" }}>
          방이 생성 됐어요
        </Box>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
          }}
          alt="Success Make Room!"
          src={successMakeRoom}
        ></Box>
      </Box>

      <div>초대 코드</div>

      <div>
        <CopyToClipboard
          text={welcomeCode}
          onCopy={() => alert("주소가 복사되었습니다")}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              // width: "90%",
              // margin: "20px",
              borderRadius: 5,
              backgroundColor: "#F6F7FA",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                mr: 3,
                borderBottom: 1,
                borderColor: "#AE9C76",
                fontSize: "20px",
                color: "#767676",
              }}
            >
              {welcomeCode}
            </Box>

            <div className="URL">
              <Button
                sx={{
                  // width: "70px",
                  height: "50px",
                  backgroundColor: "#F2DC14",
                  color: "#000000",
                  borderRadius: 5,
                  fontSize: "18px",
                }}
                variant="contained"
                className="URL"
              >
                복사
              </Button>
            </div>
          </Box>
        </CopyToClipboard>
      </div>

      <CommonButton
        // sx={{ position: "absolute", bottom: "0px" }}
        text="확인"
      ></CommonButton>
    </>
  );
}

export default SuccessRoom;
