import styled from "@emotion/styled";
import BackHeader from "../common/backHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import { useLocation } from "react-router";

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

  padding: 0px 10px;
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

function GroupDetail() {
  const { state } = useLocation();

  const [Data, setServiceData] = useState({
    subscribeDTO: { logo: "", serviceName: "" },
    users: [],
  });
  const [totalNum, setTotalNum] = useState(Data.users.length);

  useEffect(() => {
    const getServiceData = async (groupId) => {
      try {
        const { data } = await api.get("/group/detail", {
          params: { id: groupId },
        });

        return data;
      } catch (err) {
        console.log("error");
        return err;
      }
    };

    getServiceData(state).then((result) => {
      setServiceData(result);
    });
  }, []);

  console.log(Data);
  return (
    <>
      <BackHeader text="그룹1"></BackHeader>
      <ImgContainer>
        <div>
          <div className="informContainer">
            <img
              className="servicelogoImg"
              src={`/service/${Data.subscribeDTO.logo}.png`}
              alt="로고1"
            ></img>
            <div
              style={{
                marginTop: "20px",
                fontSize: "15px",
                fontFamily: "KBFGTextM",
              }}
            >
              {Data.subscribeDTO.serviceName}
            </div>
            <div
              style={{
                marginTop: "3px",
                fontSize: "17px",
                fontFamily: "KBFGTextM",
              }}
            >
              매달, {Data.billingDate}일{" "}
              {Math.ceil(Data.subscribeDTO.fee / Data.users.length)}원 결제돼요
            </div>
          </div>
        </div>

        <div className="characterImgContainter">
          {Data.users.map((item) => (
            <div className="characerNameImgContainer">
              <img
                className="characterImg"
                src={`/profile/${item.profileImg}.png`}
                alt="캐릭터1"
              ></img>
              <div className="characterName">{item.username}</div>
            </div>
          ))}
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
        {Data.users.map((item) => (
          <div>
            <div className="firstClass">
              <div className="item">12.11</div>
              <div className="item">
                <div>{item.username}</div>
                <div style={{ fontSize: "10px", color: "#C59AC9" }}>
                  #자동이체
                </div>
              </div>
            </div>

            <div className="item" style={{ fontFamily: "KBFGTextB" }}>
              {Math.ceil(Data.subscribeDTO.fee / Data.users.length)}
            </div>
          </div>
        ))}
      </PaymentDetailCotaienr>
    </>
  );
}

export default GroupDetail;
