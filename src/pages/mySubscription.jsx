import styled from "@emotion/styled";
import api from "../utils/apiInstance";

import * as React from "react";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

function SubscriptItem({ item }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.serviceName} secondary={`${item.fee}원`} />
    </ListItem>
  );
}
const MySubscriptionPage = styled.div`
  p {
    margin: 0px;
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
    </MySubscriptionPage>
  );
}

export default MySubscription;
