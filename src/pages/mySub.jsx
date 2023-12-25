import styled from "@emotion/styled";
import SubListItem from "../components/sub/SubListItem";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";
import Navigation from "../common/navigation";
import CustomModal from "../components/main/CustomModal";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import KeyIcon from "@mui/icons-material/Key";
import AddIcon from "@mui/icons-material/Add";

const SubPage = styled.div`
  p {
    margin: 0;
    font-size: 20px;
    color: rgb(55, 53, 47);
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .title {
    font-family: "KBFGDisplayB";
    margin-top: 10px;
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

function MySub({ user }) {
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function inDetail(groupId) {
    navigate("/groupdetail", { state: groupId });
  }

  useEffect(() => {
    const getServiceList = async (userId) => {
      try {
        const { data } = await api.get("/group/mylist", {
          params: { id: userId },
        });
        return data;
      } catch (err) {
        return err;
      }
    };

    getServiceList(user.id).then((result) => {
      setServiceList(result);
    });
  }, [user.id]);

  return (
    <>
      <SubPage>
        <div className="title">
          <p style={{ color: "rgb(248, 168, 9)" }}>
            My <span style={{ color: "#4A483F" }}>그룹 </span>
          </p>
        </div>
        <ModalContent>
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

        <ul>
          {serviceList.map((item) => (
            <SubListItem
              key={item.id}
              serviceId={item.subscribeDTO.serviceId}
              serviceName={item.subscribeDTO.serviceName}
              handleClick={() => inDetail(item.id)}
              description={`썹타서 ${parseInt(
                ((item.users.length - 1) / item.users.length) *
                  item.subscribeDTO.fee
              ).toLocaleString("ko-KR")}원 아끼는 중`}
            />
          ))}
        </ul>
      </SubPage>

      <Navigation />
    </>
  );
}

export default MySub;
