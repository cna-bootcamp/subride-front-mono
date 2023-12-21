import { useState } from "react";
import { TextField } from "@mui/material";
import api from "../utils/apiInstance";
import { useNavigate } from "react-router-dom";

const login = async (userName) => {
  try {
    const data = await api.post("/users/login", { userName });
    return data;
  } catch (err) {
    return err;
  }
};

function Login({ setUser }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && userName.length > 0) {
      event.preventDefault();
      login(userName).then((result) => {
        setUser(result);
        navigate("/");
      });
    }
  };

  return (
    <>
      <div
        style={{
          fontFamily: "KBFGDisplayB",
          width: "100px",
          height: "100px",
          backgroundColor: "skyblue",
        }}
      >
        <p>썹탈래? 로고</p>
      </div>
      <p style={{ fontSize: "20px", marginBottom: "12rem" }}>
        사용하실 이름을 입력해주세요
      </p>
      <TextField
        id="standard-basic"
        label="닉네임"
        variant="standard"
        type="text"
        onChange={handleChange}
        onKeyDown={onKeyDown}
        sx={{ width: "100%" }}
      />
    </>
  );
}

export default Login;
