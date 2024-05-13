import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import api from "../utils/apiInstance";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import SubscriptItem from "../components/sub/SubscriptItem";
import Navigation from "../common/navigation";
import BackHeader from "../common/backHeader";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const MySubscriptionPage = styled.div`
  p {
    margin: 0;
    font-family: KBFGTextB;
  }
  .title {
    margin: 40px 0;
    font-family: "KBFGDisplayB";
    font-size: 20px;
  }
  .pay-description {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  .add-button {
    display: flex;
    align-items: center;
    font-size: 14px;
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    overflow: visible;
    cursor: pointer;
    padding: 1rem 2rem 1rem 0;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f7f7f7;
    margin-bottom: 10px;
    padding: 10px;
  }
  .clickable {
    cursor: pointer;
    width: 100%;
  }
`;

function MySubscription({ user }) {
  const [mySubscriptionList, setMySubscriptionList] = useState([]);
  const [totalFee, setTotalFee] = useState({});
  const [canSubList, setCanSubList] = useState([]);
  const navigate = useNavigate();

  const getMySubscription = useCallback(async (userId) => {
    try {
      const { data } = await api.get("/subscribe/mylist", {
        params: { id: userId },
      });
      return data;
    } catch (err) {
      return err;
    }
  }, []);

  const getTotalFee = useCallback(async (userId) => {
    try {
      const { data } = await api.get("/subscribe/totalfee", {
        params: { id: userId },
      });
      return data;
    } catch (err) {
      return "0";
    }
  }, []);

  const getCanSubList = useCallback(async (userId) => {
    try {
      const { data } = await api.get("/subscribe/cansub", {
        params: { id: userId },
      });
      return data;
    } catch (err) {
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const subscriptionResult = await getMySubscription(user.id);
      setMySubscriptionList(subscriptionResult);

      const totalFeeResult = await getTotalFee(user.id);
      setTotalFee(totalFeeResult);

      const canSubResult = await getCanSubList(user.id);
      setCanSubList(canSubResult);
    };

    fetchData();
  }, [user.id, getMySubscription, getTotalFee, getCanSubList]);

  const handleMakeGroup = useCallback(
    (item) => {
      const { serviceId, serviceName, logo, description } = item;
      const ele = { serviceId, serviceName, logo, description };
      navigate("/makeGroup", { state: ele });
    },
    [navigate]
  );

  const isCanSub = useCallback(
    (serviceId) => canSubList.some((item) => item.serviceId === serviceId),
    [canSubList]
  );

  const handleServiceClick = useCallback(
    (serviceId) => {
      navigate(`/service/${serviceId}`, { state: { serviceId: serviceId, alreadyEnroll: true } });
    },
    [navigate]
  );

  return (
    <>
      <BackHeader text="구독현황" />
      <MySubscriptionPage>
        <p className="title" style={{ color: "rgb(248, 168, 9)" }}>
          MY <span style={{ color: "#4a483f" }}> 구독 서비스</span>
        </p>
        <div className="pay-description">
          <p>총 구독료</p>
          <p>{totalFee.totalfee && totalFee.totalfee.toLocaleString("ko-KR")} 원</p>
          
        </div>
        <div className="pay-description">
            <p className="subtitle">썹 타면 매월 절감액</p>
            <p>
              <span style={{ color: '#ff0000', fontSize: '18px', fontWeight: 'bold' }}>
                {totalFee.totalSavedAmount && totalFee.totalSavedAmount.toLocaleString("ko-KR")}원
              </span>
            </p>
        </div>
        <List sx={{ width: "100%" }}>
          {canSubList.length > 0 ? (
            mySubscriptionList.map((item, index) => (
              <div key={item.serviceId} className="list-item">
                <div className="clickable" onClick={() => handleServiceClick(item.serviceId)}>
                  <SubscriptItem item={item} index={index} />
                </div>
                {isCanSub(item.serviceId) && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleMakeGroup(item)}
                    sx={{ marginLeft: "1rem", width: "100px" }}
                  >
                    썹 만들기
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>구독 중인 서비스가 없어요.</div>
          )}
        </List>
        <button
          className="add-button"
          onClick={() => navigate("/recommend", { state: { defaultCategory: 1 } })}
        >
          <AddIcon sx={{ fontSize: "1rem", marginRight: "1rem" }} />
          <p>추가하기</p>
        </button>
      </MySubscriptionPage>
      <Navigation />
    </>
  );
}

export default MySubscription;