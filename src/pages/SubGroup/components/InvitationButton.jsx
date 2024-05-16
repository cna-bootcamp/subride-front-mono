import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const InvitationButtonContainer = styled.div`
  position: absolute;
  top: 386px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const InvitationButton = styled(Button)`
  background-color: #f8a809;
  color: #ffffff;
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  text-transform: none;

  &:hover {
    background-color: #e09a07;
  }
`;

const InvitationButtonComponent = ({ serviceData }) => {
  const copyInvitationCode = () => {
    navigator.clipboard
      .writeText(serviceData.invitationCode)
      .then(() => {
        console.log("Invitation code copied to clipboard");
        toast.success("클립보드에 초대코드가 복사되었습니다.", {
          position: "top-center",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      })
      .catch((err) => {
        console.error("Failed to copy invitation code: ", err);
      });
  };

  return (
    <>
      {serviceData.users.length > 0 && serviceData.subscribeDTO ? (
        serviceData.users.length < serviceData.subscribeDTO.maxUser ? (
          <InvitationButtonContainer>
            <InvitationButton onClick={copyInvitationCode}>
              초대코드 복사하기
            </InvitationButton>
          </InvitationButtonContainer>
        ) : (
          <InvitationButtonContainer>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              축하해요! 모든 멤버가 구성 되었어요
            </span>
          </InvitationButtonContainer>
        )
      ) : null}
    </>
  );
};

export default InvitationButtonComponent;