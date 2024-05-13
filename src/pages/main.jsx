import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { ArrowForwardIos } from "@mui/icons-material";
import { Button } from "@mui/material";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";
import bunnyKing from "../assets/bunnyKing.png";
import Header from "../common/header";
import Navigation from "../common/navigation";

const BankbookContainer = styled.div`
  text-align: center;

  img {
    margin: 25px auto 0px;
    display: block;
    padding-bottom: 8px;
  }

  p {
    margin: 6px;
  }

  p.title {
    margin: 10px 0px 7px 0px;
    color: #4a483f;
    font-family: KBFGDisplayM;
  }

  .subtitle-container {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    margin: 0 auto;
    cursor: pointer; 
  }

  .subtitle {
    color: #4a483f;
    margin: 1px 0px;
    font-size: 13px;
    color: #0e131a;
    font-family: KBFGDisplayM;
  }
`;

const SubContainer = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  margin: 1rem 0rem;
  color: #4a483f;

  .display-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0px;
  }

  .images {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    overflow-x: auto;
    white-space: nowrap;
    margin: 0px;
  }

  .image-box {
    display: inline-block;
    width: 65px;
    height: 65px;
    border-radius: 70%;
    background-color: pink;
    margin: 0rem 1rem 0rem 0rem;
    object-fit: cover;
    cursor: pointer; 
    p {
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      text-align: center;
    }
  }

  .image-profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-box-recommend {
    display: inline-block;
    width: 90px;
    height: 120px;
    border-radius: 5px;
    background-color: pink;
    margin: 7px;
  }
`;

const RecommendContainer = styled.div`
  color: #4a483f;
  background-color: #f9eeee;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 60px;

  p {
    margin: 0px;
  }

  span {
    color: #878787;
    font-size: 10px;
    margin-left: 2px;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;

    img {
      width: 150px;
    }
  }

  .bottom {
    height: 2rem;
    width: 100%;
    background-color: white;
    position: absolute;
    border-radius: 0 0 10px 10px;
    bottom: 0;
    color: #878787;
    font-size: 12px;
    font-family: "KBFGTextM";
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
`;

const getGroupList = async (userId) => {
  try {
    const { data } = await api.get("/group/mylist", {
      params: { id: userId },
    });
    return data;
  } catch (err) {
    return err;
  }
};

const getTotalFee = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/totalfee", {
      params: { id: userId },
    });

    return data ? data : { "totalfee": 0, "totalSavedAmount": 0 };
  } catch (err) {
    return err;
  }
};

const getSubscriptionList = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/mylist", {
      params: { id: userId },
    });
    return data;
  } catch (err) {
    return err;
  }
};

const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const month = yesterday.getMonth() + 1;
  const day = yesterday.getDate();

  return `${month}월 ${day}일 기준`;
};

function Main({ user }) {
  const navigate = useNavigate();
  const [subGroupList, setSubGroupList] = useState([]);
  const [totalFee, setTotalFee] = useState({});
  const [subscriptionList, setSubscriptionList] = useState([]);

  const fetchGroupList = useCallback(async () => {
    try {
      const result = await getGroupList(user.id);
      setSubGroupList(result);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const fetchToalFee = useCallback(async () => {
    try {
      const result = await getTotalFee(user.id);
      setTotalFee(result);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const fetchSubscriptionList = useCallback(async () => {
    try {
      const result = await getSubscriptionList(user.id);
      setSubscriptionList(result);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    fetchGroupList();
    fetchToalFee();
    fetchSubscriptionList();
  }, [fetchGroupList, fetchToalFee, fetchSubscriptionList]);

  const inDetail = (groupId) => {
    navigate("/groupdetail", { state: { groupId: groupId } });
  };

  const handleNavigateToMySub = () => {
    navigate("/mysub");
  };

  const handleNavigateToMySubscription = () => {
    navigate("/mysubscription");
  };

  const handleServiceClick = useCallback(
    (serviceId) => {
      navigate(`/service/${serviceId}`, { state: { serviceId: serviceId, alreadyEnroll: true } });
    },
    [navigate]
  );

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <>
      <Header handleLogout={handleLogout} />
      <BankbookContainer>
        <img
          style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
          src={totalFee.feelevel ? "./feelevel" + totalFee.feelevel+".jpeg" : `./feelevel0.jpeg`}
          alt="bankbook"
        />
        <p className="title">
          총 구독료
          <span style={{ fontFamily: "KBFGDisplayB" }}> {totalFee.totalfee && totalFee.totalfee.toLocaleString("ko-KR")}원 </span>
        </p>
        <button className="subtitle-container" onClick={() => navigate("/sub")}>
          <p className="subtitle">썹 타고 매월 최대{' '}
            <span style={{ color: '#ff0000', fontSize: '18px', fontWeight: 'bold' }}>
              {totalFee.totalSavedAmount && totalFee.totalSavedAmount.toLocaleString("ko-KR")}원
            </span>{' '}
            아끼러 가기
          </p>
          <ArrowForwardIos fontSize="small" />
        </button>
      </BankbookContainer>


      <SubContainer>
        <div className="display-flex">
          <p className="title">{user.userName}님의 썹</p>
          <Button onClick={handleNavigateToMySub} sx={{ marginRight: '-1.5rem' }}>
            <ArrowForwardIos />
          </Button>
        </div>
        <ul className="images">
          {subGroupList.map((item) => (
            <li
              key={item.id}
              className="image-box"
              onClick={() => inDetail(item.id)}
            >
              <img
                className="image-profile"
                src={`${process.env.PUBLIC_URL}/service/${item.subscribeDTO.logo}`}
                alt={item.subscribeDTO.serviceName}
              />
              <p>{item.groupName}</p>
            </li>
          ))}
        </ul>
      </SubContainer>

      <SubContainer>
        <div className="display-flex">
          <p className="title">{user.userName}님의 구독 서비스</p>
          <Button onClick={handleNavigateToMySubscription} sx={{ marginRight: '-1.5rem' }}>
            <ArrowForwardIos />
          </Button>
        </div>
        <ul className="images">
          {subscriptionList.map((item) => (
            <li key={item.serviceId} className="image-box" onClick={() => handleServiceClick(item.serviceId)}>
              <img
                className="image-profile"
                src={`${process.env.PUBLIC_URL}/service/${item.logo}`}
                alt={item.serviceName}
              />
              <p>{item.serviceName}</p>
            </li>
          ))}
        </ul>
      </SubContainer>

      <RecommendContainer>
        <p>
          구독서비스 추천 <span>{getYesterdayDate()}</span>
        </p>
        <div className="content">
          <img src={bunnyKing} alt="kingOfSomething" />
          <p>지난 한 달 당신은 살림왕👑</p>
          <button
            className="bottom"
            onClick={() => navigate("/recommend", { state: { defaultCategory: 1 } })}
          >
            <p>지출 내역 기반으로 구독 서비스를 추천해드려요</p>
            <ArrowForwardIos fontSize="small" />
          </button>
        </div>
      </RecommendContainer>

      <Navigation />
    </>
  );
}

export default Main;