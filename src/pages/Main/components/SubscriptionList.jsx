import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const SubscriptionListContainer = styled.div`
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

function SubscriptionList({ subscriptionList, userName, navigate }) {
  const handleNavigateToMySubscription = () => {
    navigate("/subscription/mysubscription");
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/subscription/service/${serviceId}`, {
      state: { serviceId: serviceId, alreadyEnroll: true },
    });
  };

  return (
    <SubscriptionListContainer>
      <div className="display-flex">
        <p className="title">{userName}님의 구독 서비스</p>
        <Button
          onClick={handleNavigateToMySubscription}
          sx={{ marginRight: "-1.5rem" }}
        >
          <ArrowForwardIos />
        </Button>
      </div>
      <ul className="images">
        {subscriptionList.map((item) => (
          <li
            key={item.serviceId}
            className="image-box"
            onClick={() => handleServiceClick(item.serviceId)}
          >
            <img
              className="image-profile"
              src={`${process.env.PUBLIC_URL}/service/${item.logo}`}
              alt={item.serviceName}
            />
            <p>{item.serviceName}</p>
          </li>
        ))}
      </ul>
    </SubscriptionListContainer>
  );
}

export default SubscriptionList;