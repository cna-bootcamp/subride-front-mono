import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import api from "../utils/apiInstance";
import List from "@mui/material/List";
import AddIcon from "@mui/icons-material/Add";
import SubscriptItem from "../components/sub/SubscriptItem";

const getTotalFee = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/totalfee", {
      params: { id: userId },
    });

    const stringFee = data ? data.totalfee.toLocaleString("ko-KR") : 0;
    return stringFee;
  } catch (err) {
    return err;
  }
};

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

const getMySubscription = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/mylist", {
      params: { id: userId },
    });
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
    <MySubscriptionPage>
      <p className="title">MY 구독 서비스</p>
      <div className="pay-description">
        <p>총 구독료</p>
        <p>{totalFee} 원</p>
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {mySubscriptionList.map((item) => (
          <SubscriptItem key={item.serviceId} item={item}></SubscriptItem>
        ))}
      </List>
      <button className="add-button">
        <AddIcon sx={{ fontSize: "1rem", marginRight: "1rem" }} />
        <p>추가하기</p>
      </button>
    </MySubscriptionPage>
  );
}

export default MySubscription;
