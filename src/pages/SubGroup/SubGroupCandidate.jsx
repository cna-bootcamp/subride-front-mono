import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import SubListItem from "pages/SubGroup/components/SubListItem";
import api from "utils/apiInstance";
import BackHeader from "components/BackHeader";

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
    margin-top: 40px;
  }
`;

function SubGroupCandidate({ user }) {
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();

  function goMakeGroup(ele) {
    console.log(ele);
    navigate("/makeGroup", { state: ele });
  }

  const fetchMySub = useCallback( async() => {
    try {
      const { data } = await api.get("/subscribe/cansub", {
        params : { id: user.id }
      });
      setServiceList(data);
    } catch(err) {
      console.log(err);
    }
  }, [user]);
  
  useEffect(() => { fetchMySub(); }, [fetchMySub]);

  return (
    <>
      <BackHeader text="Sub 타기" />
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
              logo={item.logo}
              handleClick={() => goMakeGroup(item)}
              description={"썹타러 가기"}
            />
          ))}
        </ul>
      </SubPage>
    </>
  );
}

export default SubGroupCandidate;
