import comeGroupImg from "../assets/comeGroup.png";
import CommonButton from "../common/commonButton";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import api from "../utils/apiInstance";
import BackHeader from "../common/backHeader";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ImgAndTextContainer = styled.div`
  margin: 100px 30px 20px 30px;

  display: flex-column;

  .welcome-text {
    font-size: 30px;
    color: #f2dc14;
    margin-bottom: 10px;
  }
  .detail-text {
    margin-bottom: 4px;
    font-size: 20px;
    color: #999999;
  }

  img {
    display: block;
    margin: 40px auto 40px auto;
  }
`;

const PasswordConatiner = styled.div`
  margin: 20px 30px 20px 30px;
  display: flex-column;

  .password-text {
    font-size: 17px;
    margin-bottom: 10px;
  }

  .input-box {
    margin-bottom: 10px;
    width: 100%;
    font-size: 20px;
    color: #999999;
    border-right: 0px;
    border-top: 0px;
    border-left: 0px;
    border-bottom: solid 2px;
    border-color: #f2dc14;
    outline: none;
  }
`;

var userData = JSON.parse(window.sessionStorage.getItem("user"));

function ComeGroup() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  function jiminClick() {
    var password = document.getElementById("비밀번호").value;

    var ps = document.getElementById("비밀번호");

    const lastData = {
      id: userData.id,
      invitationCode: password,
    };
    console.log(lastData);

    api
      .post("/group/join", lastData)
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        handleClickOpen();
        ps.value = null;
        console.log(error);
      });
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이미 그룹방에 참여했습니다."}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <BackHeader text="그룹 참가하기"></BackHeader>
      <ImgAndTextContainer>
        <div className="welcome-text">환영합니다</div>
        <div className="detail-text">초대코드를 입력하고,</div>
        <div className="detail-text">새로운 썹을 타보세요</div>

        <img src={comeGroupImg} alt="곰돌이" />
      </ImgAndTextContainer>
      <PasswordConatiner>
        <div className="password-text">초대코드</div>

        <input className="input-box" id="비밀번호"></input>

        <CommonButton
          text="확인"
          handleClick={() => jiminClick()}
        ></CommonButton>
      </PasswordConatiner>
    </>
  );
}

export default ComeGroup;
