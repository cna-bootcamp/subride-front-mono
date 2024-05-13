import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import comeGroupImg from "../assets/comeGroup.png";
import CommonButton from "../common/commonButton";
import api from "../utils/apiInstance";
import BackHeader from "../common/backHeader";

const ImgAndTextContainer = styled.div`
  margin: 100px 40px 20px 30px;
  display: flex;
  flex-direction: column;
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
    margin: 40px auto;
  }
`;

const PasswordContainer = styled.div`
  margin: 20px 30px;
  display: flex;
  flex-direction: column;
  .password-text {
    font-size: 17px;
    margin-bottom: 10px;
  }
  .input-box {
    margin-bottom: 10px;
    width: 100%;
    font-size: 20px;
    color: #999999;
    border: none;
    border-bottom: solid 2px #f2dc14;
    outline: none;
  }
`;

function ComeGroup() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const passwordInputRef = useRef(null);

  useEffect(() => {
    passwordInputRef.current.focus();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (alertMessage === "가입 되었습니다.") {
      navigate("/");
    } else {
      setTimeout(() => {
        passwordInputRef.current.focus(); // 초대코드 필드에 포커스 설정
      }, 0);
    }
  };

  const handleJoinGroup = () => {
    const userData = JSON.parse(window.sessionStorage.getItem("user"));
    const password = document.getElementById("비밀번호").value;
    const ps = document.getElementById("비밀번호");

    if (!password) {
      setAlertMessage("초대코드를 입력하세요");
      handleClickOpen();
      return;
    }

    const lastData = { id: userData.id, invitationCode: password };

    api
      .post("/group/join", lastData)
      .then(() => {
        setAlertMessage("가입 되었습니다.");
        handleClickOpen();
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        handleClickOpen();
        ps.value = null;
        console.log(error);
      });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertMessage}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <BackHeader text="그룹 참가하기" />
      <ImgAndTextContainer>
        <div className="welcome-text">환영합니다</div>
        <div className="detail-text">초대코드를 입력하고,</div>
        <div className="detail-text">새로운 썹을 타보세요</div>
        <img src={comeGroupImg} alt="곰돌이" />
      </ImgAndTextContainer>
      <PasswordContainer>
        <div className="password-text">초대코드</div>
        <input 
          className="input-box" 
          id="비밀번호" 
          ref={passwordInputRef}  
        />
        <CommonButton text="확인" handleClick={handleJoinGroup} />
      </PasswordContainer>
    </>
  );
}

export default ComeGroup;