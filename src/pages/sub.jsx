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
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .title {
    margin-top: 10px;
  }
`;

function Sub() {
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();

  function goMakeGroup(ele) {
    console.log(ele);
    navigate("/makeGroup");
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

    getServiceList(1).then((result) => {
      setServiceList(result);
    });
  }, []);

  return (
    <div>
      <BackHeader text="Sub 타기"></BackHeader>
      <SubPage>
        <div className="title">
          <p>지인과 Sub타면</p>
          <p>구독료를 아낄 수 있어요</p>
        </div>

        <ul>
          {serviceList.map((item, handleClick) => (
            <SubListItem
              key={item.serviceId}
              item={item}
              handleClick={() => goMakeGroup(item)}
            />
          ))}
        </ul>
      </SubPage>
    </div>
  );
}

export default Sub;
