import * as React from "react";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import api from "../utils/apiInstance";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";

function SubscriptItem({ item }) {
  return (
    <ListItem sx={{ padding: "10px 0px" }}>
      <ListItemAvatar>
        <Avatar
          src={process.env.PUBLIC_URL + `/service/${item.serviceId}.png`}
          alt={item.serviceName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.serviceName}
        secondary={`${item.fee}원`}
        primaryTypographyProps={{ fontSize: "15px" }}
      />
    </ListItem>
  );
}
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
function MySubscription() {
  const [mySubscriptionList, setMySubscriptionList] = useState([]);

  useEffect(() => {
    getMySubscription(1).then((result) => {
      setMySubscriptionList(result);
    });
  }, []);

  return (
    <MySubscriptionPage>
      <p className="title">MY 구독 서비스</p>
      <div className="pay-description">
        <p>총 구독료</p>
        <p>67,000 원</p>
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
