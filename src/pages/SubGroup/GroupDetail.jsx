import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import BackHeader from "components/BackHeader";
import api from "utils/apiInstance";
import GroupInfo from "./components/GroupInfo";
import InvitationButtonComponent from "./components/InvitationButton";
import PaymentDetail from "./components/PaymentDetail";

function GroupDetail() {
  const location = useLocation();
  const groupId = location.state?.groupId || null;

  const [serviceData, setServiceData] = useState({
    subscribeDTO: { logo: "", serviceName: "", description: "", maxUser: 0 },
    users: [],
    groupName: "",
    billingDate: 0,
    pays: [],
  });

  const getServiceData = useCallback(async () => {
    try {
      if (groupId !== null) {
        const { data } = await api.get("/group/detail", {
          params: { id: groupId },
        });
        setServiceData(data);
      }
    } catch (err) {
      console.log("error");
    }
  }, [groupId]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);

  return (
    <>
      <BackHeader text={serviceData.groupName}></BackHeader>
      <GroupInfo serviceData={serviceData} />
      <InvitationButtonComponent serviceData={serviceData} />
      <PaymentDetail serviceData={serviceData} />
    </>
  );
}

export default GroupDetail;