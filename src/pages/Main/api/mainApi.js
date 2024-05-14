// mainApi.js
import api from "utils/apiInstance";

export const getGroupList = async (userId) => {
  try {
    const { data } = await api.get("/group/mylist", {
      params: { id: userId },
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const getTotalFee = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/totalfee", {
      params: { id: userId },
    });

    return data ? data : { totalfee: 0, totalSavedAmount: 0 };
  } catch (err) {
    return err;
  }
};

export const getSubscriptionList = async (userId) => {
  try {
    const { data } = await api.get("/subscribe/mylist", {
      params: { id: userId },
    });
    return data;
  } catch (err) {
    return err;
  }
};