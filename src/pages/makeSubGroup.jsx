import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CommonButton from "../common/commonButton";
import Navigation from "../common/navigation";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";
import BackHeader from "../common/backHeader";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router";

const payDateList = [];

// 문자열로 바꿔주기
for (var i = 1; i <= 31; i++) {
  payDateList.push(<MenuItem value={{ i }}> {i} </MenuItem>);
}

function makeListPropss(lists) {
  return {
    options: lists,
    getOptionLabel: (option) => option.serviceName,
  };
}

function makeListProps(lists) {
  return {
    options: lists,
    getOptionLabel: (option) => option.content,
  };
}

function MakeSubGroup() {
  const [account, setAccount] = useState("");
  const [member, setmember] = useState("");
  const [payDate, setPayDate] = useState("");
  const { state } = useLocation();

  console.log(state);

  const handleChange = (event) => {
    setAccount(event.target.value);
    console.log(event.target.value);
  };

  const handleMemberChange = (event) => {
    setmember(event.target.value);
    console.log(event.target.value);
  };

  const handleDateChange = (event) => {
    setPayDate(event.target.value);
    console.log(event.target.value);
  };

  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState([]);
  const userData = JSON.parse(window.sessionStorage.getItem("user"));
  const serviceProps = makeListPropss(serviceData);

  function jiminClick() {
    var groupTitle = document.getElementById("그룹이름").value;
    var serviceInput = document.getElementById("서비스선택").value;

    const lastData = {
      groupAccount: account,
      leaderUser: userData.id,
      groupName: groupTitle,
      subscribeName: serviceInput,
      billingDate: payDate.i,
    };
    console.log(lastData);

    api
      .post("/group/create", lastData)
      .then(function (response) {
        window.localStorage.setItem(
          "invitationCode",
          response.data.invitationCode
        );
        navigate("/successRoom");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const getServiceData = async (userId) => {
      try {
        const { data } = await api.get("/subscribe/canenroll", {
          params: { id: userId },
        });
        return data;
      } catch (err) {
        return err;
      }
    };

    getServiceData(3).then((result) => {
      setServiceData(result);
    });
  }, []);

  return (
    <>
      <BackHeader text="그룹 만들기"></BackHeader>

      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "25px",
          marginBottom: "80px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Stack spacing={4}>
          <TextField id="그룹이름" label="그룹 이름" variant="standard" />

          <TextField
            id="서비스선택"
            label="구독서비스"
            defaultValue={state.serviceName}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="대표계좌">대표계좌 선택하기</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="대표계좌선택"
              value={account}
              onChange={handleChange}
              label="계좌선택"
            >
              <MenuItem value={userData.bandkAccount}>
                {userData.bandkAccount} :마이핏통장
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="대표계좌">멤버수선택</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="멤버수선택"
              value={member}
              onChange={handleMemberChange}
              label="계좌선택"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="결제일선택">결제일</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="결제일선택"
              value={payDate}
              onChange={handleDateChange}
              label="결제일"
            >
              {payDateList.map((elem) => elem)}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <CommonButton
        text="방 만들기"
        handleClick={() => jiminClick()}
      ></CommonButton>
      <Navigation></Navigation>
    </>
  );
}

export default MakeSubGroup;
