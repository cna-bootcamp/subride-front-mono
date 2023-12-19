import Box from "@mui/material/Box";
import comeGroupImg from "../assets/comeGroup.png";
import CommonButton from "../common/commonButton";

import styled from "@emotion/styled";

function comeGroup() {
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

  return (
    <>
      <ImgAndTextContainer>
        <div className="welcome-text">방이 생성 됐어요</div>
        <div className="detail-text">승규님의 </div>
        <div className="detail-text">NEFLEX 방에 초대됐습니다</div>

        <img src={comeGroupImg} alt="곰돌이" />
      </ImgAndTextContainer>

      <PasswordConatiner>
        <div className="password-text">비밀번호</div>

        <input className="input-box"></input>

        <CommonButton text="확인"></CommonButton>
      </PasswordConatiner>
    </>
  );
}

export default comeGroup;
