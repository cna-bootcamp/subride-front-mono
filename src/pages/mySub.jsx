import styled from "@emotion/styled";
import SubListItem from "../components/sub/SubListItem";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";

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

function MySub({ user }) {
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([]);

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
          <p>My Sub</p>
        </div>

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
              )}원 아끼는 중`}
            />
          ))}
        </ul>
      </SubPage>
    </>
  );
}

export default MySub;
