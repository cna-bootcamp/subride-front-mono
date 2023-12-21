import { useState, useEffect } from "react";
import bankbookImage from "../assets/bankbook.png";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import KeyIcon from "@mui/icons-material/Key";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../components/main/CustomModal";
import { Button } from "@mui/material";
import api from "../utils/apiInstance";

const BankbookContainer = styled.div`
  text-align: center;

  img {
    margin: 50px auto 0px;
    display: block;
  }

  p {
    margin: 0px;
  }

  p.title {
    margin: 10px 0px 0px 0px;
    font-size: 24px;
  }

  div.subtitle-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p.subtitle {
    margin: 1px 0px;
    font-size: 20px;
  }
`;

const SubContainer = styled.div`
  margin-top: 30px;
  padding: 10px;
  background-color: #f1f3f5;
  font-size: 20px;
  width: 100%;

  .display-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  }

  .image-box {
    display: inline-block;
    width: 70px;
    height: 70px;
    border-radius: 70%;
    background-color: pink;
    margin: 7px 14px 0px 0px;
    object-fit: cover;

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

const ModalContent = styled.div`
  text-align: center;

  p {
    margin: 3%;
    font-size: 15px;
  }

  .button-box {
    display: flex;
    padding: 3%;
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

function Main({ user }) {
  const [subGroupList, setSubGroupList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getGroupList(user.id).then((result) => {
      setSubGroupList(result);
    });
  }, [user.id]);

  return (
    <>
      <h1 style={{ fontFamily: "KBFGDisplayB" }}>Sub 탈래?</h1>
      <BankbookContainer>
        <img src={bankbookImage} alt="bankbook" />
        <p className="title">총 구독료 67,000원</p>
        <div className="subtitle-container">
          <p className="subtitle">썹타고 구독료 아끼러 가기 </p>
          <ArrowForwardIosIcon sx={{ marginLeft: "5px", color: "#F2DC14" }} />
        </div>
      </BankbookContainer>
      <SubContainer>
        <div className="display-flex">
          <p className="title">썹 타는 중~</p>
          <Button onClick={() => setIsModalOpen(true)}>
            <AddIcon sx={{ fontSize: "25px", color: "#F2DC14" }} />
          </Button>
        </div>
        <ul className="images">
          {subGroupList.map((item) => (
            <li key={item.id} className="image-box">
              <img
                className="image-profile"
                src={
                  process.env.PUBLIC_URL +
                  `/service/${item.subscribeDTO.serviceId}.png`
                }
                alt={item.subscribeDTO.serviceId}
              />
              <p>{item.subscribeDTO.serviceName}</p>
            </li>
          ))}
        </ul>
      </SubContainer>

      <SubContainer>
        <p className="title">이번 달 81,000원을 지출하신</p>
        <p className="title">당신은 커피왕!</p>
        <div className="images">
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
          <div className="image-box-recommend"></div>
        </div>
      </SubContainer>
      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        <ModalContent>
          <p>새로운 썹</p>
          <div className="button-box">
            <Button sx={{ width: "100%", color: "#4A4646" }}>
              <GroupAddIcon sx={{ marginRight: "10px" }} />썹 만들기
            </Button>
            <Button sx={{ width: "100%", color: "#4A4646" }}>
              <KeyIcon sx={{ marginRight: "10px" }} />썹 참여하기
            </Button>
          </div>
        </ModalContent>
      </CustomModal>
    </>
  );
}

export default Main;
