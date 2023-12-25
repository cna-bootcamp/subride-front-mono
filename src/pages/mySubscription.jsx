import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import api from "../utils/apiInstance";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import SubscriptItem from "../components/sub/SubscriptItem";
import Navigation from "../common/navigation";

const mockList = [
  {
    categoryName: "쇼핑",
    description: "아침 주문, 저녁 도착 ",
    fee: 4990,
    logo: "23",
    serviceId: 23,
    serviceName: "쿠팡 로켓와우",
  },
  {
    categoryName: "OTT",
    description: "넷플릭스 오리지날",
    fee: 17000,
    logo: "1",
    serviceId: 1,
    serviceName: "넷플릭스",
  },
  {
    categoryName: "OTT",
    description: "당신의 볼거리를 위한 티빙",
    fee: 10900,
    logo: "19",
    serviceId: 19,
    serviceName: "티빙",
  },
  {
    categoryName: "쇼핑",
    description: "네이버 페이 포인트 최대 5% 적립",
    fee: 4900,
    logo: "21",
    serviceId: 21,
    serviceName: "네이버 플러스",
  },
];

const MySubscriptionPage = styled.div`
  p {
    margin: 0px;
    font-family: KBFGTextB;
  }

  .title {
    margin: 30px 0px;
    font-family: "KBFGDisplayB";
    font-size: 25px;
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
`;

const getTotalFee = async (userId) => {
  try {
    const data = await api.get("/subscribe/totalfee", {
      params: { id: userId },
    });

    // console.log(data.data.totalfee);
    const totalFee = data.data.totalfee;
    return totalFee.toLocaleString("ko-KR");
  } catch (err) {
    return err;
  }
};

const getMySubscription = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/mylist", {
      params: { id: userId },
    });

    if (data.length === 0) {
      return mockList;
    }
    return data;
  } catch (err) {
    return err;
  }
};

function MySubscription({ user }) {
  const [mySubscriptionList, setMySubscriptionList] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    getMySubscription(user.id).then((result) => {
      setMySubscriptionList(result);
    });

    getTotalFee(user.id).then((result) => {
      setTotalFee(result);
    });
  }, [user.id]);

  return (
    <>
      <MySubscriptionPage>
        <p className="title">MY 구독 서비스</p>
        <div className="pay-description">
          <p>총 구독료</p>
          <p>{totalFee} 원</p>
        </div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {mySubscriptionList.map((item) => (
            <SubscriptItem key={item.serviceId} item={item}></SubscriptItem>
          ))}
        </List>
        <button className="add-button">
          <AddIcon sx={{ fontSize: "1rem", marginRight: "1rem" }} />
          <p>추가하기</p>
        </button>
      </MySubscriptionPage>
      <Navigation />
    </>
  );
}

export default MySubscription;
