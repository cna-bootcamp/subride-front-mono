import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Header from "../common/header";
import CommonButton from "../common/commonButton";
import Navigation from "../common/navigation";
import { useEffect, useState } from "react";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";

var userData = JSON.parse(window.sessionStorage.getItem("user"));

const memebernList = [{ content: "1" }, { content: "2" }, { content: "3" }];
const payDateList = [];
const accountList = [{ content: userData.bandkAccount + ":마이핏통장" }];

// 문자열로 바꿔주기
for (var i = 1; i <= 31; i++) {
  payDateList.push({ content: String(i) });
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

function MakeGroup() {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState([]);
  const accountProps = makeListProps(accountList);
  const serviceProps = makeListPropss(serviceData);
  const membernProps = makeListProps(memebernList);
  const payDateProps = makeListProps(payDateList);

  function jiminClick() {
    var groupTitle = document.getElementById("그룹이름").value;
    var accountInput = document.getElementById("대표계좌선택").value;
    var serviceInput = document.getElementById("서비스선택").value;
    // var membernumInput = document.getElementById("멤버수설정").value;
    var dayInputs = document.getElementById("결제일선택").value;

    var dayInput = parseInt(dayInputs);

    // console.log(groupTitle);
    // console.log(accountInput);
    // console.log(serviceInput);
    // console.log(membernumInput);
    // console.log(dayInput);

    const lastData = {
      groupAccount: accountInput,
      leaderUser: userData.id,
      groupName: groupTitle,
      subscribeName: serviceInput,
      billingDate: dayInput,
    };

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
      <Header></Header>

      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "25px",
          marginBottom: "140px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Stack spacing={4}>
          <TextField id="그룹이름" label="그룹 이름" variant="standard" />
          <Autocomplete
            {...accountProps}
            id="대표계좌선택"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="계좌 선택" variant="standard" />
            )}
          />
          <Autocomplete
            {...serviceProps}
            id="서비스선택"
            disableClearable
            renderOption={(params, options) => (
              <Box {...params} label="서비스" variant="standard">
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`./service/${options.serviceId}.png`}
                  alt="로고 이미지"
                  style={{ marginRight: "10px" }}
                />

                <div>
                  {options.serviceName} {options.fee}
                </div>
              </Box>
            )}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  label="구독서비스 선택하기"
                  variant="standard"
                />
              </div>
            )}
          />
          <Autocomplete
            {...membernProps}
            id="멤버수설정"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="멤버수" variant="standard" />
            )}
          />
          <Autocomplete
            {...payDateProps}
            id="결제일선택"
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="결제일" variant="standard" />
            )}
          />
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

export default MakeGroup;
