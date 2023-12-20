import styled from "@emotion/styled";
import BackHeader from "../common/backHeader";
import logoImg from "../assets/logo1.png";
import character1Img from "../assets/character1.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

function groupDetail() {
  const ImgContainer = styled.div`
    width: 100dvw;
    height: 336px;
    background-color: #eeeeee;
    position: absolute;
    left: 0px;
    padding: 30px;

    .servicelogoImg {
      width: 100px;
      height: 100px;
      display: block;
      margin: 2px auto 2px auto;
      position: absolute;
      bottom: 30px;
      top: 22px;
    }

    .informContainer {
      margin-top: 70px;
      background-color: #f6f6f6;
      width: 323px;
      height: 95px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .characerNameImgContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .characterImgContainter {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
    }

    .characterImg {
      width: 73px;
      hegith: 73px;
      display: block;
      margin: 2px auto 2px auto;
    }

    .characterName {
      margin-top: 5px;
      color: #6f6a6a;
      font-size: 12px;
    }

    .characterName {
      margin-top: 5px;
      color: #6f6a6a;
      font-size: 12px;
    }
  `;

  const PaymentDetailSearchCotaienr = styled.div`
    position: absolute;
    top: 406px;
    left: 0px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: solid #eeeeee;
    .searchText {
      display: flex;
    }
    .searchTextD {
      margin-left: 9px;
      font-size: 12px;
      color: #767676;
    }
  `;

  const PaymentDetailCotaienr = styled.div`
    position: absolute;
    top: 447.5px;
    left: 0px;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
    border-bottom: solid #eeeeee;

    .firstClass {
      display: flex;
      align-items: center;
    }

    .item {
      margin: 0px 10px;
      font-family: "KBFGTextM";
    }
  `;

  return (
    <>
      <BackHeader text="그룹1"></BackHeader>
      <ImgContainer>
        <div>
          <div className="informContainer">
            <img className="servicelogoImg" src={logoImg} alt="로고1"></img>
            <div
              style={{
                marginTop: "20px",
                fontSize: "15px",
                fontFamily: "KBFGTextM",
              }}
            >
              넷플릭스
            </div>
            <div
              style={{
                marginTop: "3px",
                fontSize: "17px",
                fontFamily: "KBFGTextM",
              }}
            >
              매달, 8일 4250원 결제돼요
            </div>
          </div>
        </div>
        <div className="characterImgContainter">
          <div className="characerNameImgContainer">
            <img
              className="characterImg"
              src={character1Img}
              alt="캐릭터1"
            ></img>
            <div className="characterName">김지민</div>
          </div>
          <div className="characerNameImgContainer">
            <img
              className="characterImg"
              src={character1Img}
              alt="캐릭터1"
            ></img>
            <div className="characterName">김지민</div>
          </div>
        </div>
      </ImgContainer>

      <PaymentDetailSearchCotaienr>
        <SearchIcon fontSize="small" sx={{ color: "#767676" }} />
        <div className="searchText">
          <div className="searchTextD"> 1개월</div>
          <div className="searchTextD">전체</div>
          <div className="searchTextD">최신순</div>
          <ExpandMoreIcon
            fontSize="small"
            sx={{ color: "#767676", marginLeft: "10px" }}
          />
        </div>
      </PaymentDetailSearchCotaienr>
      <PaymentDetailCotaienr>
        <div className="firstClass">
          <div className="item">12.11</div>
          <div className="item">
            <div>감자만</div>
            <div style={{ fontSize: "10px", color: "#C59AC9" }}>#자동이체</div>
          </div>
        </div>

        <div className="item" style={{ fontFamily: "KBFGTextB" }}>
          4,250원
        </div>
      </PaymentDetailCotaienr>

      <PaymentDetailCotaienr style={{ top: "507.5px" }}>
        <div className="firstClass">
          <div className="item">12.11</div>
          <div className="item">
            <div>꽉승규</div>
            <div style={{ fontSize: "10px", color: "#5D99A6" }}>#자동이체</div>
          </div>
        </div>

        <div className="item" style={{ fontFamily: "KBFGTextB" }}>
          4,250원
        </div>
      </PaymentDetailCotaienr>
      <PaymentDetailCotaienr style={{ top: "567.5px" }}>
        <div className="firstClass">
          <div className="item">12.11</div>
          <div className="item">
            <div>We리</div>
            <div style={{ fontSize: "10px", color: "#5D99A6" }}>#자동이체</div>
          </div>
        </div>

        <div className="item" style={{ fontFamily: "KBFGTextB" }}>
          4,250원
        </div>
      </PaymentDetailCotaienr>

      <PaymentDetailCotaienr style={{ top: "627.5px" }}>
        <div className="firstClass">
          <div className="item">12.11</div>
          <div className="item">
            <div>영쭌이</div>
            <div style={{ fontSize: "10px", color: "#5D99A6" }}>#자동이체</div>
          </div>
        </div>

        <div className="item" style={{ fontFamily: "KBFGTextB" }}>
          4,250원
        </div>
      </PaymentDetailCotaienr>
    </>
  );
}

export default groupDetail;
