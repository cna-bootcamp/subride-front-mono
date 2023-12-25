import styled from "@emotion/styled";
import SubListItem from "../components/sub/SubListItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import BackHeader from "../common/backHeader";

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
    margin-top: 10px;
  }
`;

function Sub({ user }) {
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();

  function goMakeGroup(ele) {
    console.log(ele);
    navigate("/makeSubGroup", { state: ele });
  }
  useEffect(() => {
    const getServiceList = async (userId) => {
      try {
        const { data } = await api.get("/subscribe/cansub", {
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
      <BackHeader text="Sub 타기"></BackHeader>
      <SubPage>
        <div className="title">
          <p>지인과 함께 구독료를 아껴보세요</p>
        </div>

        <ul>
          {serviceList.map((item) => (
            <SubListItem
              key={item.serviceId}
              serviceId={item.serviceId}
              serviceName={item.serviceName}
              handleClick={() => goMakeGroup(item)}
              description={"썹타러 가기"}
            />
          ))}
        </ul>
      </SubPage>
    </>
  );
}

export default Sub;
