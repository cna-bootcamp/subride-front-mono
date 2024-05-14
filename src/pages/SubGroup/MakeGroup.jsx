import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router";
import CommonButton from "components/CommonButton";
import Navigation from "components/Navigation";
import BackHeader from "components/BackHeader";
import api from "utils/apiInstance";

const payDateOptions = Array.from({ length: 31 }, (_, i) => i + 1);

function MakeGroup({ user }) {
  const { state } = useLocation();  //-- '/sub'에서 넘어온 경우 구독객체 받기 
  const isFixedService = state && state.serviceId ? true:false;
  const [groupName, setGroupName] = useState("");
  const [selectedService, setSelectedService] = useState(state || null);
  const [representativeAccount, setRepresentativeAccount] = useState(user.bankAccount);
  const [payDate, setPayDate] = useState(1);

  const [groupNameError, setGroupNameError] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [accountError, setAccountError] = useState(false);

  const navigate = useNavigate();
  const [serviceOptions, setServiceOptions] = useState([]);

  const fetchServices = useCallback(async () => {
    try { 
      if(!isFixedService) {
        const { data } = await api.get("/subscribe/cansub", {
          params: { id: user.id },
        });
        setServiceOptions(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user, isFixedService]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const createGroup = () => {
    const isValid = validateInputs();
    if (isValid) {
      const groupData = {
        groupAccount: representativeAccount,
        leaderUserId: user.id,
        groupName,
        subscribeName: selectedService?.serviceName,
        billingDate: payDate,
      };

      api
        .post("/group/create", groupData)
        .then((response) => {
          //window.localStorage.setItem("invitationCode", response.data.invitationCode);
          navigate("/successRoom", {state: { invitationCode: response.data.invitationCode }});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!groupName) {
      setGroupNameError(true);
      isValid = false;
    } else {
      setGroupNameError(false);
    }

    if (!selectedService) {
      setServiceError(true);
      isValid = false;
    } else {
      setServiceError(false);
    }

    if (!representativeAccount) {
      setAccountError(true);
      isValid = false;
    } else {
      setAccountError(false);
    }

    return isValid;
  };

  const handleInputFocus = () => {
    setGroupNameError(false);
    setServiceError(false);
    setAccountError(false);
  };

  return (
    <>
      <BackHeader text="그룹 만들기" />

      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "80px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Stack spacing={4}>
          <TextField
            id="groupName"
            label="그룹 이름"
            variant="standard"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            onFocus={handleInputFocus}
            error={groupNameError}
            helperText={groupNameError ? "그룹 이름을 입력해주세요." : ""}
          />

          <Autocomplete
            value={selectedService}
            onChange={(_, newValue) => setSelectedService(newValue)}
            options={isFixedService ? [selectedService] : serviceOptions}
            disabled = {isFixedService}
            disableClearable
            renderOption={(props, option) => (
              <Box {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`/service/${option.logo}`}
                  alt="서비스 로고"
                  style={{ marginRight: "10px" }}
                />
                <div>
                  {option.serviceName} {option.fee.toLocaleString("ko-KR")}원
                </div>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="구독서비스 선택하기"
                variant="standard"
                onFocus={handleInputFocus}
                error={serviceError}
                helperText={serviceError ? "구독 서비스를 선택해주세요." : ""}
              />
            )}
            getOptionLabel={(option) => option.serviceName}
            isOptionEqualToValue={(option, value) => option.serviceId === value.serviceId}
          />

          <FormControl variant="standard" error={accountError}>
            <InputLabel id="representative-account-label">대표계좌 선택하기</InputLabel>
            <Select
              labelId="representative-account-label"
              id="representative-account-select"
              value={representativeAccount}
              onChange={(e) => setRepresentativeAccount(e.target.value)}
              label="대표계좌 선택하기"
              onFocus={handleInputFocus}
            >
              <MenuItem value={user.bankAccount}>{user.bankAccount} :마이핏통장</MenuItem>
            </Select>
            {accountError && <span style={{ color: "red", fontSize: "0.75rem" }}>대표계좌를 선택해주세요.</span>}
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="pay-date-label">결제일</InputLabel>
            <Select
              labelId="pay-date-label"
              id="pay-date-select"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              label="결제일"
            >
              {payDateOptions.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <CommonButton text="방 만들기" handleClick={createGroup} />
      <Navigation />
    </>
  );
}

export default MakeGroup;