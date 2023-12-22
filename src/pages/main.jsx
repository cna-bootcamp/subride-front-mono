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
import { useNavigate } from "react-router-dom";
import characterKiki from "../assets/character1.png";

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
  }

  .subtitle-container {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    margin: 0 auto;
  }

  .subtitle {
    margin: 1px 0px;
    font-size: 20px;
  }
`;

const SubContainer = styled.div`
  background-color: #f1f3f5;
  padding: 0.5rem;
  width: 100%;
  border-radius: 10px;
  margin: 1rem 0rem;

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
  background-color: #f9eeee;
  padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  width: 100%;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);

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
  }

  img {
    width: 110px;
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

function Main({ user }) {
  const navigate = useNavigate();
  const [subGroupList, setSubGroupList] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getGroupList(user.id).then((result) => {
      setSubGroupList(result);
    });

    getTotalFee(user.id).then((result) => {
      console.log(result);
      setTotalFee(result);
    });
  }, [user.id]);

  function inDetail(groupId) {
    console.log(groupId);
    navigate("/groupdetail", { state: groupId });
  }

  return (
    <>
      <h1 style={{ fontFamily: "KBFGDisplayB" }}>Sub 탈래?</h1>
      <BankbookContainer>
        <img src={bankbookImage} alt="bankbook" />
        <p className="title">총 구독료 {totalFee}원</p>
        <button
          className="subtitle-container"
          onClick={() => {
            navigate("/sub");
          }}
        >
          <p className="subtitle">썹타고 구독료 아끼러 가기 </p>
          <ArrowForwardIosIcon sx={{ marginLeft: "5px", color: "#F2DC14" }} />
        </button>
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
            <li
              key={item.id}
              className="image-box"
              onClick={() => inDetail(item.id)}
            >
              <img
                className="image-profile"
                src={
                  process.env.PUBLIC_URL +
                  `/service/${item.subscribeDTO.serviceId}.png`
                }
                alt={item.subscribeDTO.serviceId}
              />
              <p>{item.groupName}</p>
            </li>
          ))}
        </ul>
      </SubContainer>

      <RecommendContainer>
        <p>
          추천서비스 <span>12월 21일 기준</span>
        </p>
        <div className="content">
          <img src={characterKiki} alt="kingOfSomething" />
          <p>이번 달 당신은 살림왕!</p>
          <button
            className="bottom"
            onClick={() => {
              navigate("/recommend");
            }}
          >
            <p>지출 내역 기반으로 구독 서비스를 추천해드려요</p>
            <ArrowForwardIosIcon sx={{ fontSize: "11px", marginLeft: "2px" }} />
          </button>
        </div>
      </RecommendContainer>

      <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
        <ModalContent>
          <p>새로운 썹</p>
          <div className="button-box">
            <Button
              sx={{ width: "100%", color: "#4A4646" }}
              onClick={() => {
                navigate("/makegroup");
              }}
            >
              <GroupAddIcon />썹 만들기
            </Button>
            <Button
              sx={{ width: "100%", color: "#4A4646" }}
              onClick={() => {
                navigate("/comegroup");
              }}
            >
              <KeyIcon sx={{ marginRight: "10px" }} />썹 참여하기
            </Button>
          </div>
        </ModalContent>
      </CustomModal>
    </>
  );
}

export default Main;
